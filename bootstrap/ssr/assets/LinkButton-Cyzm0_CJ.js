import { jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function LinkButton({
  className = "",
  disabled,
  children,
  title,
  type = "button",
  as = "button",
  color = "primary",
  ...props
}) {
  const sizeButton = () => {
    if (color == "primary") {
      return "text-white bg-gray-800 border-transparent hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:ring-gray-500 focus:ring-opacity-50";
    }
    if (color == "outline") {
      return "text-gray-800 bg-white border-gray-800/50 border-1 hover:bg-gray-700 hover:text-white focus:bg-gray-700 active:bg-gray-900 focus:ring-gray-500 focus:ring-opacity-50 shadow-sm";
    }
    if (color == "red") {
      return "text-white bg-red-800 border-transparent hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:ring-red-500 focus:ring-opacity-50";
    }
    if (color == "blue") {
      return "text-white bg-blue-800 border-transparent hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:ring-blue-500 focus:ring-opacity-50";
    }
    if (color == "yellow") {
      return "text-white bg-yellow-800 border-transparent hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:ring-yellow-500 focus:ring-opacity-50";
    }
    if (color == "green") {
      return "text-white bg-green-800 border-transparent hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:ring-green-500 focus:ring-opacity-50";
    }
  };
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      as,
      type,
      className: `inline-flex items-center ${sizeButton()} py-2 px-4 border rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"}` + className,
      disabled,
      children: children || title
    }
  );
}
export {
  LinkButton as L
};
