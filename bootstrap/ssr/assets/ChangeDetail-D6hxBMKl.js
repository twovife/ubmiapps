import { jsxs, jsx } from "react/jsx-runtime";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { N as NoEditOverlay } from "./NoEditOverlay-GIB1h_zq.js";
import { useState, useEffect } from "react";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import "clsx";
import { B as Button } from "./button-StO46bLt.js";
import "./input-BH-oxdzi.js";
import "./label-e-KMhPKP.js";
import { useForm } from "@inertiajs/react";
import "react-currency-input-field";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "tailwind-merge";
import "@radix-ui/react-label";
const ChangeDetail = ({ triggeredData, onClosed }) => {
  const { isUnit, isMantri, isPusat, isCreator } = useFrontEndPermission();
  const { data, setData, put, processing, reset, transform, errors } = useForm({
    request_date: "",
    drop_date: "",
    request_nominal: "",
    approved_nominal: "",
    nominal_drop: "",
    drop_langsung: ""
  });
  const [errorClient, setErrorClient] = useState(null);
  useEffect(() => {
    if (triggeredData) {
      setData((prevData) => ({
        ...prevData,
        request_date: triggeredData.request_date,
        drop_date: triggeredData.tanggal_drop,
        drop_langsung: triggeredData.drop_langsung,
        request_nominal: triggeredData.drop_langsung == "baru" ? triggeredData.drop_jadi : triggeredData.request,
        approved_nominal: triggeredData.acc,
        nominal_drop: triggeredData.drop_jadi
      }));
    }
  }, [triggeredData]);
  const handleSubmit = (status) => {
    transform((data2) => ({
      ...data2,
      updateType: status
    }));
    put(route("transaction.updateEverything", triggeredData == null ? void 0 : triggeredData.nomor_pengajuan), {
      preventDefault: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        onClosed();
      }
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: (e) => e.preventDefault(), children: [
    isMantri && /* @__PURE__ */ jsx(NoEditOverlay, { value: "Hanya bisa dilakukan oleh Pimpinan / Staff" }),
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-500", children: "Perubahan Nominal Mempengaruhi Perolehan Drop dan Rencana Drop" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-yellow-500", children: "Reset Pinjaman akan menghilangkan semua data angsuran pada pinjaman ini" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: (triggeredData == null ? void 0 : triggeredData.drop_langsung) == "lama" && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => handleSubmit("resetdata"),
        variant: "yellow",
        type: "submit",
        children: "Reset Pinjaman"
      }
    ) })
  ] });
};
export {
  ChangeDetail as default
};
