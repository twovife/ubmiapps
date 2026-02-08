import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, f as TableFooter } from "./table-DgsbovDN.js";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import dayjs from "dayjs";
import { B as BargeStatus } from "./BargeStatus-B_JPokIk.js";
import { B as BadgeStatus } from "./BadgeStatus-BDnUSm56.js";
import Action from "./Action-B3kswNf7.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "./badge-BDQK5pqs.js";
import "class-variance-authority";
import "./button-StO46bLt.js";
import "@radix-ui/react-slot";
import "./dialog-5zuHJd4f.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./card-DK9akThy.js";
import "./tabs-DpwcYzou.js";
import "@radix-ui/react-tabs";
import "axios";
import "./RiwayatPengajuan-C1LEAz5f.js";
import "@tanstack/react-table";
import "./Acc-CtGTC4IG.js";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
import "./NoEditOverlay-GIB1h_zq.js";
import "./useFrontEndPermission-i32ufhQ2.js";
import "@inertiajs/react";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "react-currency-input-field";
import "./ActionTable-BoZpZ8hB.js";
import "./RemoveLoan-CDbYPCRH.js";
import "./ChangeDetail-D6hxBMKl.js";
import "./input-BH-oxdzi.js";
const BukuTransaksiKepala = ({ datas }) => {
  var _a;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(datas);
  }, [datas]);
  const calculateTotals = (data2) => {
    return data2.reduce(
      (acc, item) => {
        acc.request += item.request || 0;
        acc.drop += item.drop || 0;
        acc.drop_jadi += item.drop_jadi || 0;
        acc.acc += item.acc || 0;
        return acc;
      },
      {
        request: 0,
        drop: 0,
        acc: 0,
        drop_jadi: 0
      }
    );
  };
  const totals = calculateTotals(data);
  const [onCreateShow, setOnCreateShow] = useState(false);
  const [actionData, setActionData] = useState();
  const handleOnCreateShowOpen = (e) => {
    setOnCreateShow(true);
    setActionData(e);
  };
  const handleOnCreateShowClosed = (e) => {
    setOnCreateShow(false);
    setActionData();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Action,
      {
        show: onCreateShow,
        onClosed: handleOnCreateShowClosed,
        triggeredData: actionData
      }
    ),
    /* @__PURE__ */ jsxs(Table, { className: "w-full mb-3 text-xs table-auto", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 z-10 bg-gray-100", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableHead, { className: "font-semibold text-black whitespace-nowrap", children: [
          dayjs((_a = data[0]) == null ? void 0 : _a.tanggal_drop).format("DD-MM-YYYY"),
          " "
        ] }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nasabah" }),
        /* @__PURE__ */ jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: data && data.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "w-0", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2", children: /* @__PURE__ */ jsx(
          BargeStatus,
          {
            value: item.status,
            onClick: () => handleOnCreateShowOpen(item)
          }
        ) }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-base font-semibold", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              " ",
              item.nama
            ] }),
            " ",
            /* @__PURE__ */ jsx(BadgeStatus, { value: item.drop_langsung })
          ] }),
          /* @__PURE__ */ jsx("div", { children: item.nik }),
          /* @__PURE__ */ jsx("div", { children: item.alamat })
        ] }) }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "Pengajuan" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: item.request })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "ACC" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: item.acc })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "Drop Jadi" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: item.drop_jadi })
          ] })
        ] })
      ] }, item.id)) }),
      /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, {}),
        /* @__PURE__ */ jsx(TableCell, { children: "Total" }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "Pengajuan" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: totals.request })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "ACC" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: totals.acc })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: "Drop Jadi" }),
            /* @__PURE__ */ jsx(FormatNumbering, { value: totals.drop_jadi })
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  BukuTransaksiKepala as default
};
