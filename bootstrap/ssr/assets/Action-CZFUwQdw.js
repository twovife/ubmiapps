import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-5zuHJd4f.js";
import * as React from "react";
import { useState, useEffect } from "react";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import axios from "axios";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import dayjs from "dayjs";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import { S as StatusPinjaman } from "./StatusPinjaman-BcI4A1Iw.js";
import BayarAngsuran from "./BayarAngsuran-Daoj1Mle.js";
import JenisNasabah from "./JenisNasabah-CaYZthxZ.js";
import DeleteAngsuran from "./DeleteAngsuran-3Bs-fcCi.js";
import DeleteLoan from "./DeleteLoan-BRMUEAf1.js";
import { usePage } from "@inertiajs/react";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import { N as NoEditOverlay } from "./NoEditOverlay-GIB1h_zq.js";
import { Toaster as Toaster$1, toast } from "sonner";
import { useTheme } from "next-themes";
import { Copy } from "lucide-react";
import { B as BadgeStatus } from "./BadgeStatus-BDnUSm56.js";
import "./button-StO46bLt.js";
import Pengajuan from "./Pengajuan-CCPOcjv6.js";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "./badge-BDQK5pqs.js";
import "class-variance-authority";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "./input-BH-oxdzi.js";
import "react-currency-input-field";
import "./Checkbox-DLnjqb3e.js";
import "./InputError-cRVTeK4i.js";
import "./InputLabel-BhdXf1ED.js";
import "./PrimaryButton-BHWercwM.js";
import "./SelectList-DrCNDu1u.js";
import "./TextInput-GCtCMl-T.js";
import "@radix-ui/react-slot";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./WhiteOff-CmM5sBlW.js";
import "./PengajuanLama-CPWXFCy0.js";
import "@headlessui/react";
const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const Action = ({ datas, show = false, onClosed, triggeredId }) => {
  var _a;
  const isMobile = useIsMobile();
  const {
    auth,
    server_filter: { closed_transaction }
  } = usePage().props;
  (_a = auth == null ? void 0 : auth.permissions) == null ? void 0 : _a.includes("maintenance worker");
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState(false);
  const { isCreator } = useFrontEndPermission();
  const [customerData, setCustomerData] = useState({});
  const [pemutihan, setPemutihan] = useState(null);
  const [instalment, setInstalment] = useState([]);
  const onNikSubmit = async (triggeredId2) => {
    setLoading(true);
    setErorAxios();
    await axios({
      method: "get",
      url: route("pinjaman.get_loan_pinjaman", triggeredId2)
    }).then(function({ data }) {
      setLoading(false);
      setCustomerData(data.pinjaman);
      setInstalment(data.instalment);
      setPemutihan(data.pemutihan);
    }).catch(function({ response }) {
      setErorAxios(true);
    });
  };
  useEffect(() => {
    if (triggeredId) {
      onNikSubmit(triggeredId);
    }
  }, [triggeredId, datas]);
  const modalIsClosed = () => {
    onClosed();
    setCustomerData({});
    setInstalment([]);
    setPemutihan(null);
  };
  return /* @__PURE__ */ jsx(Dialog, { open: show, onOpenChange: (open) => open ? "" : modalIsClosed(), children: /* @__PURE__ */ jsxs(DialogContent, { className: `w-[95vw] p-1 lg:p-6`, children: [
    /* @__PURE__ */ jsx(DialogHeader, { className: "max-h-10", children: /* @__PURE__ */ jsx(DialogTitle, { className: "p-2", children: "Isi Angsurans" }) }),
    /* @__PURE__ */ jsxs("div", { className: "h-[80vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: [
      /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Rincian Nasabah" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "p-1 lg:p-5", children: /* @__PURE__ */ jsxs("div", { className: "w-full overflow-auto", children: [
          /* @__PURE__ */ jsx(Toaster, {}),
          isMobile ? /* @__PURE__ */ jsx(MobileCardList, { customerData }) : /* @__PURE__ */ jsx(PinjamanWebTable, { customerData })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-3 mt-3 lg:flex-row", children: [
        /* @__PURE__ */ jsxs(Card, { className: "flex-5", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Rincian Angsuran" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-1 lg:p-5", children: [
            pemutihan && /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(Table, { className: "text-xs", children: [
              /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-200", children: /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal Pemutihan" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nominal Pemutihan" })
              ] }) }),
              /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { className: "text-center", children: [
                /* @__PURE__ */ jsx(TableCell, { children: dayjs(pemutihan.transaction_date).format(
                  "DD-MM-YYYY"
                ) }),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                  FormatNumbering,
                  {
                    className: "text-center",
                    value: pemutihan.nominal
                  }
                ) })
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "w-full overflow-auto", children: /* @__PURE__ */ jsxs(Table, { className: "text-xs", children: [
              /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-200", children: /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Action" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Jumlah" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Saldo" }),
                /* @__PURE__ */ jsx(TableHead, { className: "hidden text-center lg:table-cell", children: "Mantri" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx(TableBody, { children: Object.keys(customerData).length !== 0 ? instalment.map((item) => /* @__PURE__ */ jsxs(TableRow, { className: "text-center", children: [
                /* @__PURE__ */ jsx(TableCell, { children: (!closed_transaction || closed_transaction <= item.transaction_date) && /* @__PURE__ */ jsx(DeleteAngsuran, { id: item.id }) }),
                /* @__PURE__ */ jsx(TableCell, { className: "whitespace-nowrap", children: dayjs(item.transaction_date).format("DD-MM-YY") }),
                /* @__PURE__ */ jsx(
                  TableCell,
                  {
                    className: `${item.danatitipan == 1 ? "text-red-500 font-semibold" : ""}`,
                    children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.nominal })
                  }
                ),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: item.saldo }) }),
                /* @__PURE__ */ jsx(TableCell, { className: "hidden lg:block", children: item.mantri }),
                /* @__PURE__ */ jsxs(TableCell, { children: [
                  " ",
                  /* @__PURE__ */ jsx(StatusPinjaman, { value: item.status })
                ] })
              ] })) : erorAxios ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { className: "font-semibold text-red-500", children: "TERJADI KESALAHAN SAAT PENGAMBILAN DATA, MOHON REFRESH BROWSER" }) }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { children: "Menunggu data . . ." }) }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-2 relative", children: [
          customerData.lunas == true ? /* @__PURE__ */ jsx(NoEditOverlay, { value: "Pinjaman Sudah Lunas" }) : !isCreator && /* @__PURE__ */ jsx(NoEditOverlay, { value: "User Tidak Dapat Digunakan Untuk Mengedit" }),
          loading ? /* @__PURE__ */ jsx("div", { children: "Loading" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              BayarAngsuran,
              {
                triggeredId: customerData.id,
                triggeredPinjaman: customerData,
                instalment
              }
            ),
            /* @__PURE__ */ jsx(
              Pengajuan,
              {
                triggeredId: customerData.id,
                triggeredPinjaman: customerData,
                instalment
              }
            ),
            /* @__PURE__ */ jsx(JenisNasabah, { loan: customerData }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 p-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Hapus Pinjaman" }),
              /* @__PURE__ */ jsx(DeleteLoan, { id: customerData.id, onClosed: modalIsClosed })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const PinjamanWebTable = ({ customerData }) => {
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-200", children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nomor" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nasabah" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "NIK" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Alamat" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Unit" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Kelompok" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Hari" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Tanggal Drop" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Pinjaman" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Nama Mantri" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Status" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Ket" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Keluar Target" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Lunas" })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: Object.keys(customerData).length !== 0 ? /* @__PURE__ */ jsxs(TableRow, { className: "text-center", children: [
      /* @__PURE__ */ jsx(TableCell, { children: customerData.id }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.nama }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.nik }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.alamat }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.branch }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.kelompok }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.hari }),
      /* @__PURE__ */ jsx(TableCell, { children: dayjs(customerData.tanggal_drop).format("DD-MM-YYYY") }),
      /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(FormatNumbering, { value: customerData.pinjaman }) }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.mantri }),
      /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StatusPinjaman, { value: customerData.status_pinjaman }) }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.notes }),
      /* @__PURE__ */ jsx(TableCell, { children: customerData.out_date ? dayjs(customerData.out_date).format("DD/MM") : "" }),
      /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StatusPinjaman, { value: customerData.lunas ? "Lunas" : "Belum" }) })
    ] }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { children: "Menunggu data . . ." }) }) })
  ] });
};
const MobileCardList = ({ customerData }) => {
  const sooners = (value) => {
    toast("Nik Telah Dicopy");
    navigator.clipboard.writeText(value);
  };
  if (!customerData || customerData.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: "text-center text-muted", children: "Data tidak tersedia." });
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-md overflow-hidden text-xs bg-white rounded-lg shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-center text-red-500", children: customerData.nama }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          "NIK: ",
          customerData.nik
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-blue-500",
            onClick: () => sooners(customerData.nik),
            children: /* @__PURE__ */ jsx(Copy, { className: "h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: customerData.alamat })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Nomor:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.id })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Status:" }),
        /* @__PURE__ */ jsx(BadgeStatus, { value: customerData.status_pinjaman })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Unit:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.branch })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Kelompok:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.kelompok })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Tanggal Drop:" }),
        /* @__PURE__ */ jsxs("span", { className: "text-gray-800", children: [
          customerData.hari,
          ", ",
          dayjs(customerData.tanggal_drop).format("DD-MM-YYYY")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Pinjaman:" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `font-bold ${customerData.acc === "Ya" ? "text-green-600" : "text-red-600"}`,
            children: /* @__PURE__ */ jsx(
              FormatNumbering,
              {
                className: "text-center",
                value: customerData.pinjaman
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Mantri:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.mantri })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Ket:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.notes })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Keluar Target:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: customerData.out_date ? dayjs(customerData.out_date).format("DD/MM") : "" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "LUNAS:" }),
        /* @__PURE__ */ jsx(StatusPinjaman, { value: customerData.lunas ? "Lunas" : "Belum" })
      ] })
    ] })
  ] }) });
};
export {
  Action as default
};
