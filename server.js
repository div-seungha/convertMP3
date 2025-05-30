import "./instrumentation.server.mjs";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";
import puppeteer from "puppeteer-core";

installGlobals();

function convertCookiesToNetscapeFormat(rawCookies, domain) {
  const lines = ["# Netscape HTTP Cookie File", ""]; // Header
  const cookies = rawCookies.split("; ");

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");

    if (name && value) {
      lines.push(`${domain}\tFALSE\t/\tTRUE\t2147483647\t${name}\t${value}`);
    }
  });

  return lines.join("\n");
}

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

// async function saveCookies() {
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     executablePath: "/opt/google/chrome/chrome",
//   });
//   const page = await browser.newPage();

//   await page.goto("https://www.youtube.com/");
//   await page.waitForTimeout(5000);

//   const cookies = await page.cookies();
//   fs.writeFileSync(cookieFilePath, JSON.stringify(cookies, null, 2));

//   await browser.close();
// }

const app = express();

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", {
      immutable: true,
      maxAge: "1y",
    })
  );
}
app.use(express.static("build/client", { maxAge: "1h" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/download-mp3", async (req, res) => {
  try {
    const url = req.body.url;
    const rawCookies = req.body.cookies;

    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    if (!rawCookies) {
      return res.status(400).json({ error: "Invalid cookies" });
    }

    const domain = "youtube.com"; // 쿠키가 적용될 도메인
    const netscapeCookies = convertCookiesToNetscapeFormat(rawCookies, domain);

    // 변환된 쿠키를 임시 파일로 저장
    const cookieFilePath = path.join("/tmp", `cookies_${Date.now()}.txt`);
    fs.writeFileSync(cookieFilePath, netscapeCookies);

    const titleProcess = spawn("yt-dlp", [
      "--cookies",
      cookieFilePath,
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
      "--referer",
      "https://www.youtube.com",
      "--get-title",
      url,
    ]);

    let title = "";
    titleProcess.stdout.on("data", (data) => {
      title += data.toString().trim();
    });

    titleProcess.on("close", (code) => {
      if (code !== 0) {
        title = "audio";
      }

      const sanitizedTitle = title
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "_");
      const filename = `${sanitizedTitle}.mp3`;
      const outputPath = path.join("/tmp", filename);

      const process = spawn("yt-dlp", [
        "--cookies",
        cookieFilePath,
        "--user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "--referer",
        "https://www.youtube.com",
        "-x",
        "--audio-format",
        "mp3",
        "-o",
        outputPath,
        url,
      ]);

      process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      process.on("close", (code) => {
        if (code !== 0) {
          return res.status(500).json({ error: "Failed to download MP3" });
        }

        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`
        );
        res.setHeader("Content-Type", "audio/mpeg");

        const fileStream = fs.createReadStream(outputPath);
        fileStream.pipe(res);

        // 파일 전송이 끝나면 삭제
        fileStream.on("end", () => {
          fs.unlinkSync(outputPath);
          fs.unlinkSync(cookieFilePath);
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.all(
  "*",
  createRequestHandler({
    build: viteDevServer
      ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : await import("./build/server/index.js"),
  })
);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server running on 3000");
});
