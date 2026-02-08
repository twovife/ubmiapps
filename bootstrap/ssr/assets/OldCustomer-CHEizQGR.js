import { jsxs, jsx } from "react/jsx-runtime";
import { C as Checkbox } from "./Checkbox-DLnjqb3e.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import { P as PrimaryButton } from "./PrimaryButton-BHWercwM.js";
import { S as SelectList } from "./SelectList-DrCNDu1u.js";
import { T as TextInput } from "./TextInput-GCtCMl-T.js";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
const OldCustomer = ({
  status,
  setLoading,
  max_date,
  min_date,
  emps,
  customer_id,
  nik,
  url = route("transaction.store")
}) => {
  const { data, setData, post, processing, errors } = useForm({
    tanggal_drop: "",
    customer_id,
    nik,
    mantri: "",
    pinjaman: "",
    type_create: "2",
    danatitipan_1: false,
    tanggal_angsuran_1: "",
    status_angsuran_: ""
  });
  const [inputColumns, setInputColumns] = useState([{ id: 1 }]);
  const addInputColumn = () => {
    const newId = inputColumns[inputColumns.length - 1].id + 1;
    setInputColumns([...inputColumns, { id: newId }]);
    setData({
      ...data,
      [`tanggal_angsuran_${newId}`]: dayjs(data.tanggal_drop).add(newId, "week").format("YYYY-MM-DD")
    });
  };
  const removeInputColumn = (id) => {
    const filteredColumns = inputColumns.filter(
      (column) => column.id !== id
    );
    setInputColumns(filteredColumns);
    const updatedData = { ...data };
    delete updatedData[`tanggal_angsuran_${id}`];
    delete updatedData[`angsuran_${id}`];
    setData(updatedData);
  };
  const onTanggalDropChange = (e) => {
    const { name, value } = e.target;
    const manipulateData = { ...data };
    Object.keys(manipulateData).forEach((element) => {
      if (element.includes("angsuran") || element.includes("danatitipan")) {
        delete manipulateData[element];
      }
    });
    setInputColumns([{ id: 1 }, { id: 2 }, { id: 3 }]);
    const newData = {
      ...manipulateData,
      [name]: value,
      tanggal_angsuran_1: dayjs(value).add(1, "week").format("YYYY-MM-DD"),
      tanggal_angsuran_2: dayjs(value).add(2, "week").format("YYYY-MM-DD"),
      tanggal_angsuran_3: dayjs(value).add(3, "week").format("YYYY-MM-DD")
    };
    setData(newData);
  };
  const handleOnChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };
  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(url);
    setLoading(processing);
  };
  return /* @__PURE__ */ jsxs("form", { className: "flex-1", onSubmit: onSubmitCreate, children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "Permintaan Pinjaman Baru (Nasabah Lama)" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "tanggal_drop", value: "Tanggal Drop" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "tanggal_drop",
            type: "date",
            name: "tanggal_drop",
            min: min_date,
            value: data.tanggal_drop,
            className: "mt-1 block w-full",
            onChange: onTanggalDropChange
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.tanggal_drop,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 mb-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nik", value: "NIK Customer" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nik",
              type: "text",
              name: "nik",
              value: data.nik,
              className: "mt-1 block w-full",
              readOnly: true,
              onChange: handleOnChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nik, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "mantri", value: "Mantri" }),
          /* @__PURE__ */ jsx(
            SelectList,
            {
              id: "mantri",
              type: "text",
              name: "mantri",
              options: emps,
              nullValue: true,
              value: data.mantri,
              className: "mt-1 block w-full",
              onChange: handleOnChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.mantri, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "pinjaman",
            value: "Nominal Pinjaman",
            className: "mb-1"
          }
        ),
        /* @__PURE__ */ jsx(
          CurrencyInput,
          {
            name: "pinjaman",
            id: "pinjaman",
            className: `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10 block w-full text-sm mt-2`,
            allowDecimals: false,
            prefix: "Rp. ",
            min: 1,
            required: true,
            onValueChange: onHandleCurencyChange,
            value: data.pinjaman,
            placeholder: "Inputkan angka tanpa sparator"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.pinjaman, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 mb-3 font-semibold underline", children: "Input Angsuran" }),
      inputColumns.map((column, index) => /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 mb-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: `tanggal_angsuran_${column.id}`,
              value: "Tanggal Angsuran"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: `tanggal_angsuran_${column.id}`,
              type: "date",
              name: `tanggal_angsuran_${column.id}`,
              value: data[`tanggal_angsuran_${column.id}`],
              className: "mt-1 block w-full",
              onChange: handleOnChange
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors[`tanggal_angsuran_${column.id}`],
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-[1.5]", children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: `angsuran_${column.id}`,
              value: "Nominal Angsuran",
              className: "mb-1"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center items-center", children: [
            /* @__PURE__ */ jsx(
              CurrencyInput,
              {
                name: `angsuran_${column.id}`,
                id: `angsuran_${column.id}`,
                className: `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10 block w-full`,
                allowDecimals: false,
                prefix: "Rp. ",
                min: 1,
                required: true,
                onValueChange: onHandleCurencyChange,
                value: data[`angsuran_${column.id}`],
                placeholder: "Inputkan angka tanpa sparator"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "block", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  name: `danatitipan_${column.id}`,
                  value: data[`danatitipan_${column.id}`],
                  onChange: handleOnChange
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-gray-600", children: "titipan" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: index >= 0 && /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                color: "red",
                type: "button",
                className: "block",
                onClick: () => removeInputColumn(column.id),
                children: "X"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors[`angsuran_${index}`],
              className: "mt-2"
            }
          )
        ] })
      ] }, column.id)),
      /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          type: "button",
          onClick: addInputColumn,
          title: "Add"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          type: "submit",
          title: "Submit",
          color: "green"
        }
      ) })
    ] })
  ] });
};
export {
  OldCustomer as default
};
