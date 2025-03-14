import "./instrumentation.server.mjs";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

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
    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // yt-dlp를 실행하여 제목을 가져옴
    const titleProcess = spawn("yt-dlp", ["--get-title", url]);

    let title = "";
    titleProcess.stdout.on("data", (data) => {
      title += data.toString().trim();
    });

    titleProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Failed to fetch video title" });
      }

      // 파일명에서 특수 문자 제거 (파일 시스템 문제 방지)
      const sanitizedTitle = title
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "_");
      const filename = `${sanitizedTitle}.mp3`;
      const outputPath = path.join("/tmp", filename);

      // yt-dlp로 MP3 다운로드
      const process = spawn("yt-dlp", [
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

        // 다운로드 완료 후 클라이언트에 스트리밍
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
app.listen(port, () => console.log("http://localhost:" + port));
