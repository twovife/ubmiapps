import { jsx } from "react/jsx-runtime";
import "./badge-BDQK5pqs.js";
import { B as Button } from "./button-StO46bLt.js";
import "react";
const variantMap = {
  open: "blue",
  acc: "yellow",
  success: "green",
  tolak: "default",
  gagal: "destructive",
  lama: "outline",
  baru: "yellow",
  true: "green",
  false: "destructive",
  ml: "default",
  mb: "destructive",
  cm: "yellow",
  normal: "green"
};
const BargeStatus = ({ value, children, onClick, ...props }) => {
  const variant = variantMap[value] || "default";
  return /* @__PURE__ */ jsx(Button, { ...props, onClick, size: "xs", variant, children: children ?? value });
};
export {
  BargeStatus as B
};
