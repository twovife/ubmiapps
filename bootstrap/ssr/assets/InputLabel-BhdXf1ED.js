import { jsxs, jsx } from "react/jsx-runtime";
function InputLabel({
  value,
  className = "",
  children,
  optional = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ...props,
      className: `block font-medium text-sm text-gray-700  ` + className,
      children: [
        value ? value : children,
        optional ? /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "(optionals)" }) : ""
      ]
    }
  );
}
export {
  InputLabel as I
};
