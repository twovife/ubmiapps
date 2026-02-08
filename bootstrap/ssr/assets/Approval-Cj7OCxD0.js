import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { useState, useEffect } from "react";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import { B as Button } from "./button-StO46bLt.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-5zuHJd4f.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-label";
import dayjs from "dayjs";
import "postcss";
import CurrencyInput from "react-currency-input-field";
import "react-dom";
import "@headlessui/react";
import "react-number-format";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
const Approval = ({
  show = false,
  onClosed,
  triggeredDate,
  staticData,
  datas
}) => {
  const { data, setData, post, reset, errors, processing } = useForm({
    id: "",
    date: "",
    masuk: "",
    keluar: "",
    target: "",
    baru: "",
    lama: "",
    storting: "",
    drop: "",
    rencana: "",
    tanggal_rencana_minggu_depan: "",
    rencana_minggu_depan: "",
    target_minggu_depan: ""
  });
  const [triggeredData, setTriggeredData] = useState([]);
  const [tanggalRencanaMingguDepan, setTanggalRencanaMingguDepan] = useState();
  const [transaksiOpenHariIni, setTransaksiOpenHariIni] = useState([]);
  const [transaksiOpenMingguDepan, setTransaksiOpenMingguDepan] = useState([]);
  const [transaksiHariIni, setTransaksiHariIni] = useState({
    drop_hari_ini: 0,
    drop_jadi: 0,
    gagal: 0,
    open1: 0,
    pengajuan: 0,
    acc: 0,
    tolak: 0,
    open2: 0
  });
  const [erorRequest, setErorRequest] = useState(false);
  useEffect(() => {
    const flaatenData = (staticData == null ? void 0 : staticData.flat(2)) ?? [];
    const getSelecterDateRencanaDropData = datas == null ? void 0 : datas.filter(
      (item) => item.tanggal === triggeredDate
    );
    const getIsGenerateRencanaDropMingguDepan = datas == null ? void 0 : datas.filter(
      (item) => item.tanggal > triggeredDate && item.is_generated === true
    )[0];
    const triggeredData2 = Object.assign({}, getSelecterDateRencanaDropData[0]);
    setTriggeredData(triggeredData2);
    if (triggeredData2) {
      const filteredData = flaatenData.filter((item) => {
        return item.request_date === triggeredData2.tanggal;
      });
      const filterCount = (array, condition) => array.filter(condition).length;
      const drop_today = filterCount(
        flaatenData,
        (item) => item.tanggal_drop === triggeredData2.tanggal && item.status !== "tolak"
      );
      const drop_jadi = filterCount(
        flaatenData,
        (item) => item.tanggal_drop === triggeredData2.tanggal && item.status === "success"
      );
      const drop_gagal = filterCount(
        flaatenData,
        (item) => item.tanggal_drop === triggeredData2.tanggal && item.status === "gagal"
      );
      const open1 = filterCount(
        flaatenData,
        (item) => item.tanggal_drop === triggeredData2.tanggal && item.status !== "gagal" && item.status !== "success" && item.status !== "tolak"
      );
      const pengajuan = filterCount(
        filteredData,
        (item) => item.tanggal_drop !== item.request_date
      );
      const acc = filterCount(
        filteredData,
        (item) => item.tanggal_drop !== item.request_date && item.status === "acc"
      );
      const tolak = filterCount(
        filteredData,
        (item) => item.tanggal_drop !== item.request_date && item.status === "tolak"
      );
      const open2 = filterCount(
        filteredData,
        (item) => item.tanggal_drop !== item.request_date && item.status === "open"
      );
      setTransaksiHariIni((prevSet) => ({
        ...prevSet,
        drop_hari_ini: drop_today,
        drop_jadi,
        gagal: drop_gagal,
        open1,
        pengajuan,
        acc,
        tolak,
        open2
      }));
      const transaksiOpenToday = flaatenData.filter((item) => {
        return item.tanggal_drop === triggeredData2.tanggal && (item.status == "open" || item.status == "acc");
      });
      const transaksiOpenNextDay = flaatenData.filter((item) => {
        return item.request_date === triggeredData2.tanggal && item.status == "open";
      });
      setTransaksiOpenHariIni(transaksiOpenToday);
      setTransaksiOpenMingguDepan(transaksiOpenNextDay);
      let uniqueDropDatesString = null;
      let rencana = 0;
      if (filteredData.length > 0) {
        const dropDepan = filteredData.filter((item) => {
          return item.tanggal_drop !== item.request_date;
        });
        const uniqueDropDates = [
          ...new Set(dropDepan == null ? void 0 : dropDepan.map((item) => item.tanggal_drop))
        ];
        uniqueDropDatesString = uniqueDropDates[0];
        const filteredData2 = filteredData.filter((item) => {
          return item.tanggal_drop === uniqueDropDatesString;
        });
        rencana = filteredData2.reduce((a, item) => {
          return a + item.acc;
        }, 0);
      }
      setData({
        id: triggeredData2.grouping_id,
        date: triggeredData2.tanggal,
        target: triggeredData2.target,
        masuk: triggeredData2.drop !== 0 && triggeredData2.masuk == 0 ? triggeredData2.drop * 0.13 : triggeredData2.masuk,
        keluar: triggeredData2.keluar,
        baru: triggeredData2.baru,
        lama: triggeredData2.lama,
        storting: triggeredData2.storting,
        drop: triggeredData2.drop,
        rencana: triggeredData2.rencana,
        tanggal_rencana_minggu_depan: getIsGenerateRencanaDropMingguDepan ? getIsGenerateRencanaDropMingguDepan.tanggal : uniqueDropDatesString ?? null,
        rencana_minggu_depan: rencana ?? 0,
        target_minggu_depan: 0
      });
      setTanggalRencanaMingguDepan(
        getIsGenerateRencanaDropMingguDepan ? getIsGenerateRencanaDropMingguDepan.tanggal : uniqueDropDatesString ?? null
      );
    }
  }, [datas, show, triggeredDate]);
  useEffect(() => {
    setData(
      "target_minggu_depan",
      parseInt(data.target) + (parseInt(data.masuk) - parseInt(data.keluar))
    );
  }, [data.target, data.masuk, data.keluar]);
  const [loading, setLoading] = useState(false);
  const onInputChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };
  const closedModal = () => {
    onClosed();
    reset();
    setErorRequest(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route("kasir.rekap.ceklist_kepala"), {
      onSuccess: () => {
        reset();
        onClosed();
      }
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: show, onOpenChange: (open) => open ? "" : closedModal(), children: [
    /* @__PURE__ */ jsx(Loading, { show: loading || processing }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "w-[90vw] h-[90vh] lg:h-auto lg:max-w-xl overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Cek Transaksi & Input Rencana Drop" }) }),
      loading ? /* @__PURE__ */ jsx("div", { children: "Data Sedang Dimuat" }) : /* @__PURE__ */ jsxs("div", { children: [
        triggeredData && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-semibold underline", children: "Total Transaksi Hari Ini" }),
          /* @__PURE__ */ jsxs(Table, { className: "mb-3 border shadow-sm", children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Target" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Drop" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Storting" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Baru" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Lama" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Rencana" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: data.target
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: triggeredData.drop
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: triggeredData.storting
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: triggeredData.baru
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: triggeredData.lama
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: triggeredData.rencana
                }
              ) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Table, { className: "mb-3 border shadow-sm", children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-green-200", children: "Total Drop" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-green-200", children: "Success" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-green-200", children: "Gagal" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-green-200", children: "Open" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-red-200", children: "Pengajuan" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-red-200", children: "Acc" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-red-200", children: "Tolak" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-center bg-red-200", children: "Open" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.drop_hari_ini
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.drop_jadi
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.gagal
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.open1
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.pengajuan
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.acc
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.tolak
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                FormatNumbering,
                {
                  className: "text-center",
                  value: transaksiHariIni.open2
                }
              ) })
            ] }) })
          ] })
        ] }),
        transaksiOpenHariIni.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-semibold underline", children: "Proses Terlebih Dahulu Transaksi Dibawah Ini" }),
          /* @__PURE__ */ jsxs("div", { className: "flex p-1.5 bg-gray-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: "Nasabah" }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: "Status" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: transaksiOpenHariIni.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex p-1.5 even:bg-gray-100", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: item.nama }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: item.status })
          ] }, index)) })
        ] }),
        transaksiOpenMingguDepan.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-semibold underline", children: "Proses Terlebih Dahulu Pengajuan Dibawah Ini" }),
          /* @__PURE__ */ jsxs("div", { className: "flex p-1.5 bg-gray-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: "Nasabah" }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: "Status" }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: "Tgl Drop" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: transaksiOpenMingguDepan.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex p-1.5 even:bg-gray-100", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: item.nama }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: item.status }),
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: dayjs(item.tanggal_drop).format("DD-MM-YYYY") })
          ] }, index)) })
        ] }),
        transaksiOpenHariIni.length == 0 && transaksiOpenMingguDepan.length == 0 && /* @__PURE__ */ jsxs("form", { onSubmit: onSubmitForm, children: [
          /* @__PURE__ */ jsxs("div", { className: "max-h-[60vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: [
            !(triggeredData == null ? void 0 : triggeredData.target) && /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "target", children: "Target" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "target",
                  readOnly: data.status_dayly_approval,
                  allowDecimals: false,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: data.target,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("p", { className: "mb-1 italic font-thin text-gray-500", children: "Sebelum Ceklist, Diharapkan Semua Storting, Rencana, target dan drop sudah sesuai, tidak diperbolehkan ada transaksi yang masih Open" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "masuk", children: "Masuk" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "masuk",
                  readOnly: data.status_dayly_approval,
                  allowDecimals: false,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: data.masuk,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "keluar", children: "Keluar" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "keluar",
                  readOnly: data.status_dayly_approval,
                  allowDecimals: false,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: data.keluar,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-3 font-semibold underline", children: "Transaksi Minggu Depan" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "tanggal_minggu_depan", children: "Tanggal Rencana Drop Minggu Depan" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  name: "tanggal_rencana_minggu_depan",
                  readOnly: tanggalRencanaMingguDepan,
                  min: dayjs(data.date).add("1", "week").format("YYYY-MM-DD"),
                  required: true,
                  onChange: onInputChange,
                  type: "date",
                  value: data.tanggal_rencana_minggu_depan,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              ),
              data.tanggal_rencana_minggu_depan == null && /* @__PURE__ */ jsx("small", { className: "text-red-500 ", children: "Tidak Ada Pengajuan Untuk Minggu Depan, Isikan Tanggal Secara Manual" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "rencana_minggu_depan", children: "Rencana Drop Minggu Depan" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "rencana_minggu_depan",
                  allowDecimals: false,
                  readOnly: data.status_dayly_approval,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: data.rencana_minggu_depan,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "target_minggu_depan", children: "Target Minggu Depan" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "target_minggu_depan",
                  allowDecimals: false,
                  readOnly: data.status_dayly_approval,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: parseInt(data.target) + (parseInt(data.masuk) - parseInt(data.keluar)),
                  placeholder: "Inputkan angka tanpa sparator"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start flex-1 gap-3 mb-1 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  readOnly: data.status_dayly_approval,
                  placeholder: "Select Permission",
                  id: "daily_kepala_approval",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "daily_kepala_approval", children: "Konfirmasi Jika Sudah Benar Semua" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-right", children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" }) })
        ] })
      ] })
    ] })
  ] });
};
export {
  Approval as default
};
