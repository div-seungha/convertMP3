import {
  footer,
  background,
  main_section_container,
  item_container,
  item_container_h3,
  link_text,
} from "../components/styles.css";

export default function Index() {
  return (
    <div className={background}>
      {/* <header>
        <h1 className={header}>Applications List</h1>
      </header> */}
      <div>
        <main>
          <section className={main_section_container}>
            <div
              className={item_container}
              style={{ width: "70%", textAlign: "center", padding: 80 }}
            >
              <h3 className={item_container_h3}>Tiskofy - Mac</h3>
              <p>
                <a
                  className={link_text}
                  href="https://beonanotherplanet-public.s3.ap-northeast-2.amazonaws.com/tiskofy_1.0.0-beta.3_aarch64.dmg"
                  target="_blank"
                >
                  Download (MacOS)
                </a>
              </p>
              {/* <p className={plain_text}>
                (음원 추출 & mp3 압축 과정에 다소 시간이 걸릴 수 있습니다.)
                <br />
              </p> */}
            </div>
            {/* <div className={item_container}>
              <h3 className={item_container_h3}>Tiskofy - Windows</h3>
              <p className={plain_text}>Not ready yet...</p>
            </div>
            <div className={item_container}>
              <p className={plain_text}>Still getting ready...</p>
            </div> */}
          </section>
        </main>
      </div>
      <footer className={footer}>&copy; 2025 Powered by Seungha Kim.</footer>
    </div>
  );
}
