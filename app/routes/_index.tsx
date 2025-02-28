import { useState } from "react";
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

  const handleDownload = async () => {
    try {
      setIsLoading(true);
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
    }
  };

  return (
    <>
      <Background />
      <div className={container}>
        <Title />
        <main>
          <div className={input_box}>
            <input
              className={input}
              type="text"
              placeholder="Copy and Paste the YouTube URL"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button className={download_button} onClick={handleDownload}>
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
            유튜브 URL을 복사 & 붙여넣기하여 유튜브의 오디오를 파일로
            추출해보세요.
            <br />
            <br />
            <del className={delete_txt}>
              취미로 미디 작편곡을 배우고 있는데 카피 숙제를 하려다 보면 곡의
              오디오 파일이 필요할 때가 있어서...
              <br />
              그런데 구글에 뜨는 사이트들엔 광고가 너무 많아 빡쳐서 직접 만들게
              되었습니다. <br />
              물론 이 웹 페이지가 유지되려면 서버 비용이 아주 조금 들어가긴
              하지만
              <br />
              검색엔진에 안 뜨게 할 테니 트래픽이 그렇게 과하진 않을 거라
              괜찮습니다.
            </del>
            <br />
            <br />
            그런데 현재 <del className={delete_txt}>
              개발자의 능력 부족으로
            </del>{" "}
            mp4 파일을 mp3으로 변환하는 기능을 넣지 못해
            <br />
            오디오 파일임에도 mp4 형식으로 추출되는 문제가 있고
            <br />
            또 뭐가 원인인진 모르겠지만 3~4분짜리 음원도 8~9분 길이로 추출되고
            있는 문제가 있습니다.
            <br />
            조속히 해당 문제를 고치도록 노력하겠습니다.🫡
            <br />
          </div>
        </main>
      </div>
      <footer className={footer}>&copy; 2025 Designed by Seungha Kim.</footer>
    </>
  );
}
