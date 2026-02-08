import { jsxs, jsx } from "react/jsx-runtime";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-5zuHJd4f.js";
import { useEffect } from "react";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import { usePage, useForm } from "@inertiajs/react";
import { L as Label } from "./label-e-KMhPKP.js";
import CurrencyInput from "react-currency-input-field";
import { B as Button } from "./button-StO46bLt.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "react-dom";
import "@headlessui/react";
const ApprovalAkhir = ({ datas, show = false, onClosed }) => {
  const {
    sirkulasi,
    server_filter: { month, hari, groupId }
  } = usePage().props;
  const { data, setData, post, reset, processing, errors, transform } = useForm(
    {
      ml_amount: "",
      mb_amount: "",
      cm_amount: "",
      amount: "",
      amount_next: "",
      cm_next: "",
      mb_next: "",
      ml_next: ""
    }
  );
  useEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const sumAllSaldo = (data2) => {
      return Object.values(data2).reduce((total, { saldo }) => total + saldo, 0);
    };
    let totalSaldo = 0;
    if (datas) {
      totalSaldo = sumAllSaldo(datas);
    }
    setData({
      month,
      hari,
      transaction_loan_officer_grouping_id: groupId,
      ml_amount: (sirkulasi == null ? void 0 : sirkulasi.ml_amount) ?? 0,
      mb_amount: (sirkulasi == null ? void 0 : sirkulasi.mb_amount) ?? 0,
      cm_amount: (sirkulasi == null ? void 0 : sirkulasi.cm_amount) ?? 0,
      calon_cm_amount: ((_a = datas == null ? void 0 : datas.ccm) == null ? void 0 : _a.sirkulasi) ?? 0,
      normal: (((_b = datas == null ? void 0 : datas.n1) == null ? void 0 : _b.sirkulasi) ?? 0) + (((_c = datas == null ? void 0 : datas.normal) == null ? void 0 : _c.sirkulasi) ?? 0),
      amount: (sirkulasi == null ? void 0 : sirkulasi.amount) ?? 0,
      ml_amount_akhir: ((_d = datas == null ? void 0 : datas.ml) == null ? void 0 : _d.saldo) ?? 0,
      mb_amount_akhir: ((_e = datas == null ? void 0 : datas.mb) == null ? void 0 : _e.saldo) ?? 0,
      cm_amount_akhir: ((_f = datas == null ? void 0 : datas.cm) == null ? void 0 : _f.saldo) ?? 0,
      calon_cm_amount_akhir: ((_g = datas == null ? void 0 : datas.ccm) == null ? void 0 : _g.saldo) ?? 0,
      normal_akhir: (((_h = datas == null ? void 0 : datas.n1) == null ? void 0 : _h.saldo) ?? 0) + (((_i = datas == null ? void 0 : datas.normal) == null ? void 0 : _i.saldo) ?? 0),
      amount_akhir: totalSaldo,
      amount_next: totalSaldo,
      ml_next: (((_j = datas == null ? void 0 : datas.ml) == null ? void 0 : _j.saldo) ?? 0) + (((_k = datas == null ? void 0 : datas.mb) == null ? void 0 : _k.saldo) ?? 0),
      mb_next: ((_l = datas == null ? void 0 : datas.cm) == null ? void 0 : _l.saldo) ?? 0,
      cm_next: ((_m = datas == null ? void 0 : datas.ccm) == null ? void 0 : _m.saldo) ?? 0,
      normal_next: (((_n = datas == null ? void 0 : datas.n1) == null ? void 0 : _n.saldo) ?? 0) + (((_o = datas == null ? void 0 : datas.normal) == null ? void 0 : _o.saldo) ?? 0)
    });
  }, [sirkulasi, show]);
  const modalIsClosed = () => {
    onClosed();
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route("adminpanel.sirkulasiAwal"), {
      onSuccess: () => {
        modalIsClosed();
      }
    });
  };
  const onHandleCurencyChange = (value, name) => {
    const keySum = ["ml_next", "mb_next", "cm_next", "normal_next"];
    let nominalData = 0;
    keySum.forEach((key) => {
      if (key === name) {
        nominalData += parseInt(value);
      } else {
        nominalData += parseInt(data[key]);
      }
    });
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      amount_next: nominalData
    }));
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: show, onOpenChange: (open) => open ? "" : modalIsClosed(), children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsxs(
      DialogContent,
      {
        className: `w-[90vw] h-[90vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin`,
        children: [
          /* @__PURE__ */ jsx(DialogHeader, { className: "max-h-10", children: /* @__PURE__ */ jsx(DialogTitle, { children: "Isi Angsuran" }) }),
          /* @__PURE__ */ jsx(Card, { className: "w-full", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Sirkulasi" }),
            /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
              /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Sirkulasi Awal" }) }),
              /* @__PURE__ */ jsxs("form", { onSubmit: onSubmitForm, children: [
                /* @__PURE__ */ jsxs("div", { className: "flex w-full", children: [
                  /* @__PURE__ */ jsxs(CardContent, { className: "flex-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "amount", children: "Sirkulasi Awal" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "amount",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.amount,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "ml_amount", children: "Saldo Awal (ML)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "ml_amount",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.ml_amount,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "mb_amount", children: "Saldo Awal (MB)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "mb_amount",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.mb_amount,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "cm_amount", children: "Saldo Awal (CM)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "cm_amount",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.cm_amount,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "calon_cm_amount", children: "Saldo Awal (Calon CM)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "calon_cm_amount",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.calon_cm_amount,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "normal", children: "Saldo Awal (Normal)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "normal",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.normal,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(CardContent, { className: "flex-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Sirkulasi Akhir" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          value: data.amount_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "ml_amount_akhir", children: "Saldo Akhir (ML)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "ml_amount_akhir",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.ml_amount_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "mb_amount_akhir", children: "Saldo Akhir (MB)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "mb_amount_akhir",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.mb_amount_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "cm_amount_akhir", children: "Saldo Akhir (CM)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "cm_amount_akhir",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.cm_amount_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "calon_cm_amount_akhir", children: "Saldo Akhir (Calon CM)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "calon_cm_amount_akhir",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.calon_cm_amount_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "normal_akhir", children: "Saldo Akhir (Normal)" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "normal_akhir",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          readOnly: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.normal_akhir,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(CardContent, { className: "flex-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "amount_next", children: "Sirkulasi Awal Bulan Depan" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "amount_next",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.amount_next,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "ml_next", children: "Saldo ML Awal Bulan Depan" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "ml_next",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.ml_next,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "mb_next", children: "Saldo MB Awal Bulan Depan" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "mb_next",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.mb_next,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "cm_next", children: "Saldo CM Awal Bulan Depan" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "cm_next",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.cm_next,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "normal_next", children: "Saldo Normal Awal Bulan Depan" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "normal_next",
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 0,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.normal_next,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end p-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start flex-1 gap-3 mb-1 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        placeholder: "Select Permission",
                        id: "daily_kepala_approval",
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "daily_kepala_approval", children: "Konfirmasi Jika Sudah Benar Semua" })
                  ] }),
                  /* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" })
                ] })
              ] })
            ] })
          ] }) })
        ]
      }
    )
  ] });
};
export {
  ApprovalAkhir as default
};
