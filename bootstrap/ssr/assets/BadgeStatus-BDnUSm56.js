import { jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-BDQK5pqs.js";
import "./button-StO46bLt.js";
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
  normal: "green",
  lunas: "greenoutline",
  belum_lunas: "outline"
};
const BadgeStatus = ({ value, onClick, children, ...props }) => {
  const variant = variantMap[value] || "default";
  return /* @__PURE__ */ jsx(Badge, { ...props, onClick, size: "xs", variant, children: children ?? value });
};
export {
  BadgeStatus as B
};
