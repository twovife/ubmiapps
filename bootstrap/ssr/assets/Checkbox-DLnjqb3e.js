import { jsx } from "react/jsx-runtime";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-xs focus:ring-indigo-500 " + className
    }
  );
}
export {
  Checkbox as C
};
