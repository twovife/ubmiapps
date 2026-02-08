import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as SearchComponent } from "./SearchComponent-BPnDq_4y.js";
import { useState, useEffect } from "react";
import "./Dropdown-tAzvTn5J.js";
import { usePage } from "@inertiajs/react";
import { B as Button } from "./button-StO46bLt.js";
import { FilterIcon } from "lucide-react";
import "./dropdown-menu-BEELUTJf.js";
import "sweetalert2";
import "sweetalert2-react-content";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-eMhT0muz.js";
import "./table-DgsbovDN.js";
import "dayjs";
import "./accordion-Bo7Hup67.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DpwcYzou.js";
import TableRekapKasir from "./TableRekapKasir-D1hP0HXY.js";
import TunaiMantri from "./TunaiMantri-Cd1XmTmd.js";
import Action from "./Action-B7Gl9tFE.js";
import TableRekapPerMantri from "./TableRekapPerMantri-BNQdYg-I.js";
import "./SelectComponent-C78kOz17.js";
import "./input-BH-oxdzi.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-icons";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-dropdown-menu";
import "@headlessui/react";
import "@radix-ui/react-popover";
import "@radix-ui/react-accordion";
import "@radix-ui/react-tabs";
import "@tanstack/react-table";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "./badge-BDQK5pqs.js";
import "./BargeStatus-B_JPokIk.js";
import "./Checkbox-DLnjqb3e.js";
import "./InputLabel-BhdXf1ED.js";
import "./BadgeStatus-BDnUSm56.js";
import "./dialog-5zuHJd4f.js";
import "@radix-ui/react-dialog";
import "react-currency-input-field";
const Permantri = ({
  rekapData,
  saldoAwalBulan,
  auth,
  urlLink,
  localState,
  title
}) => {
  const [datas, setDatas] = useState([]);
  const { server_filter } = usePage().props;
  useEffect(() => {
    setDatas(rekapData);
  }, [rekapData]);
  const [onShowModal, setOnShowModal] = useState(false);
  const [triggeredData, setTriggeredData] = useState();
  const handleOnCreateShowClosed = (e) => {
    setOnShowModal(false);
    setTriggeredData();
  };
  const [nexOrPrevious, setNexOrPrevious] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Action,
      {
        show: onShowModal,
        onClosed: handleOnCreateShowClosed,
        triggeredData
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between gap-3 mb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-none shrink-0 whitespace-nowrap", children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight ", children: title }) }),
      /* @__PURE__ */ jsx("div", { className: "items-center justify-end flex-auto hidden w-full lg:flex", children: /* @__PURE__ */ jsx(
        SearchComponent,
        {
          urlLink,
          localState,
          searchMonth: true,
          searchKelompok: server_filter.userAuthorized.canShowKelompok,
          searchBranch: server_filter.userAuthorized.canShowBranch,
          searchGroupingBranch: server_filter.userAuthorized.canShowGroupingBranch
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 lg:hidden", children: /* @__PURE__ */ jsxs(Popover, { children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
          /* @__PURE__ */ jsx(FilterIcon, { className: "h-4" }),
          "Filter"
        ] }) }),
        /* @__PURE__ */ jsx(PopoverContent, { children: /* @__PURE__ */ jsx(
          SearchComponent,
          {
            urlLink,
            localState,
            searchMonth: true,
            searchKelompok: server_filter.userAuthorized.canShowKelompok,
            searchBranch: server_filter.userAuthorized.canShowBranch,
            searchGroupingBranch: server_filter.userAuthorized.canShowGroupingBranch
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-h-[70vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-none", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "rekappimpinan", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "rekappimpinan", children: "Rekap Mantri" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "rekapkasir", children: "Rekap Kasir Mantri" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "tunaimantri", children: "Tunai Mantri" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "rekappimpinan", children: /* @__PURE__ */ jsx(
        TableRekapPerMantri,
        {
          setOnShowModal,
          setTriggeredData,
          saldoAwalBulan,
          datas
        }
      ) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "rekapkasir", children: /* @__PURE__ */ jsx(TableRekapKasir, { datas }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "tunaimantri", children: /* @__PURE__ */ jsx(TunaiMantri, { datas }) })
    ] }) })
  ] });
};
export {
  Permantri as default
};
