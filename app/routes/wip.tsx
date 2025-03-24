import { useEffect, useRef, useState } from "react";
import Background from "../components/Background";
import { AiOutlineLoading } from "react-icons/ai";
import {
  container,
  delete_txt,
  description_box,
  download_button,
  footer,
  input,
  input_box,
  loading,
} from "../components/styles.css";
import Title from "../components/Title";

export default function Index() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useRef("");

  const handleDownload = async () => {
    if (!cookies.current) {
      alert("앗, 무언가가 잘못되었습니다. 잠시 뒤에 다시 이용해주세요");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/download-mp3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, cookies: cookies.current }),
      });

      if (!response.ok) {
        throw new Error("Failed to download audio");
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = "download.mp3";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          fileName = match[1];
        }
      }

      const reader = response.body?.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        chunks.push(value);
      }

      const blob = new Blob(chunks, { type: "audio/mpeg" });

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

      setIsLoading(false);
    } catch (error) {
      console.error("Download error:", error);
      alert("파일 다운로드 중 오류가 발생했습니다.");
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (document) {
      cookies.current = document.cookie;
    }
  }, []);

  return (
    <>
      <Background />
      <div className={container}>
        <Title />
        <main>
          <div className={input_box}>
            <input
              // disabled
              className={input}
              type="text"
              placeholder="죄송합니다 지금 버그를 고치는 중이라 잠시 이용이 불가합니다..."
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button
              // disabled
              className={download_button}
              onClick={handleDownload}
            >
              {isLoading ? (
                <span className={loading}>
                  <AiOutlineLoading />
                </span>
              ) : (
                "Download"
              )}
            </button>
          </div>
          <div className={description_box}>
            <p style={{ fontSize: 12 }}>Ver 1.0.0</p>
            <strong>
              유튜브 URL을 복사 & 붙여넣기하여 유튜브의 오디오를 파일로
              추출해보세요.
            </strong>
            <br />
            <br />
          </div>
        </main>
      </div>
      <footer className={footer}>&copy; 2025 Designed by Seungha Kim.</footer>
    </>
  );
}
