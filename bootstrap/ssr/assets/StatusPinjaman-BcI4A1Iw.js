import { jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-BDQK5pqs.js";
import "react";
const StatusPinjaman = ({ value = "normal" }) => {
  const valielue = value == null ? void 0 : value.toLowerCase();
  switch (valielue) {
    case "normal":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", children: value });
    case "cm":
      return /* @__PURE__ */ jsx(Badge, { variant: "yellow", children: value });
    case "mb":
      return /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: value });
    case "ml":
      return /* @__PURE__ */ jsx(Badge, { children: value });
    case "lunas":
      return /* @__PURE__ */ jsx(Badge, { variant: "green", children: value });
    case "belum":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", children: value });
    default:
      return /* @__PURE__ */ jsx(Badge, { children: value });
  }
};
export {
  StatusPinjaman as S
};
