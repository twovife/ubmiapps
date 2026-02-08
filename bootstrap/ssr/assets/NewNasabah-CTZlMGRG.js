import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { B as Button } from "./button-StO46bLt.js";
import "./card-DK9akThy.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DpwcYzou.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { usePage, useForm } from "@inertiajs/react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CurrencyInput from "react-currency-input-field";
import { u as useOptionGenerator, S as SelectList } from "./SelectComponent-C78kOz17.js";
import RiwayatPengajuan from "./RiwayatPengajuan-C1LEAz5f.js";
import dayjs from "dayjs";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import { N as NoEditOverlay } from "./NoEditOverlay-GIB1h_zq.js";
import "./table-DgsbovDN.js";
import "./badge-BDQK5pqs.js";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tabs";
import "@radix-ui/react-label";
import "@tanstack/react-table";
import "./BadgeStatus-BDnUSm56.js";
import "react-number-format";
const NewNasabah = ({
  onClosed,
  generateAngsuran = false,
  submitUrl,
  typeInput = "number"
}) => {
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
    request_date: "",
    tanggal_drop: "",
    no_kk: "",
    nama: "",
    alamat: "",
    kelompok: "",
    request_nominal: 0,
    angsuran: []
  });
  const [elements, setElements] = useState([]);
  const [calculatePinjaman, setCalculatePinjaman] = useState(0);
  useEffect(() => {
    const totalPinjaman = parseInt(data.request_nominal ?? 0) * 1.3;
    const totalAngsuran = data.angsuran.reduce((acc, curr) => {
      const nominal = parseInt(curr.nominal, 10);
      return acc + (isNaN(nominal) ? 0 : nominal);
    }, 0);
    setCalculatePinjaman(totalPinjaman - totalAngsuran);
  }, [data.angsuran, data.request_nominal]);
  useEffect(() => {
    setElements([]);
  }, [data.tanggal_drop]);
  useEffect(() => {
    setData("angsuran", elements);
  }, [elements]);
  const addElement = () => {
    const lastTransactionDate = elements.length > 0 ? dayjs(elements[elements.length - 1].transaction_date).add(1, "week").format("YYYY-MM-DD") : data.tanggal_drop ? dayjs(data.tanggal_drop).add(1, "week").format("YYYY-MM-DD") : "";
    setElements([
      ...elements,
      { id: Date.now(), transaction_date: lastTransactionDate }
    ]);
  };
  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };
  const onInputElementChange = (id, name, value) => {
    setElements(
      elements.map(
        (element) => element.id === id ? { ...element, [name]: value } : element
      )
    );
  };
  const onHandleElementCurencyChange = (value, name, id) => {
    setElements(
      elements.map(
        (element) => element.id === id ? { ...element, [name]: value } : element
      )
    );
  };
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [mixDate, setMixDate] = useState();
  useEffect(() => {
    setMixDate(data.request_date);
    setData((prevData) => ({
      ...prevData,
      tanggal_drop: dayjs(data.request_date).add(1, "week").format("YYYY-MM-DD")
    }));
  }, [data.request_date]);
  const onHandleCurencyChange = (value, name, float) => {
    setData(name, value);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  const onNikChange = (e) => {
    const { name, value } = e.target;
    setCustomerData([]);
    setNik(value);
  };
  const controllerRef = useRef(null);
  const onNikSubmit = async (e) => {
    var _a, _b;
    e.preventDefault();
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    reset();
    setLoading(true);
    setErorAxios();
    try {
      const { data: data2 } = await axios.post(
        route("transaction.nasabah_buku_transaksi"),
        { nik },
        { signal: controller.signal }
      );
      setLoading(false);
      setData((prevData) => ({
        ...prevData,
        nik: data2.return_nik,
        isActiveMember: !!data2.data
      }));
      if (data2.data) {
        console.log(data2.data);
        setCustomerData(data2.data);
      } else {
        setCustomerData([]);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request dibatalkan karena ada fetch baru.");
      } else {
        setErorAxios(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Terjadi kesalahan.");
        setLoading(false);
      }
    }
  };
  const modalIsClosed = (e) => {
    onClosed();
    reset();
  };
  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(submitUrl, {
      onSuccess: () => {
        modalIsClosed();
      },
      replace: true
    });
  };
  const buttonValue = [
    { value: 3e5, label: "300rb" },
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-3 lg:flex-row", children: [
    /* @__PURE__ */ jsx(Loading, { show: loading || processing }),
    /* @__PURE__ */ jsxs("div", { className: "w-auto", children: [
      /* @__PURE__ */ jsxs("fieldset", { className: "min-w-[20vw] p-4 mb-3 border rounded-lg", children: [
        /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "CEK NIK NASABAH" }),
        /* @__PURE__ */ jsxs("form", { className: "w-full mb-3", onSubmit: onNikSubmit, children: [
          /* @__PURE__ */ jsx(Label, { optional: true, children: "NIK" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                type: typeInput,
                name: "nik",
                value: nik,
                onChange: onNikChange,
                placeholder: "Cek NIK"
              }
            ),
            /* @__PURE__ */ jsxs(Button, { className: "text-xs", size: "sm", children: [
              /* @__PURE__ */ jsx(Search, { className: "w-auto h-4 mr-1" }),
              "Cari"
            ] })
          ] }),
          erorAxios && /* @__PURE__ */ jsx(InputError, { message: erorAxios, className: "mt-1" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `font-semibold mt-1 ${nik.length == 16 ? "text-green-500" : "text-red-500"}`,
              children: [
                nik.length,
                " Digit"
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { children: newGenerate && /* @__PURE__ */ jsx("a", { href: newGenerate ?? "#", target: "_blank", children: "Lihat Transaksi Terakhir" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: nik && data.nik == nik && /* @__PURE__ */ jsxs("fieldset", { className: "w-full p-4 border rounded-lg", children: [
        !isCreator && /* @__PURE__ */ jsx(NoEditOverlay, { value: "User Tidak Dapat Digunakan Untuk Menambah Pinjaman" }),
        /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "Detail Pinjaman" }),
        /* @__PURE__ */ jsxs("form", { className: "w-full mb-3", onSubmit: onSubmitCreate, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 lg:flex-row", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                  /* @__PURE__ */ jsx(Label, { children: "Tanggal Pengajuan" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "date",
                      name: "request_date",
                      required: true,
                      value: data.request_date,
                      onChange: onInputChange
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.request_date })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
                  /* @__PURE__ */ jsx(Label, { children: "Tanggal Drop" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "date",
                      name: "tanggal_drop",
                      min: mixDate,
                      required: true,
                      value: data.tanggal_drop,
                      onChange: onInputChange
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.tanggal_drop })
                ] })
              ] }),
              data.request_date && data.request_date == data.tanggal_drop ? /* @__PURE__ */ jsx("div", { className: "w-full mb-3 font-semibold text-red-500", children: "DROP BARU" }) : /* @__PURE__ */ jsx("div", { className: "w-full mb-3 font-semibold text-red-500", children: "PENGAJUAN DROP" }),
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
            ] }),
            elements.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              elements.map((element, key) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex flex-col gap-3 mb-3 lg:flex-row",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Tanggal Storting" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "date",
                          name: "transaction_date",
                          min: dayjs(data.tanggal_drop).add(1, "week").format("YYYY-MM-DD"),
                          required: true,
                          value: element.transaction_date,
                          onChange: (e) => onInputElementChange(
                            element.id,
                            e.target.name,
                            e.target.value
                          )
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
                            required: true,
                            onValueChange: (value, name) => onHandleElementCurencyChange(
                              parseInt(value),
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
                        ] }),
                        /* @__PURE__ */ jsx(
                          Button,
                          {
                            onClick: () => removeElement(element.id),
                            type: "button",
                            size: "iconsm",
                            variant: "outline",
                            children: /* @__PURE__ */ jsx(X, { className: "w-auto h-3" })
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                element.id
              )),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 font-semibold text-red-500", children: [
                /* @__PURE__ */ jsx("div", { children: "Saldo Tersisa" }),
                /* @__PURE__ */ jsx(FormatNumbering, { value: calculatePinjaman })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
            generateAngsuran && data.tanggal_drop && /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: addElement,
                className: "mr-3",
                variant: "outline",
                children: "Add Angsuran"
              }
            ),
            /* @__PURE__ */ jsx(Button, { children: "Submit" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-auto lg:w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xl mb-3 font-semibold", children: "CRASH" }),
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
    ] })
  ] });
};
export {
  NewNasabah as default
};
