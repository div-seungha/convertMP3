import { globalFontFace, style, keyframes } from "@vanilla-extract/css";

const wantedSans = "wantedSans";

globalFontFace(wantedSans, {
  src: "url(/fonts/WantedSansStd-Regular.woff2)",
});

export const font = style({
  fontFamily: wantedSans,
});

export const background = style({
  width: "100%",
  height: "100vh",
  background: "linear-gradient(45deg, #1A4369, #255E93, #0B2B49)",
  backgroundSize: "cover",
  position: "absolute",
  top: 0,
  left: 0,
});

export const box_container = style({
  width: 400,
  height: 400,
  display: "flex",
  flexWrap: "wrap",
});

export const delete_txt = style({
  opacity: 0.5,
  fontSize: 12,
});

export const hover_box = style({
  width: 40,
  height: 40,
  padding: 0,
  margin: 0,
  display: "inline-flex",
  borderRight: "1px solid #E0EFF3",
  borderBottom: "1px solid #E0EFF3",
  transition: "opacity 1s ease-in-out",
  ":hover": {
    background: "#E0EFF3",
    opacity: 1,
  },
});

export const description_box = style({
  width: "80%",
  color: "#1E2325",
  borderRadius: 12,
  margin: "40px auto",
  textAlign: "center",
  backdropFilter: "blur(10px)",
  background: "#ffffff22",
  border: "1px solid #E0EFF333",
  padding: "40px 20px",
  fontSize: 16,
});

export const container = style({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 20,
  backdropFilter: "blur(18px)",
  background: "#ffffff33",
  border: "1px solid #E0EFF355",
  padding: "60px 40px 100px",
  position: "absolute",
  top: 200,
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: wantedSans,
  maxWidth: 1000,
});

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const loading = style({
  animation: `${spin} 1s linear infinite`,
});

export const input_box = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  margin: "60px auto 40px",
});

export const input = style({
  width: "70%",
  padding: "2px 24px",
  fontSize: "16px",
  height: 42,
  border: "1px solid #E4E8E9",
  boxShadow: "0px 0px 8px #E4E8E999",
  fontFamily: wantedSans,
  borderRadius: 30,
  ":focus": {
    outline: "none",
  },
  "::placeholder": {
    color: "#0B2B49",
  },
});

export const download_button = style({
  borderRadius: 30,
  height: 48,
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  background: "#1E2325",
  minWidth: "20%",
  border: "1px solid #1E2325",
  boxShadow: "0px 0px 8px #1E232599",
  cursor: "pointer",
  transition: "all 0.4s",
  ":hover": {
    background: "#1D6C89",
    border: "1px solid #1D6C89",
  },
  ":disabled": {
    background: "#aaaaaa55",
    color: "#ffffff55",
    cursor: "not-allowed",
  },
  fontFamily: wantedSans,
});

export const footer = style({
  position: "fixed",
  bottom: 0,
  textAlign: "center",
  width: "100%",
  padding: 20,
  fontSize: 14,
  backdropFilter: "blur(20px)",
  fontFamily: wantedSans,
  color: "#ffffff99",
  zIndex: 100,
});
