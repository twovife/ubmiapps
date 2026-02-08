import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import { useState, useEffect } from "react";
import { L as Label } from "./label-e-KMhPKP.js";
import { I as Input } from "./input-BH-oxdzi.js";
import CurrencyInput from "react-currency-input-field";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import { B as Button } from "./button-StO46bLt.js";
import { usePage, useForm } from "@inertiajs/react";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import "dayjs";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "react-dom";
import "@headlessui/react";
const BayarAngsuran = ({ triggeredId, triggeredPinjaman, instalment }) => {
  const [triggeredData, setTriggeredData] = useState({});
  useEffect(() => {
    setTriggeredData(triggeredPinjaman);
  }, [triggeredPinjaman]);
  const {
    server_filter: { closed_transaction, today }
  } = usePage().props;
  const { data, setData, post, errors, processing, reset, recentlySuccessful } = useForm({
    type_transaksi: "bayar",
    transaction_date: "",
    nominal: 0,
    id: ""
  });
  useEffect(() => {
    setData("id", triggeredId);
  }, [triggeredId, recentlySuccessful]);
  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };
  const onInputChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  const buttonValueClick = (e) => {
    const value = e.target.getAttribute("data-value");
    setData("nominal", value);
  };
  const buttonAddNominal = (e) => {
    const nominal = parseInt(data.nominal);
    const value = parseInt(e.target.getAttribute("data-value"));
    setData("nominal", value + nominal);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route("pinjaman.bayar_pinjaman", data.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset("transaction_date", "nominal");
      }
    });
  };
  const [nominalPembayaran, setNominalPembayaran] = useState([
    5e4,
    52e3,
    6e4,
    65e3,
    1e5,
    13e4,
    195e3,
    26e4,
    39e4
  ]);
  useEffect(() => {
    var _a;
    setData((prev) => ({
      ...prev,
      transaction_date: today
    }));
    if (instalment.length > 0) {
      const getMostFrequentNumber = (data2) => {
        const frequency = data2.reduce((acc, { nomor }) => {
          acc[nomor] = (acc[nomor] || 0) + 1;
          return acc;
        }, {});
        return Object.keys(frequency).reduce(
          (a, b) => frequency[a] > frequency[b] ? a : b
        );
      };
      const result = Number(getMostFrequentNumber(instalment));
      const pelunasan = ((_a = instalment.sort((a, b) => a.saldo - b.saldo)[0]) == null ? void 0 : _a.saldo) ?? 0;
      setNominalPembayaran((prev) => {
        const validResult = !isNaN(result) && result > 0 ? result : null;
        const validPelunasan = !isNaN(pelunasan) && pelunasan > 0 ? pelunasan : null;
        const updated = [
          ...new Set(
            [
              ...prev.filter(
                (value) => value !== validResult && value !== validPelunasan
              ),
              validResult,
              validPelunasan
            ].filter((value) => value !== null)
          )
          // Hapus null dari array
        ];
        return updated.sort((a, b) => a - b);
      });
    }
  }, [instalment]);
  return /* @__PURE__ */ jsxs(Card, { className: "relative w-full mb-3", children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Isi Angsuran" }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "relative", children: /* @__PURE__ */ jsxs("form", { onSubmit: onSubmitForm, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "transaction_date", children: "Tanggal Pembayaran" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "date",
            min: closed_transaction,
            name: "transaction_date",
            id: "transaction_date",
            className: "w-full",
            value: data.transaction_date,
            onChange: onInputChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "nominal", children: "Nominal" }),
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
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            onClick: buttonAddNominal,
            "data-value": 1e3,
            children: "+1 Rb"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            onClick: buttonAddNominal,
            "data-value": 5e3,
            children: "+5 Rb"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            onClick: buttonAddNominal,
            "data-value": 1e4,
            children: "+10 Rb"
          }
        ),
        nominalPembayaran && nominalPembayaran.map((item) => /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            onClick: buttonValueClick,
            "data-value": item,
            children: [
              (item / 1e3).toLocaleString("id-ID"),
              " Rb"
            ]
          }
        ))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-6", children: [
        /* @__PURE__ */ jsx("div", { children: triggeredData.status_pinjaman !== "normal" && /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              name: "danatitipan",
              value: data.danatitipan,
              onChange: onInputChange
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Dana Titipan?" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { disabled: processing, type: "submit", children: "Submit" })
      ] })
    ] }) })
  ] });
};
export {
  BayarAngsuran as default
};
