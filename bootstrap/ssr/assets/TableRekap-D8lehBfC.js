import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, f as TableFooter } from "./table-DgsbovDN.js";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import dayjs from "dayjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-Bo7Hup67.js";
import { CheckCircle, XCircle } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "@radix-ui/react-accordion";
import "@radix-ui/react-icons";
const TableRekap = ({
  setOnShowModal,
  saldoAwalBulan,
  setTriggeredData,
  datas
}) => {
  const [data, setData] = useState([]);
  const [sirkulasiAwal, setSirkulasiAwal] = useState([]);
  useEffect(() => {
    setData(datas);
    setSirkulasiAwal(saldoAwalBulan);
  }, [datas, saldoAwalBulan]);
  const calculateTotals = (data2, keyToSum) => {
    const result = data2.reduce(
      (acc, item) => acc + parseInt(item[keyToSum] ?? 0),
      0
    );
    return result;
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mb-3", children: /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-3", children: "Saldo Awal Bulan" }),
      /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-200", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Kelompok" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Surkulasi" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo CM" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo MB" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo ML" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { className: "text-tinny", children: sirkulasiAwal.map((item, key) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: item.kelompok }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.sirkulasi }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.sirkulasiCm }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.sirkulasiMb }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.sirkulasiMl }) })
        ] }, key)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-h-[65vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: /* @__PURE__ */ jsxs(Table, { className: "w-full mb-3 table-auto", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 z-10 bg-gray-100", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Kelompok" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Drop" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah Drop" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Storting" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah Storting" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Sirkulasi" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Angsuran CM" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah CM" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo CM" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Angsuran MB" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah MB" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo MB" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Angsuran ML" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah ML" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo ML" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Cek Staff" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Cek Target" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: data && data.map((item, key) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          TableRow,
          {
            className: `${dayjs(item.tanggal).format("dddd") == "Senin" ? "bg-red-300 hover:bg-red-400" : ""}`,
            children: /* @__PURE__ */ jsxs(TableCell, { className: "whitespace-nowrap", colSpan: "18", children: [
              dayjs(item.tanggal).format("dddd"),
              ",",
              dayjs(item.tanggal).format("DD-MM-YYYY")
            ] })
          },
          key
        ),
        item.data.map((subitem, subkey) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, {}),
          /* @__PURE__ */ jsx(TableCell, { children: subitem.kelompok }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.drop }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.total_drop }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.storting }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.total_storting }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.sirkulasi }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.angsuran_cm }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.total_angsuran_cm }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.saldo_cm }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.angsuran_mb }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.total_angsuran_mb }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.saldo_mb }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.angsuran_ml }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.total_angsuran_ml }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: subitem.saldo_ml }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: subitem.status_approve_kasir ? /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500" }) : /* @__PURE__ */ jsx(XCircle, { className: "text-red-500" }) }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center ", children: subitem.status_approve_kepala ? /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500" }) : /* @__PURE__ */ jsx(XCircle, { className: "text-red-500" }) }) })
        ] }, subkey)),
        /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx(TableCell, {}),
          /* @__PURE__ */ jsx(TableCell, { className: "font-semibold", children: "TOTAL" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "drop")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "total_drop")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "storting")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "total_storting")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "sirkulasi")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "angsuran_cm")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "total_angsuran_cm")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "saldo_cm")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "angsuran_mb")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "total_angsuran_mb")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "saldo_mb")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "angsuran_ml")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "total_angsuran_ml")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(item.data, "saldo_ml")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, {}),
          /* @__PURE__ */ jsx(TableCell, {})
        ] })
      ] })) }),
      /* @__PURE__ */ jsx(TableFooter, {})
    ] }) })
  ] });
};
export {
  TableRekap as default
};
