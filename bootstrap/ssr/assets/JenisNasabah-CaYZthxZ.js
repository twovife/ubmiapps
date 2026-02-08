import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { P as PrimaryButton } from "./PrimaryButton-BHWercwM.js";
import { S as SelectList } from "./SelectList-DrCNDu1u.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import "react-dom";
import "@headlessui/react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const JenisNasabah = ({ loan }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    notes: "",
    type_transaksi: "notes"
  });
  useEffect(() => {
    setData("notes", loan.notes);
  }, [loan]);
  const handleOnChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(route("pinjaman.bayar_pinjaman", loan.id));
    reset("notes");
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Jenis Nasabah" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: onSubmitCreate, children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-3", children: /* @__PURE__ */ jsx(
          SelectList,
          {
            id: "notes",
            type: "date",
            name: "notes",
            value: data.notes,
            options: [
              {
                id: 1,
                value: "10L",
                display: "10L"
              },
              {
                id: 2,
                value: "Beban Pemakaian",
                display: "Beban Pemakaian"
              },
              {
                id: 3,
                value: "CM LUNAS",
                display: "CM LUNAS"
              }
            ],
            nullValue: true,
            className: "block w-full mt-1",
            onChange: handleOnChange
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(PrimaryButton, { title: "Submit", type: "submit" }) })
      ] }),
      /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
    ] }) })
  ] });
};
export {
  JenisNasabah as default
};
