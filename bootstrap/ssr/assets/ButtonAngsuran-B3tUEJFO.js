import { jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-StO46bLt.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const ButtonAngsuran = ({
  nominalPembayaran,
  pelunasan,
  onClickButton,
  index
}) => {
  const buttonValueClick = (e) => {
    const value = e.target.getAttribute("data-value");
    onClickButton(value, index);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
    nominalPembayaran && nominalPembayaran.map((item) => /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "xs",
        onClick: buttonValueClick,
        "data-value": item,
        children: [
          (item / 1e3).toLocaleString("id-ID"),
          " Rb"
        ]
      }
    )),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "xs",
        onClick: buttonValueClick,
        "data-value": pelunasan,
        children: [
          (pelunasan / 1e3).toLocaleString("id-ID"),
          " Rb"
        ]
      }
    )
  ] });
};
export {
  ButtonAngsuran as default
};
