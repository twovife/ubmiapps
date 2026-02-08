import { jsx, jsxs } from "react/jsx-runtime";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { B as Button } from "./button-StO46bLt.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const PengajuanLama = ({ isActive, triggeredId, triggeredPinjaman }) => {
  const { data, setData, errors, post, processing, reset } = useForm({
    request_date: dayjs().format("YYYY-MM-DD"),
    tanggal_drop: "",
    request_nominal: 0,
    type: "pengajuan"
    //type have pengajuan,baru,TD
  });
  const [isActiveTarget, setIsActiveTarget] = useState();
  const [mixDate, setMixDate] = useState();
  useEffect(() => {
    setMixDate(data.request_date);
    setData((prevData) => ({
      ...prevData,
      tanggal_drop: dayjs(data.request_date).add(1, "week").format("YYYY-MM-DD")
    }));
  }, [data.request_date]);
  const isTargetActive = (params) => {
    if (params) {
      setIsActiveTarget(true);
    } else {
      setIsActiveTarget(false);
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  const onHandleCurencyChange = (value, name, float) => {
    setData(name, value);
  };
  const buttonValueClick = (e) => {
    const value = e.target.getAttribute("data-value");
    setData("request_nominal", value);
  };
  const getDataAxios = async () => {
    try {
      const response = await axios.get(
        route("pinjaman.checkpengajuan", triggeredId)
      );
      isTargetActive(response.data.data.loan_out_status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive && triggeredId) {
      getDataAxios();
    }
  }, [isActive, triggeredId]);
  const submitForm = (e) => {
    e.preventDefault();
    post(route("pinjaman.store_pengajuan_lama", triggeredId), {
      onSuccess: () => {
        reset();
        getDataAxios();
      }
      // preserveState: true,
    });
  };
  return /* @__PURE__ */ jsx("div", { children: isActiveTarget ? /* @__PURE__ */ jsx("div", { children: "Ada Pengajuan" }) : /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
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
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap w-full gap-2 mb-3", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "400000",
          children: "400rb"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "500000",
          children: "500rb"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "700000",
          children: "700rb"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "800000",
          children: "800rb"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "1000000",
          children: "1 Jt"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "1500000",
          children: "1,5 Jt"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          size: "xs",
          onClick: buttonValueClick,
          "data-value": "0",
          children: "reset"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", onClick: submitForm, disabled: processing, children: "Submit" }) })
  ] }) });
};
export {
  PengajuanLama as default
};
