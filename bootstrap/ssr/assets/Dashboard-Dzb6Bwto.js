import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import { Head } from "@inertiajs/react";
import "react";
import "./Dropdown-tAzvTn5J.js";
import "./button-StO46bLt.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "react-icons/bi";
import "hamburger-react";
import "./dropdown-menu-BEELUTJf.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-icons";
import "./SweetAlert-CPwvZdfJ.js";
import "sweetalert2";
import "sweetalert2-react-content";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
function Dashboard(props) {
  return /* @__PURE__ */ jsxs(Authenticated, { auth: props.auth, errors: props.errors, header: "Home", children: [
    /* @__PURE__ */ jsx(Head, { title: "Home" }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "px-6 py-4 bg-white rounded-md shadow-sm text-slate-700 ring-1 ring-slate-700 ring-opacity-5", children: "You're logged in!!" }) })
  ] });
}
export {
  Dashboard as default
};
