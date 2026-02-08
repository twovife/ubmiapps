import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-5zuHJd4f.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import dayjs from "dayjs";
import { b as buttonVariants, B as Button } from "./button-StO46bLt.js";
import { CalendarIcon, Search } from "lucide-react";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { usePage, useForm } from "@inertiajs/react";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { u as useFrontEndPermission } from "./useFrontEndPermission-i32ufhQ2.js";
import { L as Label } from "./label-e-KMhPKP.js";
import "./tabs-DpwcYzou.js";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import { u as useOptionGenerator, S as SelectList } from "./SelectComponent-C78kOz17.js";
import "./table-DgsbovDN.js";
import "./badge-BDQK5pqs.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon, CaretSortIcon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-eMhT0muz.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { getYear, getMonth, setMonth, setYear } from "date-fns";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-label";
import "@radix-ui/react-tabs";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-popover";
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:hsas([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground/30 opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("size-4", className2), ...props2 })
      },
      ...props
    }
  );
}
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const DatePicker = ({
  startYear = 2015,
  endYear = getYear(/* @__PURE__ */ new Date()),
  values,
  onChange,
  name = "date",
  minDate
}) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(values || minDate);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  const year = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear
  );
  const handleChangeMonth = (month) => {
    const newDate = setMonth(displayDate, months.indexOf(month));
    setDisplayDate(newDate);
  };
  const handleChangeYear = (year2) => {
    const newDate = setYear(displayDate, parseInt(year2));
    setDisplayDate(newDate);
  };
  const handleSelect = (date2) => {
    const minimalDate = new Date(minDate);
    if (date2 > minimalDate) {
      return false;
    }
    if (date2) {
      setDate(date2);
      onChange(name, dayjs(date2).format("YYYY-MM-DD"));
      setOpen(false);
    }
  };
  const isDisabled = (date2) => {
    const minimalDate = new Date(minDate);
    const today = dayjs().toDate();
    const todayDay = today.getDay();
    return date2 > minimalDate || date2.getDay() !== todayDay;
  };
  useEffect(() => {
    onChange(name, dayjs(date).format("YYYY-MM-DD"));
  }, []);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: cn(
          " justify-between text-left font-normal w-full",
          !date && "text-muted-foreground"
        ),
        children: [
          date ? dayjs(date).format("YYYY-MM-DD") : /* @__PURE__ */ jsx("span", { children: "Pick a date" }),
          /* @__PURE__ */ jsx(CalendarIcon, {})
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-auto p-0", align: "start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-3", children: [
        /* @__PURE__ */ jsxs(
          Select,
          {
            onValueChange: handleChangeMonth,
            value: months[getMonth(displayDate ?? minDate)],
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Month" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsx(SelectGroup, { children: months.map((item, index) => /* @__PURE__ */ jsx(SelectItem, { value: item, children: item }, index)) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Select,
          {
            onValueChange: handleChangeYear,
            value: getYear(displayDate || minDate).toString(),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Year" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsx(SelectGroup, { children: year.map((item, index) => /* @__PURE__ */ jsx(SelectItem, { value: item.toString(), children: item }, index)) }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          selected: date,
          onSelect: handleSelect,
          month: displayDate,
          disabled: isDisabled,
          onMonthChange: setDisplayDate,
          initialFocus: true
        }
      )
    ] })
  ] });
};
const InputMacet = ({ show, onClosed }) => {
  var _a;
  const { isUnit, isMantri, isCanShowKelompok, isCreator } = useFrontEndPermission();
  const { auth } = usePage().props;
  const initialKelompok = isCanShowKelompok ? localStorage.getItem("currentKelompok") || 1 : auth.user.employee.area;
  const [currentKelompok, setCurrentKelompok] = useState(initialKelompok);
  useEffect(() => {
    localStorage.setItem("currentKelompok", currentKelompok);
  }, [currentKelompok]);
  const { printUrl } = usePage().props;
  const { optKelompok } = useOptionGenerator();
  const fiveMonthsAgo = dayjs(
    ((_a = usePage().props.server_filter) == null ? void 0 : _a.onlineDate) ?? /* @__PURE__ */ new Date()
  ).format("YYYY-MM-DD");
  const { data, setData, post, errors, processing, reset } = useForm({
    isActiveMember: false,
    nik: "",
    tanggal_drop: "",
    no_kk: "",
    nama: "",
    alamat: "",
    kelompok: currentKelompok || "",
    request_nominal: 0,
    saldo_before: 0,
    angsuran: [
      {
        transaction_date: "",
        nominal: 0
      },
      { transaction_date: dayjs().format("YYYY-MM-DD"), nominal: 0 }
    ]
  });
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [sisaSaldo, setSisaSaldo] = useState(0);
  useEffect(() => {
    const pinjaman = parseInt(data.request_nominal) * 1.3 || 0;
    const angsuran1 = parseInt(data.angsuran[0].nominal) || 0;
    const angsuran2 = parseInt(data.angsuran[1].nominal) || 0;
    setSisaSaldo(pinjaman - angsuran1 - angsuran2);
  }, [data]);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
    if (name == "kelompok") {
      setCurrentKelompok(value);
    }
    if (name == "tanggal_drop") {
      const nominal = dayjs(value).add(1, "week").format("YYYY-MM-DD");
      setData((prevData) => ({
        ...prevData,
        angsuran: prevData.angsuran.map(
          (item, index) => index === 0 ? { ...item, transaction_date: nominal } : item
        )
      }));
    }
  };
  useEffect(() => {
    if (data.tanggal_drop) {
      const nominal = dayjs(data.tanggal_drop).add(1, "week").format("YYYY-MM-DD");
      setData((prevData) => ({
        ...prevData,
        angsuran: prevData.angsuran.map(
          (item, index) => index === 0 ? { ...item, transaction_date: nominal } : item
        )
      }));
    }
  }, [data.tanggal_drop]);
  const onHandlePinjaman = (value) => {
    const nominal = parseInt(value) || 0;
    parseInt(value) * 1.3 - parseInt(data.saldo_before) || 0;
    setData((prevData) => ({
      ...prevData,
      request_nominal: value,
      saldo_before: (nominal * 1.3).toString(),
      angsuran: prevData.angsuran.map(
        (item, index) => index === 0 ? { ...item, nominal: 0 } : item
      )
    }));
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
    const nominal = parseInt(value) || 0;
    parseInt(value) * 1.3 - parseInt(data.saldo_before) || 0;
    setData((prevData) => ({
      ...prevData,
      request_nominal: value,
      saldo_before: (nominal * 1.3).toString(),
      angsuran: prevData.angsuran.map(
        (item, index) => index === 0 ? { ...item, nominal: 0 } : item
      )
    }));
  };
  const handleAngsuranNominalChange = (value) => {
    setData((prev) => ({
      ...prev,
      angsuran: prev.angsuran.map(
        (item, index) => index === 1 ? { ...item, nominal: value } : item
      )
    }));
  };
  const onHandleCurencyChange = (value, name, prams) => {
    const valueint = parseInt(data == null ? void 0 : data.request_nominal) * 1.3 - parseInt(value) || 0;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      angsuran: prevData.angsuran.map((item, index) => {
        return index === 0 ? { ...item, nominal: valueint } : item;
      })
    }));
  };
  const onNikChange = (e) => {
    const { name, value } = e.target;
    setCustomerData([]);
    reset();
    setData("kelompok", currentKelompok);
    setNik(value);
  };
  const onNikSubmit = async (e) => {
    e.preventDefault();
    reset();
    setData("kelompok", currentKelompok);
    setLoading(true);
    setErorAxios();
    await axios({
      method: "post",
      url: route("transaction.nasabah_buku_transaksi"),
      data: {
        nik
      }
    }).then(function({ data: data2 }) {
      setLoading(false);
      setData((prevData) => ({
        ...prevData,
        nik: data2.return_nik,
        isActiveMember: data2.data ? true : false
      }));
      if (data2.data) {
        setCustomerData(data2.data);
      } else {
        setCustomerData([]);
      }
    }).catch(function({ response }) {
      setErorAxios(response.data.message);
      setLoading(false);
    });
  };
  const modalIsClosed = (e) => {
    reset();
    onClosed();
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
  return /* @__PURE__ */ jsx(Dialog, { open: show, onOpenChange: modalIsClosed, children: /* @__PURE__ */ jsxs(DialogContent, { className: `w-[95vw] p-2 lg:p-6`, children: [
    /* @__PURE__ */ jsx(DialogHeader, { className: "max-h-10", children: /* @__PURE__ */ jsx(DialogTitle, { className: "p-2", children: "INPUT MACET" }) }),
    /* @__PURE__ */ jsx(Loading, { show: loading || processing }),
    /* @__PURE__ */ jsx("div", { className: "h-[80vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin flex flex-col lg:flex-row gap-2", children: /* @__PURE__ */ jsxs("div", { className: `w-auto min-w-[20vw] lg:w-auto`, children: [
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
            " Digit",
            /* @__PURE__ */ jsxs("div", { className: "text-black", children: [
              "(KETIKKAN ",
              /* @__PURE__ */ jsx("span", { className: "bold text-red-500", children: "UB" }),
              " Jika NIK Sudah Tidak Ada)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-black", children: [
              "(Hanya Untuk Macet ",
              dayjs(fiveMonthsAgo).format("MMMM YYYY"),
              " ",
              "dan Sebelumnya, Serta Macet Yang Belum di Input Saja)"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("form", { className: "relative", onSubmit: onSubmitCreate, children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full gap-3 lg:flex-row", children: nik && data.nik == nik && /* @__PURE__ */ jsxs("fieldset", { className: "flex-1 p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "Detail Pinjaman" }),
          /* @__PURE__ */ jsx("div", { className: "w-full mb-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-5 lg:flex-row", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
              /* @__PURE__ */ jsx(Label, { children: "Tanggal Drop" }),
              /* @__PURE__ */ jsx(
                DatePicker,
                {
                  name: "tanggal_drop",
                  values: data.tanggal_drop,
                  onChange: setData,
                  minDate: fiveMonthsAgo
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
                  onValueChange: onHandlePinjaman,
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
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
              /* @__PURE__ */ jsx(Label, { children: "Sisa Saldo Awal Bulan" }),
              /* @__PURE__ */ jsx(
                CurrencyInput,
                {
                  className: "flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  name: "saldo_before",
                  defaultValue: 0,
                  allowDecimals: false,
                  prefix: "Rp. ",
                  min: 1,
                  required: true,
                  onValueChange: onHandleCurencyChange,
                  value: data.saldo_before,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.saldo_before })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full mb-3", children: [
              /* @__PURE__ */ jsxs(Label, { children: [
                "Angsuran Hari Ini / ",
                dayjs().format("DD-MM-YYYY")
              ] }),
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
                  onValueChange: handleAngsuranNominalChange,
                  value: data.angsuran.nominal,
                  placeholder: "Inputkan angka tanpa sparator"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.request_nominal })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "Sisa Saldo =",
              sisaSaldo.toLocaleString("id-ID"),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-500" })
            ] })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsx("div", { children: data.request_nominal ? sisaSaldo >= 0 && /* @__PURE__ */ jsx(Button, { children: "Submit" }) : "" }) })
      ] })
    ] }) })
  ] }) });
};
export {
  InputMacet as default
};
