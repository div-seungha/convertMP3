import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Index() {
  const [url, setUrl] = useState("");

  const handleDownload = async () => {
    try {
      const response = await fetch("/download-mp3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to download audio");
      }

      // 파일 이름 가져오기 (Content-Disposition에서 추출)
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = "download.mp3";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          fileName = match[1];
        }
      }

      // ReadableStream을 Blob으로 변환
      const reader = response.body?.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        chunks.push(value);
      }

      const blob = new Blob(chunks, { type: "audio/mpeg" });

      // Blob을 다운로드 가능한 링크로 변환
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 메모리 해제
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("파일 다운로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {/* <form action="/download-mp3" method="post"> */}
      <input
        type="text"
        placeholder="YouTube URL"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        className="border p-2"
      />
      <button onClick={handleDownload}>MP3 다운로드</button>
      {/* </form> */}
    </div>
  );
}
