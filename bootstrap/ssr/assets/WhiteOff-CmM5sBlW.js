import { jsx, jsxs } from "react/jsx-runtime";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { useForm } from "@inertiajs/react";
import "react";
import dayjs from "dayjs";
import { I as Input } from "./input-BH-oxdzi.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import CurrencyInput from "react-currency-input-field";
import { B as Button } from "./button-StO46bLt.js";
import "react-dom";
import "@headlessui/react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
const WhiteOff = ({ triggeredId, nominalWhiteOff }) => {
  const { data, setData, post, processing, errors } = useForm({
    id: triggeredId || "",
    transaction_date: dayjs().format("YYYY-MM-DD"),
    nominal: nominalWhiteOff || 0
  });
  const onHandleCurencyChange = (value) => {
    setData("nominal", value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (triggeredId) {
      post(route("pinjaman.white_off_loan", triggeredId));
    }
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "transaction_date", children: "Tanggal Pemutihan" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "date",
          id: "transaction_date",
          value: data.transaction_date,
          onChange: (e) => setData("transaction_date", e.target.value)
        }
      ),
      errors.field1 && /* @__PURE__ */ jsx(InputError, { children: errors.field1 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "field2", children: "Nominal" }),
      /* @__PURE__ */ jsx(
        CurrencyInput,
        {
          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          name: "nominal",
          allowDecimals: false,
          prefix: "Rp. ",
          min: 0,
          required: true,
          onValueChange: onHandleCurencyChange,
          value: data.nominal,
          placeholder: "Inputkan angka tanpa sparator"
        }
      ),
      errors.field2 && /* @__PURE__ */ jsx(InputError, { children: errors.field2 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-1 mb-3", children: [
      /* @__PURE__ */ jsxs(Label, { htmlFor: "agreement", className: "leading-relaxed", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "mr-3",
            id: "agreement",
            required: true,
            onChange: (e) => setData("agreement", e.target.checked)
          }
        ),
        "Saya Menyatakan Nasabah Ini Meninggal Dunia ( Dilunaskan )"
      ] }),
      errors.agreement && /* @__PURE__ */ jsx(InputError, { children: errors.agreement })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing || !triggeredId, children: "Submit" }) })
  ] }) });
};
export {
  WhiteOff as default
};
