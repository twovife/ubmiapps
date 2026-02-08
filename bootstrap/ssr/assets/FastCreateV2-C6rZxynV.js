import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import dayjs from "dayjs";
import { B as Button } from "./button-StO46bLt.js";
import { Search } from "lucide-react";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { usePage, useForm } from "@inertiajs/react";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DpwcYzou.js";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import { u as useOptionGenerator, S as SelectList } from "./SelectComponent-C78kOz17.js";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { c as cn } from "./utils-H80jjgLf.js";
import RiwayatPengajuan from "./RiwayatPengajuan-C1LEAz5f.js";
import { L as LinkButton } from "./LinkButton-Cyzm0_CJ.js";
import "./Dropdown-tAzvTn5J.js";
import "react-icons/bi";
import "hamburger-react";
import "./dropdown-menu-BEELUTJf.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-icons";
import "./SweetAlert-CPwvZdfJ.js";
import "sweetalert2";
import "sweetalert2-react-content";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-label";
import "@radix-ui/react-tabs";
import "clsx";
import "tailwind-merge";
import "./table-DgsbovDN.js";
import "@tanstack/react-table";
import "./BadgeStatus-BDnUSm56.js";
import "./badge-BDQK5pqs.js";
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
const FastCreateV2 = () => {
  const initialMonth = localStorage.getItem("currentMonth") || dayjs().format("YYYY-MM");
  const initialKelompok = localStorage.getItem("currentKelompok") || 1;
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentKelompok, setCurrentKelompok] = useState(initialKelompok);
  useEffect(() => {
    localStorage.setItem("currentMonth", currentMonth);
    localStorage.setItem("currentKelompok", currentKelompok);
  }, [currentMonth, currentKelompok]);
  const { printUrl } = usePage().props;
  const { isUnit, isMantri, isCanShowKelompok, isCreator } = useFrontEndPermission();
  const [newGenerate, setNewGenerate] = useState(null);
  useEffect(() => {
    setNewGenerate(printUrl.url);
  }, [printUrl.timestamp]);
  const { optKelompok } = useOptionGenerator();
  const { data, setData, post, errors, processing, reset } = useForm({
    isActiveMember: false,
    nik: "",
    tanggal_drop: "",
    no_kk: "",
    nama: "",
    alamat: "",
    kelompok: currentKelompok || "",
    request_nominal: 0,
    angsuran: []
  });
  const [calculatePinjaman, setCalculatePinjaman] = useState(0);
  useEffect(() => {
    const totalPinjaman = parseInt(data.request_nominal ?? 0) * 1.3;
    const totalAngsuran = data.angsuran.reduce((acc, curr) => {
      const nominal = parseInt(curr.nominal, 10);
      return acc + (isNaN(nominal) ? 0 : nominal);
    }, 0);
    setCalculatePinjaman(totalPinjaman - totalAngsuran);
  }, [data.angsuran, data.request_nominal]);
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [angsuran, setAngsuran] = useState([]);
  const [isSaldoAkhir, setIsSaldoAkhir] = useState(false);
  const generateAngsuranField = (value) => {
    const tanggalDrop = dayjs(value);
    const awalDrop = tanggalDrop.add(1, "week").format("YYYY-MM-DD");
    const endDate = dayjs().format("YYYY-MM-DD");
    let date = dayjs(currentMonth);
    const isExistSaldoAkhir = awalDrop < date.startOf("month").format("YYYY-MM-DD");
    setIsSaldoAkhir(isExistSaldoAkhir);
    let tempDates = /* @__PURE__ */ new Set();
    if (isExistSaldoAkhir) {
      tempDates.add({
        id: 1,
        transaction_date: awalDrop,
        nominal: 0
      });
    }
    while (date.isBefore(endDate)) {
      const formattedDate = date.format("YYYY-MM-DD");
      if (date.day() === tanggalDrop.day() && date.isAfter(tanggalDrop)) {
        tempDates.add({
          id: date.unix(),
          transaction_date: formattedDate,
          nominal: 0
        });
      }
      date = date.add(1, "day");
    }
    let uniqueDates = [...tempDates];
    setAngsuran(uniqueDates);
  };
  const onHandleCurencyChange = (value, name, prams) => {
    setData(name, value);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
    if (name == "kelompok") {
      setCurrentKelompok(value);
    }
    if (name == "tanggal_drop") {
      generateAngsuranField(value);
    }
  };
  useEffect(() => {
    setData("angsuran", angsuran);
  }, [angsuran]);
  const onNikChange = (e) => {
    const { name, value } = e.target;
    setCustomerData([]);
    reset();
    setData("kelompok", currentKelompok);
    setAngsuran([]);
    setIsSaldoAkhir(false);
    setNik(value);
  };
  const onInputElementChange = (id, name, value) => {
    setAngsuran(
      angsuran.map(
        (element) => element.id === id ? { ...element, [name]: value } : element
      )
    );
  };
  const onHandleElementCurencyChange = (value, name, id) => {
    setAngsuran(
      angsuran.map(
        (element) => element.id === id ? { ...element, [name]: value } : element
      )
    );
  };
  const controllerRef = useRef();
  const onNikSubmit = async (e) => {
    var _a, _b, _c;
    e.preventDefault();
    (_a = controllerRef.current) == null ? void 0 : _a.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    reset();
    setData("kelompok", currentKelompok);
    setAngsuran([]);
    setIsSaldoAkhir(false);
    setLoading(true);
    setErorAxios();
    try {
      const { data: data2 } = await axios.post(
        route("transaction.nasabah_buku_transaksi"),
        { nik },
        { signal: controller.signal }
      );
      setLoading(false);
      setData((prev) => ({
        ...prev,
        nik: data2.return_nik,
        isActiveMember: !!data2.data
      }));
      setCustomerData(data2.data ?? []);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request dibatalkan (race condition prevented)");
      } else {
        setErorAxios(((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Terjadi kesalahan");
        setLoading(false);
      }
    }
  };
  const buttonValue = [
    { value: 4e5, label: "400rb" },
    { value: 5e5, label: "500rb" },
    { value: 7e5, label: "700rb" },
    { value: 8e5, label: "800rb" },
    { value: 1e6, label: "1 jt" },
    { value: 13e5, label: "1,3 jt" },
    { value: 15e5, label: "1,5 jt" },
    { value: 2e6, label: "2 jt" }
  ];
  const buttonValueClick = (e) => {
    const value = e.target.getAttribute("data-value");
    setData("request_nominal", value);
  };
  const onSaldoAkhirChange = (value) => {
    const angsuran2 = (data == null ? void 0 : data.request_nominal) * 1.3 - value;
    setAngsuran(
      (prevAngs) => prevAngs.some((item) => item.id === 1) ? prevAngs.map(
        (item) => item.id === 1 ? { ...item, nominal: angsuran2 } : item
      ) : [
        {
          id: 1,
          transaction_date: dayjs(data.tanggal_drop).add(1, "week").format("YYYY-MM-DD")
        },
        ...prevAngs
      ]
    );
  };
  const modalIsClosed = (e) => {
    reset();
    setData("kelompok", currentKelompok);
  };
  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(route("transaction.store_buku_transaksi_batch"), {
      onSuccess: () => {
        modalIsClosed();
      },
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx("div", { className: "absolute z-20 right-2 bottom-2", children: /* @__PURE__ */ jsx(
      LinkButton,
      {
        color: "outline",
        href: route("transaction.fastcreate"),
        variant: "ghost",
        children: "V1"
      }
    ) }),
    /* @__PURE__ */ jsx(Loading, { show: loading }),
    /* @__PURE__ */ jsxs("div", { className: "w-full gap-3 lg:flex", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `w-auto min-w-[20vw] ${data.request_nominal > 0 ? "lg:w-1/2" : "lg:w-auto"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Tanggal Awal", className: "mb-1" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "month",
                  value: currentMonth,
                  max: dayjs().format("YYYY-MM"),
                  onChange: (e) => setCurrentMonth(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("form", { className: "mb-1", onSubmit: onNikSubmit, children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "NIK", className: "mb-1" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(Input, { type: "text", onChange: onNikChange }),
                /* @__PURE__ */ jsx(Button, { variant: "destructiveoutline", children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" }) })
              ] })
            ] }),
            erorAxios && /* @__PURE__ */ jsx(InputError, { message: erorAxios, className: "mt-1" }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `font-semibold mb-3 ${nik.length == 16 ? "text-green-500" : "text-red-500"}`,
                children: [
                  nik.length,
                  " Digit"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("form", { className: "relative", onSubmit: onSubmitCreate, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-3 lg:flex-row", children: [
                nik && data.nik == nik && /* @__PURE__ */ jsxs("fieldset", { className: "flex-1 p-4 border rounded-lg", children: [
                  /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "Detail Pinjaman" }),
                  /* @__PURE__ */ jsx("div", { className: "w-full mb-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-5 lg:flex-row", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Tanggal Drop" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "date",
                          name: "tanggal_drop",
                          required: true,
                          value: data.tanggal_drop,
                          onChange: onInputChange
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.tanggal_drop }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1 font-semibold text-green-500", children: dayjs(data.tanggal_drop).format("dddd") })
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { optional: true, children: "NIK" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "text",
                          name: "nik",
                          value: data.nik,
                          disabled: true,
                          onChange: onInputChange
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.nik })
                    ] }),
                    !data.isActiveMember ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                        /* @__PURE__ */ jsx(Label, { optional: true, children: "NO KK" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "text",
                            name: "no_kk",
                            value: data.no_kk,
                            onChange: onInputChange
                          }
                        ),
                        /* @__PURE__ */ jsx(InputError, { message: errors.no_kk })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                        /* @__PURE__ */ jsx(Label, { children: "Nama" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "text",
                            name: "nama",
                            value: data.nama,
                            onChange: onInputChange,
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx(InputError, { message: errors.nama })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                        /* @__PURE__ */ jsx(Label, { children: "Alamat" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "text",
                            name: "alamat",
                            value: data.alamat,
                            onChange: onInputChange,
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx(InputError, { message: errors.alamat })
                      ] })
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                        /* @__PURE__ */ jsx(Label, { children: "Nama" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "text",
                            disabled: true,
                            value: customerData.nama ?? ""
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                        /* @__PURE__ */ jsx(Label, { children: "Alamat" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "text",
                            disabled: true,
                            value: customerData.alamat ?? ""
                          }
                        )
                      ] })
                    ] }),
                    isCanShowKelompok && /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Kelompok" }),
                      /* @__PURE__ */ jsx(
                        SelectList,
                        {
                          value: data.kelompok,
                          options: optKelompok,
                          name: "kelompok",
                          nullvalue: true,
                          onChange: onInputChange
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.kelompok })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Nominal Pinjaman" }),
                      /* @__PURE__ */ jsx(
                        CurrencyInput,
                        {
                          className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          name: "request_nominal",
                          defaultValue: 0,
                          allowDecimals: false,
                          prefix: "Rp. ",
                          min: 1,
                          required: true,
                          onValueChange: onHandleCurencyChange,
                          value: data.request_nominal,
                          placeholder: "Inputkan angka tanpa sparator"
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.request_nominal })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 mb-3 gap-x-2 gap-y-1", children: buttonValue.map((button, key) => /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        size: "xs",
                        "data-value": button.value,
                        onClick: buttonValueClick,
                        children: button.label
                      },
                      key
                    )) })
                  ] }) }) })
                ] }),
                data.request_nominal > 0 && /* @__PURE__ */ jsxs("fieldset", { className: "flex-1 p-4 border rounded-lg", children: [
                  /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "Detail Angsuran" }),
                  dayjs(data.tanggal_drop) && isSaldoAkhir && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsxs(Label, { children: [
                      "Saldo Akhir",
                      " ",
                      dayjs(currentMonth).subtract(1, "month").format("MMMM")
                    ] }),
                    /* @__PURE__ */ jsx(
                      CurrencyInput,
                      {
                        className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        name: "nominal",
                        defaultValue: data.request_nominal * 1.3,
                        allowDecimals: false,
                        prefix: "Rp. ",
                        min: 1,
                        max: calculatePinjaman,
                        required: true,
                        onValueChange: (value, name) => onSaldoAkhirChange(value),
                        placeholder: "Inputkan angka tanpa sparator"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsx(Separator, { className: "my-3" }),
                  dayjs(data.tanggal_drop) && angsuran.length > 0 && angsuran.map((element, key) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "flex flex-col gap-3 mb-3 lg:flex-row ",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                            /* @__PURE__ */ jsx(Label, { children: "Tanggal Storting" }),
                            /* @__PURE__ */ jsx(
                              Input,
                              {
                                type: "date",
                                readOnly: true,
                                name: "transaction_date",
                                required: true,
                                value: element.transaction_date
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                            /* @__PURE__ */ jsx(Label, { children: "Nominal" }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-3", children: [
                              /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-32", children: /* @__PURE__ */ jsx(
                                CurrencyInput,
                                {
                                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                  name: "nominal",
                                  defaultValue: 0,
                                  allowDecimals: false,
                                  prefix: "Rp. ",
                                  min: 1,
                                  max: calculatePinjaman,
                                  required: true,
                                  readOnly: isSaldoAkhir && key == 0,
                                  onValueChange: (value, name) => onHandleElementCurencyChange(
                                    value,
                                    name,
                                    element.id
                                  ),
                                  value: element.nominal,
                                  placeholder: "Inputkan angka tanpa sparator"
                                }
                              ) }),
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-1", children: [
                                /* @__PURE__ */ jsx(
                                  Checkbox,
                                  {
                                    name: "dana_titipan",
                                    id: `dana_titipan_${element.id}`,
                                    checked: element.isActiveMember,
                                    onChange: (e) => onInputElementChange(
                                      element.id,
                                      e.target.name,
                                      e.target.checked
                                    )
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  Label,
                                  {
                                    htmlFor: `dana_titipan_${element.id}`,
                                    className: "whitespace-nowrap",
                                    nomb: true,
                                    children: "Dana Titipan"
                                  }
                                )
                              ] })
                            ] })
                          ] })
                        ]
                      },
                      element.id
                    ),
                    /* @__PURE__ */ jsx(Separator, { className: "my-3 bg-red-500" })
                  ] })),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(Label, { className: "mb-1", children: "Sisa Saldo" }),
                    /* @__PURE__ */ jsx(
                      CurrencyInput,
                      {
                        className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        name: "request_nominal",
                        defaultValue: 0,
                        allowDecimals: false,
                        prefix: "Rp. ",
                        min: 1,
                        value: calculatePinjaman,
                        disabled: true,
                        placeholder: "Inputkan angka tanpa sparator"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("div", { children: newGenerate && /* @__PURE__ */ jsx("a", { href: newGenerate ?? "#", target: "_blank", children: "Lihat Transaksi Terakhir" }) }),
                /* @__PURE__ */ jsx("div", { children: data.request_nominal > 0 && /* @__PURE__ */ jsx(Button, { children: "Submit" }) })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `w-auto  ${data.request_nominal > 0 ? "lg:w-1/2" : "lg:w-full"}`,
          children: [
            /* @__PURE__ */ jsx("div", { children: "Crash" }),
            /* @__PURE__ */ jsxs(Tabs, { defaultValue: "pengajuan", className: "w-auto", children: [
              /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
                /* @__PURE__ */ jsx(TabsTrigger, { value: "pengajuan", children: "Kantor" }),
                /* @__PURE__ */ jsx(TabsTrigger, { value: "pinjaman", children: "Kantor Lain (NT)" }),
                /* @__PURE__ */ jsx(TabsTrigger, { value: "pinjaman2", children: "Kantor Lain (T)" })
              ] }),
              /* @__PURE__ */ jsx(TabsContent, { value: "pengajuan", children: /* @__PURE__ */ jsx("div", { className: "overflow-auto shadow-sm scrollbar-thin h-max", children: /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData == null ? void 0 : customerData.history_branch }) }) }),
              /* @__PURE__ */ jsx(TabsContent, { value: "pinjaman", children: /* @__PURE__ */ jsx("div", { className: "overflow-auto shadow-sm scrollbar-thin h-max", children: /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData == null ? void 0 : customerData.history_macet_lain }) }) }),
              /* @__PURE__ */ jsx(TabsContent, { value: "pinjaman2", children: /* @__PURE__ */ jsx("div", { className: "overflow-auto shadow-sm scrollbar-thin h-max", children: /* @__PURE__ */ jsx(RiwayatPengajuan, { data: customerData == null ? void 0 : customerData.history_target }) }) })
            ] })
          ]
        }
      )
    ] })
  ] });
};
export {
  FastCreateV2 as default
};
