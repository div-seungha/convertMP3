import { globalFontFace, style, keyframes } from "@vanilla-extract/css";

const wantedSans = "wantedSans";

globalFontFace(wantedSans, [
  {
    src: "url(/fonts/WantedSansStd-Regular.woff2)",
    fontWeight: 400,
    fontDisplay: "block",
  },
  {
    src: "url(/fonts/WantedSansStd-SemiBold.woff2)",
    fontWeight: 600,
    fontDisplay: "block",
  },
  {
    src: "url(/fonts/WantedSansStd-Bold.woff2)",
    fontWeight: 700,
    fontDisplay: "block",
  },
  {
    src: "url(/fonts/WantedSansStd-Black.woff2)",
    fontWeight: 900,
    fontDisplay: "block",
  },
]);

const responsive = style({
  "@media": {
    "screen and (max-width: 1000px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const background = style({
  width: "100%",
  height: "100vh",
  background:
    "radial-gradient(farthest-corner at 40px 40px, #DFFBEE, #D0DDF6, #FDF0F4, #CEF6F7)",
  backgroundSize: "cover",
  position: "absolute",
  top: 0,
  left: 0,
});

export const plain_text = style({
  fontFamily: wantedSans,
  color: "#111D27aa",
  fontWeight: 400,
  fontSize: 16,
});

const head_text = style({
  fontFamily: wantedSans,
  color: "#111D27",
  fontWeight: 700,
});

export const header = style([
  head_text,
  {
    fontWeight: 900,
    fontSize: "3rem",
    margin: "40px 80px",
    "@media": {
      "screen and (max-width: 1000px)": {
        fontSize: "2rem",
        fontWeight: 800,
        margin: "20px 40px",
      },
    },
  },
]);

export const container = style({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 20,
  backdropFilter: "blur(18px)",
  background: "#ffffff33",
  border: "1px solid #E0EFF355",
  // padding: "60px 40px 100px",
  padding: 100,
  position: "absolute",
  top: 200,
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: wantedSans,
  maxWidth: 1000,
  "@media": {
    "screen and (max-width: 1000px)": {
      width: "100%",
      display: "block",
      border: "none",
      backdropFilter: "none",
    },
  },
});

export const click_link = style({
  color: "#fff",
});

export const main_section_container = style([
  responsive,
  {
    width: 1000,
    margin: "80px auto 40px",
    display: "flex",
    // justifyContent: "space-between",
    justifyContent: "center",
    flexWrap: "nowrap",
    gap: 20,
  },
]);

export const item_container = style({
  width: 300,
  border: "1px solid #ffffff99",
  backdropFilter: "blur(20px)",
  padding: 20,
  marginBottom: 20,
  borderRadius: 12,
  background: "#ffffff44",
  display: "flex",
  flexDirection: "column",

  transition: "all 500ms",
  ":hover": {
    background: "#ffffffcc",
  },
});

export const item_container_h3 = style({
  selectors: {
    [`${item_container} > &`]: {
      color: "#111D27cc",
      fontFamily: wantedSans,
      fontWeight: 700,
      margin: "0 0 32px 0",
      fontSize: "1.5rem",
    },
  },
});

export const link_text = style([
  plain_text,
  {
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
  },
]);

export const font = style({
  fontFamily: wantedSans,
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
  fontFamily: wantedSans,
  color: "#1E232588",
  borderRadius: 12,
  margin: "40px auto",
  fontSize: 14,
  textAlign: "center",
  backdropFilter: "blur(10px)",
  background: "#ffffff44",
  border: "1px solid #FFFFFF99",
  padding: 32,
});

// export const container = style({
//   width: "80%",
//   display: "flex",
//   flexDirection: "column",
//   borderRadius: 20,
//   backdropFilter: "blur(18px)",
//   background: "#ffffff33",
//   border: "1px solid #E0EFF355",
//   padding: "60px 40px 100px",
//   position: "absolute",
//   top: 200,
//   left: "50%",
//   transform: "translateX(-50%)",
//   fontFamily: wantedSans,
//   maxWidth: 1000,
// });

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
  width: "85%",
  margin: "60px auto 40px",
});

export const input = style({
  width: "80%",
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
    color: "#0B2B4955",
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
  width: 160,
  marginLeft: 40,
  border: "1px solid #ffffff88",
  boxShadow: "0px 0px 8px #1E232599",
  cursor: "pointer",
  transition: "all 0.4s",
  ":hover": {
    background: "#1D6C89",
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
  display: "flex",
  justifyContent: "center",
  left: 0,
  textAlign: "center",
  width: "100%",
  padding: 10,
  fontSize: 12,
  backdropFilter: "blur(20px)",
  fontFamily: wantedSans,
  color: "#1E232555",
  zIndex: 100,
});

export const table = style({
  fontFamily: wantedSans,
  fontSize: 12,
  textAlign: "left",
  border: "1px solid #fff",
  width: "100%",
  padding: 8,
  background: "#ffffff77",
  borderRadius: 8,
});

export const th = style({
  fontFamily: wantedSans,
  fontWeight: 700,
});

export const head = style({
  fontFamily: wantedSans,
  fontWeight: 900,
  fontSize: 36,
  marginLeft: 60,
  color: "#0B2B49",
  marginBottom: 0,
});

export const status_style = style({
  fontWeight: "bolder",
});

export const footer_link = style({
  color: "#1E232555",
  textDecoration: "none",
});

export const loading_container = style({
  display: "flex",
  justifyContent: "center",
  fontSize: 36,
  color: "#00D94C",
});
