import { jsx } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect } from "react";
const TextInput = forwardRef(function TextInput2({
  type = "text",
  className = "",
  isFocused = false,
  readOnly = false,
  required = true,
  ...props
}, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start", children: /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      readOnly,
      required,
      className: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs read-only:bg-gray-100 read-only:cursor-not-allowed " + className,
      ref: input
    }
  ) });
});
export {
  TextInput as T
};
