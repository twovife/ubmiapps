import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import "./TextInput-GCtCMl-T.js";
import { usePage, useForm } from "@inertiajs/react";
import { B as Button } from "./button-StO46bLt.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-dom";
import "@headlessui/react";
function DeleteAngsuran({ id }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  useRef();
  const { auth } = usePage().props;
  const unitAkses = auth.permissions.includes("can create");
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm();
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const cancelUserDeletion = () => {
    setTimeout(() => {
      setConfirmingUserDeletion(false);
    }, 200);
  };
  const buttonArea = useRef(null);
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("pinjaman.destroy_angsuran", id), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { ref: buttonArea, onMouseLeave: cancelUserDeletion, children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsx("form", { onSubmit: deleteUser, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-6 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `inline transition-all duration-300
              ${confirmingUserDeletion ? "translate-y-full" : "translate-y-0"}
              `,
          children: /* @__PURE__ */ jsx(
            Button,
            {
              disabled: !unitAkses,
              type: "button",
              size: "xs",
              onClick: confirmUserDeletion,
              children: "Hapus"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `inline transition-all duration-300
              ${confirmingUserDeletion ? "-translate-y-full" : "translate-y-0"}`,
          children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              size: "xs",
              variant: "destructive",
              onClick: confirmUserDeletion,
              children: "Yakin?"
            }
          )
        }
      )
    ] }) })
  ] });
}
export {
  DeleteAngsuran as default
};
