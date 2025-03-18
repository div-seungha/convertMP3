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
  click_link,
} from "../components/styles.css";
import Title from "../components/Title";

export default function Index() {
  return (
    <>
      <Background />
      <div className={container}>
        <a
          className={click_link}
          href="https://beonanotherplanet.com/Tiskofy_1.0.0-beta.1_aarch64.dmg"
          target="_blank"
        >
          Download (MacOS)
        </a>
      </div>
      <footer className={footer}>&copy; 2025 Designed by Seungha Kim.</footer>
    </>
  );
}
