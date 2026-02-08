import { jsxs, jsx } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import dayjs from "dayjs";
import { B as Button } from "./button-StO46bLt.js";
import Action from "./Action-CZFUwQdw.js";
import "./badge-BDQK5pqs.js";
import { B as BargeStatus } from "./BargeStatus-B_JPokIk.js";
import "./input-BH-oxdzi.js";
import { T as TextInput } from "./TextInput-GCtCMl-T.js";
import { X } from "lucide-react";
import { B as BadgeStatus } from "./BadgeStatus-BDnUSm56.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./dialog-5zuHJd4f.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./card-DK9akThy.js";
import "axios";
import "./StatusPinjaman-BcI4A1Iw.js";
import "./BayarAngsuran-Daoj1Mle.js";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "react-currency-input-field";
import "./Checkbox-DLnjqb3e.js";
import "@inertiajs/react";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
import "./JenisNasabah-CaYZthxZ.js";
import "./InputError-cRVTeK4i.js";
import "./InputLabel-BhdXf1ED.js";
import "./PrimaryButton-BHWercwM.js";
import "./SelectList-DrCNDu1u.js";
import "./DeleteAngsuran-3Bs-fcCi.js";
import "./DeleteLoan-BRMUEAf1.js";
import "./useFrontEndPermission-i32ufhQ2.js";
import "./NoEditOverlay-GIB1h_zq.js";
import "sonner";
import "next-themes";
import "./Pengajuan-CCPOcjv6.js";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./WhiteOff-CmM5sBlW.js";
import "./PengajuanLama-CPWXFCy0.js";
const AngsuranTableMobile = ({ dateOfWeek, datas }) => {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState("");
  useEffect(() => {
    if (datas) {
      const filterData = (data2) => {
        return data2.map((monthData) => ({
          ...monthData,
          data: monthData.data.filter(
            (item) => !(item.lunas && !item.is_paid) && (!filterName || item.nama.toLowerCase().includes(filterName.toLowerCase()))
          )
        }));
      };
      const filteredData = filterData(datas);
      setData(filteredData);
    }
  }, [datas, filterName]);
  const calculateTotals = (data2, keyToSum) => {
    const result = data2.reduce(
      (acc, item) => acc + parseInt(item[keyToSum] ?? 0),
      0
    );
    return result;
  };
  const [triggeredId, setTriggeredId] = useState(null);
  const [show, setShow] = useState(false);
  const onCreateShowOpen = (id) => {
    setTriggeredId(id);
    setShow(true);
  };
  const onClosedShowOpen = () => {
    setShow(false);
    setTriggeredId(null);
  };
  const [selectedId, setSelectedId] = useState([]);
  const handleRowClick = (id) => {
    setSelectedId((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-auto h-[70vh] lg:h-[85vh] scrollbar-none", children: [
    /* @__PURE__ */ jsxs(Table, { className: "text-xs rounded-lg", children: [
      /* @__PURE__ */ jsxs(TableHeader, { className: "sticky top-0 left-0 z-10", children: [
        /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableHead, { colSpan: "4", className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full mb-2 lg:w-auto lg:max-w-60", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              placeholder: "Cari Nama",
              value: filterName,
              onChange: (e) => setFilterName(e.target.value),
              className: "w-full text-xs"
            }
          ),
          /* @__PURE__ */ jsx(
            X,
            {
              className: "absolute right-0 w-auto h-5 text-gray-400 -translate-x-1/2 -translate-y-1/2 top-1/2",
              onClick: (e) => setFilterName("")
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-200", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "No" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nasabah" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center border-x border-x-black", children: "Nominal" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TableBody, { className: "text-tinny", children: data ? data.map((row, i) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 17 + (dateOfWeek.length ?? 0), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(BargeStatus, { value: row.type2 }),
          " ",
          /* @__PURE__ */ jsx("div", { children: row.month })
        ] }) }) }),
        row.data.map((subrow, i2) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            className: `${subrow.is_paid ? subrow.angs_today == 0 ? "bg-red-300 hover:bg-red-400" : "bg-green-200 hover:bg-green-50" : ""}}`,
            children: [
              /* @__PURE__ */ jsx(TableCell, { onClick: () => handleRowClick(subrow.id), children: i2 + 1 }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                /* @__PURE__ */ jsx("div", { children: dayjs(subrow.tanggal_drop).format("DD-MM") }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "xs",
                    variant: subrow.lunas ? "green" : subrow.is_paid ? "blue" : "default",
                    onClick: () => onCreateShowOpen(subrow.id),
                    children: subrow.lunas ? "Lunas" : subrow.is_paid ? "Dibayar" : "Bayar"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsxs(TableCell, { children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold", children: [
                  subrow.nama,
                  subrow.notes && /* @__PURE__ */ jsx(BadgeStatus, { className: "ml-2", children: subrow.notes })
                ] }),
                /* @__PURE__ */ jsx("div", { children: subrow.nik }),
                /* @__PURE__ */ jsx("div", { children: subrow.alamat })
              ] }),
              /* @__PURE__ */ jsxs(TableCell, { className: "border-x border-x-black", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6 ", children: [
                  /* @__PURE__ */ jsx("div", { children: "P" }),
                  /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.pinjaman })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6 border-b-2 border-b-black ", children: [
                  /* @__PURE__ */ jsx("div", { children: "A" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "italic whitespace-nowrap", children: /* @__PURE__ */ jsx(
                      FormatNumbering,
                      {
                        value: subrow.angs_today,
                        prefix: "(",
                        suffix: ")"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.angsuran })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
                  /* @__PURE__ */ jsx("div", { children: "S" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                    subrow.pemutihan_today !== 0 && /* @__PURE__ */ jsx("div", { className: "italic whitespace-nowrap", children: /* @__PURE__ */ jsx(
                      FormatNumbering,
                      {
                        value: subrow.pemutihan_today,
                        prefix: "(",
                        suffix: ")"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.saldo })
                  ] })
                ] })
              ] })
            ]
          },
          i2
        )),
        /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx(TableCell, { className: "py-3", colSpan: 3, children: "TOTAL" }),
          /* @__PURE__ */ jsxs(TableCell, { className: "border-x border-x-black", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
              /* @__PURE__ */ jsx("div", { children: "P" }),
              /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  value: calculateTotals(row.data, "pinjaman")
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6 border-b-2 border-b-black ", children: [
              /* @__PURE__ */ jsx("div", { children: "A" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "italic whitespace-nowrap", children: /* @__PURE__ */ jsx(
                  FormatNumbering,
                  {
                    value: calculateTotals(row.data, "angs_today"),
                    prefix: "(",
                    suffix: ")"
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  FormatNumbering,
                  {
                    value: calculateTotals(row.data, "angsuran")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
              /* @__PURE__ */ jsx("div", { children: "S" }),
              /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  value: calculateTotals(row.data, "saldo")
                }
              )
            ] })
          ] })
        ] })
      ] }, i)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { children: "a" }) }) })
    ] }),
    /* @__PURE__ */ jsx(
      Action,
      {
        datas: data,
        show,
        onClosed: onClosedShowOpen,
        triggeredId
      }
    )
  ] });
};
export {
  AngsuranTableMobile as default
};
