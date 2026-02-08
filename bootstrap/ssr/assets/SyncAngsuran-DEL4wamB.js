import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-5zuHJd4f.js";
import axios from "axios";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import "./TextInput-GCtCMl-T.js";
import CurrencyInput from "react-currency-input-field";
import { B as Button } from "./button-StO46bLt.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import ButtonAngsuran from "./ButtonAngsuran-B3tUEJFO.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react-dom";
import "@headlessui/react";
const SyncAngsuran = ({ show = show, onClosed, triggeredId }) => {
  var _a;
  const [syncData, setSyncData] = useState(null);
  const [saldoBefores, setSaldoBefores] = useState(0);
  const { data, setData, post, processing, errors, reset } = useForm({
    saldobefore: 0,
    month: "",
    id: "",
    instalment: []
  });
  const modalIsClosed = () => {
    onClosed();
    reset();
    setSyncData(null);
    setIndexButton(null);
  };
  const month = (_a = usePage().props.server_filter) == null ? void 0 : _a.month;
  const day = usePage().props.server_filter.hari;
  useEffect(() => {
    if (show && triggeredId) {
      axios.post(route("pinjaman.get_synch_angsuran", triggeredId), {
        month,
        day
      }).then((res) => {
        var _a2;
        setSyncData((_a2 = res.data) == null ? void 0 : _a2.data);
        setData((prevData) => {
          var _a3, _b, _c, _d, _e, _f, _g, _h;
          return {
            ...prevData,
            saldobefore: (_b = (_a3 = res.data) == null ? void 0 : _a3.data) == null ? void 0 : _b.saldoSebelumnya,
            id: (_d = (_c = res.data) == null ? void 0 : _c.data) == null ? void 0 : _d.id,
            month: (_f = (_e = res.data) == null ? void 0 : _e.data) == null ? void 0 : _f.month,
            instalment: (_h = (_g = res.data) == null ? void 0 : _g.data) == null ? void 0 : _h.angsuran
          };
        });
      });
    }
  }, [show, triggeredId]);
  const handleInputChange = (value, name, index = null) => {
    if (index !== null) {
      const updatedInstalments = [...data.instalment];
      updatedInstalments[index] = {
        ...updatedInstalments[index],
        nominal: value
      };
      setData("instalment", updatedInstalments);
    } else {
      setData(name, value);
    }
  };
  useEffect(() => {
    var _a2;
    if (syncData == null ? void 0 : syncData.instalments) {
      const saldo = data == null ? void 0 : data.saldobefore;
      const sumInstalment = (_a2 = data == null ? void 0 : data.instalment) == null ? void 0 : _a2.reduce(
        (acc, item) => acc + (parseFloat(item.nominal) || 0),
        0
      );
      setSaldoBefores(saldo - sumInstalment);
    }
  }, [syncData, data]);
  const [nominalPembayaran, setNominalPembayaran] = useState([
    1e4,
    3e4,
    5e4,
    52e3,
    6e4,
    65e3,
    1e5,
    104e3,
    13e4,
    195e3,
    26e4,
    39e4
  ]);
  const [indexButton, setIndexButton] = useState(null);
  const submitForm = (e) => {
    e.preventDefault();
    post(route("pinjaman.synch_angsuran", triggeredId), {
      preserveScroll: true,
      onSuccess: () => {
        modalIsClosed();
      }
    });
  };
  const handleButtonAngsuran = (value, index) => {
    const updatedInstalments = [...data.instalment];
    updatedInstalments[index] = {
      ...updatedInstalments[index],
      nominal: value
    };
    setData("instalment", updatedInstalments);
  };
  const handleButtonAngsuranOnScroll = (e, index) => {
    var _a2;
    const value = ((_a2 = data.instalment[index]) == null ? void 0 : _a2.nominal) ?? 0;
    const updatedInstalments = [...data.instalment];
    updatedInstalments[index] = {
      ...updatedInstalments[index],
      nominal: parseFloat(value) + (e.deltaY < 0 ? -1e3 : 1e3)
    };
    setData("instalment", updatedInstalments);
  };
  const scrollthis = (e) => {
    const saldb = parseFloat(data.saldobefore) ?? 0;
    setData("saldobefore", saldb + (e.deltaY < 0 ? -1e3 : 1e3));
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: show, onOpenChange: (open) => open ? "" : modalIsClosed(), children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsxs(
      DialogContent,
      {
        className: `p-1 lg:p-6 lg:min-w-[50vw] min-w-[80vw] max-w-[90vw] w-auto`,
        children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Angsuran" }) }),
          /* @__PURE__ */ jsx("div", { className: "h-[80vh] overflow-auto", children: syncData ? /* @__PURE__ */ jsxs("div", { className: "lg:grid-cols-2 grid w-full gap-3", children: [
            /* @__PURE__ */ jsxs("form", { onSubmit: submitForm, children: [
              /* @__PURE__ */ jsx("p", { children: "Perbaiki Angsuran" }),
              /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
                "ANGSURAN PER",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-green-500 font-semibold", children: dayjs(syncData == null ? void 0 : syncData.month).format("MMMM YYYY") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsx(
                  InputLabel,
                  {
                    value: `Saldo  ${dayjs(syncData == null ? void 0 : syncData.month).format(
                      "MMMM YYYY"
                    )}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  CurrencyInput,
                  {
                    className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    name: "saldobefore",
                    defaultValue: 0,
                    allowDecimals: false,
                    prefix: "Rp. ",
                    min: 1,
                    required: true,
                    onWheel: scrollthis,
                    onValueChange: (value, name) => handleInputChange(value, name),
                    value: data.saldobefore,
                    placeholder: "Inputkan angka tanpa sparator"
                  }
                )
              ] }),
              (data == null ? void 0 : data.instalment) && (data == null ? void 0 : data.instalment.map((item, index) => {
                var _a2;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `mb-1 relative ${indexButton == index && "bg-green-50"}`,
                    children: [
                      /* @__PURE__ */ jsx(
                        InputLabel,
                        {
                          value: `Angsuran ${dayjs(item == null ? void 0 : item.transaction_date).format(
                            "DD-MM-YYYY"
                          )}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2",
                          name: "request_nominal",
                          defaultValue: 0,
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 1,
                          required: true,
                          onWheel: (e) => handleButtonAngsuranOnScroll(e, index),
                          onFocus: (e) => setIndexButton(index),
                          onValueChange: (value, name) => handleInputChange(value, name, index),
                          value: (_a2 = data.instalment[index]) == null ? void 0 : _a2.nominal,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      ),
                      indexButton == index && /* @__PURE__ */ jsx(
                        ButtonAngsuran,
                        {
                          nominalPembayaran,
                          pelunasan: saldoBefores,
                          onClickButton: handleButtonAngsuran,
                          index
                        }
                      )
                    ]
                  },
                  index
                );
              })),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Button, { variant: "green", type: "submit", children: "Submit" }) }),
              /* @__PURE__ */ jsx("div", { className: "text-green-500 font-semibold text-lg", children: saldoBefores.toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { children: "Detail Angsuran" }),
              /* @__PURE__ */ jsx("div", { className: "mb-1", children: syncData && /* @__PURE__ */ jsxs(Table, { children: [
                /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
                  /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
                  /* @__PURE__ */ jsx(TableHead, { children: "Nominal" })
                ] }) }),
                /* @__PURE__ */ jsx(TableBody, { children: syncData && (syncData == null ? void 0 : syncData.instalments.map((item, key) => {
                  var _a2;
                  return /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableCell, { children: dayjs(item == null ? void 0 : item.transaction_date).format(
                      "DD/MM/YYYY"
                    ) }),
                    /* @__PURE__ */ jsx(TableCell, { children: (_a2 = item.nominal) == null ? void 0 : _a2.toLocaleString() })
                  ] }, key);
                })) })
              ] }) })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { children: "MENUNGGU DATA" }) })
        ]
      }
    )
  ] });
};
export {
  SyncAngsuran as default
};
