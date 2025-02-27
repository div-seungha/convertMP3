import { style } from "@vanilla-extract/css";

export const background = style({
  width: "100%",
  height: "100vh",
  background: "linear-gradient(180deg, #E9F5F9 0%, #FFFFFF 39%)",
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

export const input_box = style({
  position: "absolute",
  width: "60%",
  top: 250,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const input = style({
  width: "70%",
  padding: "2px 24px",
  fontSize: "16px",
  height: 42,
  border: "1px solid #E4E8E9",
  boxShadow: "2px 2px 8px 8px #E4E8E933",
  borderRadius: 30,
  ":focus": {
    outline: "none",
  },
  "::selection": {
    background: "transparent",
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
  background: "#64A5BC",
  minWidth: "20%",
  border: "1px solid #64A5BC",
  boxShadow: "2px 2px 8px 4px #64A5BC44",
  cursor: "pointer",
  transition: "all 0.6s",
  ":hover": {
    background: "#1D6C89",
    border: "1px solid #1D6C89",
  },
});
