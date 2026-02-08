import { jsxs, jsx } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import dayjs from "dayjs";
import { B as Button } from "./button-StO46bLt.js";
import Action from "./Action-CZFUwQdw.js";
import { B as Badge } from "./badge-BDQK5pqs.js";
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
import "./input-BH-oxdzi.js";
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
import "./TextInput-GCtCMl-T.js";
import "./DeleteLoan-BRMUEAf1.js";
import "./useFrontEndPermission-i32ufhQ2.js";
import "./NoEditOverlay-GIB1h_zq.js";
import "sonner";
import "next-themes";
import "lucide-react";
import "./BadgeStatus-BDnUSm56.js";
import "./Pengajuan-CCPOcjv6.js";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./WhiteOff-CmM5sBlW.js";
import "./PengajuanLama-CPWXFCy0.js";
const AngsuranByDateTable = ({ datas }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(datas);
  }, [datas]);
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
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-auto h-[60vh] lg:h-[85vh]", children: [
    /* @__PURE__ */ jsxs(Table, { className: "text-xs rounded-lg", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 left-0 z-10", children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-200", children: [
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nama Nasabah" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "NIK" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Note" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Alamat" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Kelompok" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Hari" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Pnj Ke" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "X Angs" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center border-x border-x-black", children: "Pinjaman" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center border-x border-x-black", children: "Angsuran" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center border-x border-x-black", children: "Saldo" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Note" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: data ? data.map((row, i) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 16, children: row.month }) }),
        row.data.map((subrow, i2) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            className: `${selectedId.includes(subrow.id) ? "bg-green-200 hover:bg-green-50" : ""}}`,
            children: [
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx("div", { children: dayjs(subrow.tanggal_drop).format("DD-MM") }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "xs",
                    onClick: () => onCreateShowOpen(subrow.id),
                    children: "Pay"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsx(TableCell, { onClick: () => handleRowClick(subrow.id), children: subrow.nama }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: subrow.nik }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-center", children: [
                subrow.lunas ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 mr-1 text-xs text-white bg-green-400 border rounded", children: "Lunas" }) : "",
                subrow.status_pinjaman == "normal" ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 mr-1 text-xs border rounded", children: subrow.status_pinjaman }) : subrow.status_pinjaman == "cm" ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 mr-1 text-xs text-white bg-yellow-400 border rounded", children: subrow.status_pinjaman }) : subrow.status_pinjaman == "mb" ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 mr-1 text-xs text-white bg-red-400 border rounded", children: subrow.status_pinjaman }) : subrow.status_pinjaman == "ml" ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 mr-1 text-xs text-white bg-black border rounded", children: subrow.status_pinjaman }) : /* @__PURE__ */ jsx("div", { children: subrow.status_pinjaman }),
                subrow.notes !== null ? /* @__PURE__ */ jsx(Badge, { children: subrow.notes }) : ""
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: subrow.alamat }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: subrow.kelompok }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: subrow.hari }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: subrow.pinjaman_ke }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: subrow.x_angs }),
              /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.pinjaman }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.angsuran }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(FormatNumbering, { value: subrow.saldo }) }),
              /* @__PURE__ */ jsx(TableCell, { children: subrow.notes })
            ]
          },
          i2
        )),
        /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx(TableCell, { className: "py-3", colSpan: 9, children: /* @__PURE__ */ jsx("b", { children: "Total" }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(row.data, "pinjaman")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(row.data, "angsuran")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { className: "border-x border-x-black", children: /* @__PURE__ */ jsx(
            FormatNumbering,
            {
              value: calculateTotals(row.data, "saldo")
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { className: "py-3" })
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
  AngsuranByDateTable as default
};
