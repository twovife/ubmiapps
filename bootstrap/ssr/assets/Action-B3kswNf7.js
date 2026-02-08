import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-5zuHJd4f.js";
import { useState, useEffect } from "react";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-Bo7Hup67.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DpwcYzou.js";
import axios from "axios";
import RiwayatPengajuan from "./RiwayatPengajuan-C1LEAz5f.js";
import Acc from "./Acc-CtGTC4IG.js";
import ActionTable from "./ActionTable-BoZpZ8hB.js";
import RemoveLoan from "./RemoveLoan-CDbYPCRH.js";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "./button-StO46bLt.js";
import "./label-e-KMhPKP.js";
import "@inertiajs/react";
import ChangeDetail from "./ChangeDetail-D6hxBMKl.js";
import { N as NoEditOverlay } from "./NoEditOverlay-GIB1h_zq.js";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-accordion";
import "@radix-ui/react-tabs";
import "./table-DgsbovDN.js";
import "@tanstack/react-table";
import "dayjs";
import "./BadgeStatus-BDnUSm56.js";
import "./badge-BDQK5pqs.js";
import "class-variance-authority";
import "react-currency-input-field";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "./input-BH-oxdzi.js";
const Action = ({ show = false, onClosed, triggeredData }) => {
  const [data, setData] = useState([]);
  const { isCreator } = useFrontEndPermission();
  const [customerData, setCustomerData] = useState([]);
  const [acc, setAcc] = useState();
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState(false);
  useEffect(() => {
    setData(triggeredData);
    setAcc(triggeredData == null ? void 0 : triggeredData.request);
  }, [triggeredData]);
  const onNikSubmit = async (signal) => {
    var _a, _b;
    setLoading(true);
    setErorAxios();
    try {
      const { data: data2 } = await axios.post(
        route("transaction.nasabah_buku_transaksi"),
        { nik: triggeredData.nik },
        { signal }
        // 👈 inject signal buat cancel
      );
      setCustomerData(data2.data ?? []);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request dibatalkan");
      } else {
        setErorAxios(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!(triggeredData == null ? void 0 : triggeredData.nik)) return;
    const controller = new AbortController();
    onNikSubmit(controller.signal);
    return () => {
      controller.abort();
    };
  }, [triggeredData]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Dialog, { open: show, onOpenChange: (open) => open ? "" : onClosed(), children: /* @__PURE__ */ jsx(DialogContent, { className: "w-[98vw] p-2", children: /* @__PURE__ */ jsxs(DialogHeader, { children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "p-2", children: "Check Transaksi Mantri" }),
    /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "account", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "account", children: "Action" }),
        /* @__PURE__ */ jsx(TabsTrigger, { disabled: loading, value: "history", children: loading ? "Loading..." : "Crash Kantor" }),
        /* @__PURE__ */ jsx(TabsTrigger, { disabled: loading, value: "crashubmml", children: loading ? "Loading..." : "Crash (NT)" }),
        /* @__PURE__ */ jsx(TabsTrigger, { disabled: loading, value: "crashubm", children: loading ? "Loading..." : "Crash (T)" })
      ] }),
      /* @__PURE__ */ jsxs(
        TabsContent,
        {
          value: "account",
          className: "h-[80vh] overflow-auto scrollbar-thin",
          children: [
            /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Detail Pengajuan" }) }),
              /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "overflow-auto border rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: /* @__PURE__ */ jsx(ActionTable, { datas: data }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 mt-3 lg:flex-row", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsxs(Card, { className: "relative mb-3", children: [
                  /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "ACC / DROP" }) }),
                  /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-end justify-center gap-2 mx-auto mb-3", children: /* @__PURE__ */ jsx(
                    Acc,
                    {
                      id: data == null ? void 0 : data.nomor_pengajuan,
                      triggeredData: data,
                      onClosed
                    }
                  ) }) })
                ] }),
                /* @__PURE__ */ jsxs(Card, { className: "relative", children: [
                  !isCreator && /* @__PURE__ */ jsx(NoEditOverlay, { value: "User Tidak Dapat Digunakan Untuk Mengedit" }),
                  /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Admin Edit" }) }),
                  /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { children: data && /* @__PURE__ */ jsx(
                    ChangeDetail,
                    {
                      onClosed,
                      triggeredData
                    }
                  ) }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Card, { className: "relative w-full", children: [
                !isCreator && /* @__PURE__ */ jsx(NoEditOverlay, { value: "User Tidak Dapat Digunakan Untuk Mengedit" }),
                /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Remove Loan" }) }),
                /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-full mt-6 mb-3 text-start", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-red-500", children: "Hapus Pinjaman" }),
                    /* @__PURE__ */ jsxs("p", { className: "mb-1 text-xs italic font-light text-red-500", children: [
                      "Perhatian !!!, Jika pengajuan berstatus sukses, maka pengajuan sudah masuk dalam daftar angsuran, jika tetap dihapus akan mempengaruhi data pada angsuran, dan angsuran akan ikut terhapus.",
                      /* @__PURE__ */ jsx("br", {}),
                      " ( Penghapusan hanya bisa dilakukan 2hari dari tanggal drop (Mantri) dan 2bulan (Admin & Kepala))"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
                      RemoveLoan,
                      {
                        triggeredId: data == null ? void 0 : data.nomor_pengajuan,
                        onClosed
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx(Accordion, { className: "mb-3", type: "single", collapsible: true, children: /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", children: [
                    /* @__PURE__ */ jsx(AccordionTrigger, { children: "Tambahan" }),
                    /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxs("ul", { className: "list-disc list-outside", children: [
                      /* @__PURE__ */ jsx("li", { children: "1. Jika ada kesalahan pada angsuran baru ( angsuran hari ini ) utamakan menghapus, dan buat angsuran lagi." }),
                      /* @__PURE__ */ jsx("li", { children: "2. Jika terjadi kesalahan Status * Tanggal, usahakan untuk ganti tanggal ( tanggal drop / tanggal request ) dan dan reset status setelah itu" }),
                      /* @__PURE__ */ jsx("li", { children: "3. Setelah mengganti Detail pada angsuran, dimohon untuk cek ulang, storting & dan transaksi lagi, dikarenakan perubahan pada detail, akan mempengaruhi laporan lainnya" }),
                      /* @__PURE__ */ jsx("li", { className: "text-red-500", children: "4. Reset Status Hanya Tersedia jika pinjaman adalah drop lama / pengajuan" })
                    ] }) }) })
                  ] }) })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        TabsContent,
        {
          value: "history",
          className: "h-[80vh] overflow-auto scrollbar-thin",
          children: /* @__PURE__ */ jsxs("div", { className: "overflow-auto scrollbar-thin h-max", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-1", children: "Crash Antar Kelompok Dalam 1 Kantor" }),
            /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData.history_branch })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        TabsContent,
        {
          value: "crashubmml",
          className: "h-[80vh] overflow-auto scrollbar-thin",
          children: /* @__PURE__ */ jsxs("div", { className: "overflow-auto scrollbar-thin h-max", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-1", children: "Crash Kantor Lain Dalam UBM (Macet)" }),
            /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData.history_macet_lain })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        TabsContent,
        {
          value: "crashubm",
          className: "h-[80vh] overflow-auto scrollbar-thin",
          children: /* @__PURE__ */ jsxs("div", { className: "overflow-auto scrollbar-thin h-max", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-1", children: "Crash Kantor Lain Dalam UBM (Target)" }),
            /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData.history_target })
          ] })
        }
      )
    ] }) })
  ] }) }) }) });
};
export {
  Action as default
};
