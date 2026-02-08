import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { I as InputLabel } from "./InputLabel-BhdXf1ED.js";
import { usePage, router, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BHWercwM.js";
import { T as TextInput } from "./TextInput-GCtCMl-T.js";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import OldCustomer from "./OldCustomer-CHEizQGR.js";
import NewCustomer from "./NewCustomer-DLrjyqsZ.js";
import "./Dropdown-tAzvTn5J.js";
import "./button-StO46bLt.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "react-icons/bi";
import "hamburger-react";
import "./dropdown-menu-BEELUTJf.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-icons";
import "./SweetAlert-CPwvZdfJ.js";
import "sweetalert2";
import "sweetalert2-react-content";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
import "./Checkbox-DLnjqb3e.js";
import "./SelectList-DrCNDu1u.js";
import "react-currency-input-field";
function useServerFilter(url, server_filters, branch, employees, batch_datas, tabel_type = null) {
  var _a;
  const { kelompok } = usePage().props;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(
    tabel_type ? ((_a = batch_datas[0]) == null ? void 0 : _a[tabel_type]) ?? null : null
  );
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const [serverFilters, setServerFilters] = useState({ ...server_filters });
  const onServerFilterChange = (e) => {
    const { value, name } = e.target;
    setServerFilters({ ...serverFilters, [name]: value });
  };
  const transaction_day = [
    {
      id: 1,
      value: "senin",
      display: "Senin"
    },
    {
      id: 2,
      value: "selasa",
      display: "Selasa"
    },
    {
      id: 3,
      value: "rabu",
      display: "Rabu"
    },
    {
      id: 4,
      value: "kamis",
      display: "Kamis"
    },
    {
      id: 5,
      value: "jumat",
      display: "Jumat"
    },
    {
      id: 6,
      value: "sabtu",
      display: "Sabtu"
    }
  ];
  const mantriMantri = [];
  for (let i = 1; i <= 10; i++) {
    mantriMantri.push({
      id: i,
      value: i,
      display: `Mantri ${i}`
    });
  }
  const kolompokMantri = kelompok == null ? void 0 : kelompok.map((item) => {
    return {
      id: item,
      value: item,
      display: `Mantri ${item}`
    };
  });
  const branchess = branch == null ? void 0 : branch.map((item) => {
    if (tabel_type == "wilayah") {
      return {
        id: item.id,
        value: item.wilayah,
        display: `wilayah ${item.wilayah}`
      };
    }
    if (tabel_type == "unit") {
      return {
        id: item.id,
        value: item.unit,
        display: `${item.unit}`
      };
    }
  });
  const emps = employees == null ? void 0 : employees.map((item) => {
    return {
      id: item.id,
      value: item.id,
      display: `${item.nama_karyawan} - ${item.jabatan} ${item.area != 0 ? item.area : ""}`
    };
  });
  const onServerFilterSubmit = (e) => {
    setLoading(true);
    router.get(route(url), serverFilters);
  };
  const status_angsuran = [
    {
      id: 1,
      value: 1,
      display: "normal"
    },
    {
      id: 2,
      value: 2,
      display: "cm"
    },
    {
      id: 3,
      value: 3,
      display: "mb"
    },
    {
      id: 4,
      value: 4,
      display: "ml"
    }
  ];
  return {
    serverFilters,
    onServerFilterChange,
    onServerFilterSubmit,
    branchess,
    loading,
    setLoading,
    activeTab,
    setActiveTab,
    handleTabClick,
    transaction_day,
    emps,
    mantriMantri,
    kolompokMantri,
    status_angsuran
  };
}
const BatchUpdate = ({ max_date, min_date, ...props }) => {
  const { emps, status_angsuran } = useServerFilter(
    null,
    null,
    null,
    props.mantri
  );
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [nikData, setNikData] = useState();
  const [customerData, setCustomerData] = useState();
  const [nik, setNik] = useState();
  const onSubmitFindNik = (e) => {
    const nik2 = document.getElementById("nik").value;
    setLoading(true);
    setErorAxios();
    setNikData();
    setNik();
    axios({
      method: "post",
      url: route("transaction.getnik"),
      data: {
        nik: nik2
      }
    }).then(function({ data }) {
      setNikData(data.data);
      setCustomerData(data.reqistered_customer);
      setNik(nik2);
      setLoading(false);
    }).catch(function({ response }) {
      setErorAxios(response.data.message);
      setNikData();
      setNik();
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: props.auth,
      errors: props.errors,
      header: "Buku Transaksi",
      loading,
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Batch Upload" }),
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "flex p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nik", value: "Input Nik Customer" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-3 mt-1", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "nik",
                    type: "text",
                    name: "nik",
                    required: true,
                    className: "block",
                    autoComplete: "nik"
                  }
                ),
                /* @__PURE__ */ jsx(
                  PrimaryButton,
                  {
                    title: "Cek",
                    as: "button",
                    type: "button",
                    onClick: onSubmitFindNik
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: erorAxios, className: "mt-2" })
            ] }),
            nik ? customerData ? /* @__PURE__ */ jsx(
              OldCustomer,
              {
                status: status_angsuran,
                setLoading,
                max_date,
                min_date,
                emps,
                nik,
                url: route("batchupdate.batch_post"),
                customer_id: customerData == null ? void 0 : customerData.id
              }
            ) : /* @__PURE__ */ jsx(
              NewCustomer,
              {
                status: status_angsuran,
                setLoading,
                max_date,
                min_date,
                emps,
                nik,
                url: route("batchupdate.batch_post")
              }
            ) : "",
            /* @__PURE__ */ jsx("div", { className: "mb-3" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-3", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "History Pinjaman Customer" }),
            /* @__PURE__ */ jsx("div", { className: "p-4 mb-3 overflow-hidden rounded shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-500", children: [
              /* @__PURE__ */ jsx("thead", { className: "sticky top-0 text-xs text-gray-900 uppercase bg-gray-200 whitespace-nowrap", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "No" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Tanggal Drop" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Unit" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Kelompok" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Mantri" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Nama Customer" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Drop" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Lunas" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: nikData ? nikData.map((element, key) => {
                return /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: key + 1 }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: dayjs(element.tanggal_drop).format("DD-MM-YYYY") }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.unit }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.kelompok }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.mantri_name }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.customer_name }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsx(
                    NumericFormat,
                    {
                      value: element.drop,
                      displayType: "text",
                      thousandSeparator: ",",
                      prefix: "Rp. "
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.lunas }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: element.status == "normal" || element.status == "cm" ? /* @__PURE__ */ jsx(
                    Link,
                    {
                      as: "a",
                      href: route(
                        "pinjaman.normal.show",
                        element.id
                      ),
                      className: "px-5 py-1 font-semibold text-white uppercase bg-green-400 rounded-lg",
                      children: element.status
                    }
                  ) : element.status == "mb" ? /* @__PURE__ */ jsx(
                    Link,
                    {
                      as: "a",
                      href: route(
                        "pinjaman.normal.show",
                        element.id
                      ),
                      className: "px-5 py-1 font-semibold text-white uppercase bg-yellow-400 rounded-lg",
                      children: element.status
                    }
                  ) : /* @__PURE__ */ jsx(
                    Link,
                    {
                      as: "a",
                      href: route(
                        "pinjaman.normal.show",
                        element.id
                      ),
                      className: "px-5 py-1 font-semibold text-white uppercase bg-red-400 rounded-lg",
                      children: element.status
                    }
                  ) })
                ] }, key);
              }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, children: "Data tidak ditemukan" }) }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
};
export {
  BatchUpdate as default
};
