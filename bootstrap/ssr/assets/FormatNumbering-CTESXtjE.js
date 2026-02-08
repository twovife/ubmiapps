import { jsx } from "react/jsx-runtime";
import "react";
import { NumericFormat } from "react-number-format";
const FormatNumbering = ({
  value = 0,
  prefix,
  suffix,
  className = "text-end"
}) => {
  return /* @__PURE__ */ jsx("div", { className: `${className}`, children: /* @__PURE__ */ jsx(
    NumericFormat,
    {
      value,
      displayType: "text",
      thousandSeparator: ",",
      prefix: prefix ?? "",
      suffix: suffix ?? ""
    }
  ) });
};
export {
  FormatNumbering as F
};
