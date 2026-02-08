import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-eMhT0muz.js";
import { S as SearchComponent } from "./SearchComponent-BPnDq_4y.js";
import { usePage } from "@inertiajs/react";
import AngsuranByDateTable from "./AngsuranByDateTable-CqqAQg3D.js";
import { B as Button } from "./button-StO46bLt.js";
import { FilterIcon } from "lucide-react";
import { L as Label } from "./label-e-KMhPKP.js";
import "./input-BH-oxdzi.js";
import InputMacet from "./InputMacet-DeYTI0bz.js";
import "dayjs";
import "@radix-ui/react-popover";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./SelectComponent-C78kOz17.js";
import "@radix-ui/react-icons";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
import "./table-DgsbovDN.js";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "./Action-CZFUwQdw.js";
import "./dialog-5zuHJd4f.js";
import "@radix-ui/react-dialog";
import "./card-DK9akThy.js";
import "axios";
import "./StatusPinjaman-BcI4A1Iw.js";
import "./badge-BDQK5pqs.js";
import "class-variance-authority";
import "./BayarAngsuran-Daoj1Mle.js";
import "react-currency-input-field";
import "./Checkbox-DLnjqb3e.js";
import "@radix-ui/react-label";
import "@radix-ui/react-slot";
import "./JenisNasabah-CaYZthxZ.js";
import "./InputError-cRVTeK4i.js";
import "./InputLabel-BhdXf1ED.js";
import "./PrimaryButton-BHWercwM.js";
import "./SelectList-DrCNDu1u.js";
import "./DeleteAngsuran-3Bs-fcCi.js";
import "./TextInput-GCtCMl-T.js";
import "./DeleteLoan-BRMUEAf1.js";
import "./useFrontEndPermission-i32ufhQ2.js";
import "./NoEditOverlay-GIB1h_zq.js";
import "sonner";
import "next-themes";
import "./BadgeStatus-BDnUSm56.js";
import "./Pengajuan-CCPOcjv6.js";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./WhiteOff-CmM5sBlW.js";
import "./PengajuanLama-CPWXFCy0.js";
import "./tabs-DpwcYzou.js";
import "@radix-ui/react-tabs";
import "react-day-picker";
import "@radix-ui/react-select";
import "date-fns";
const AngsuranByDate = ({
  headerName,
  datas,
  urlLink,
  localState,
  searchMonth,
  searchHari
}) => {
  const { auth, server_filter } = usePage().props;
  const [showInputMacet, setShowInputMacet] = useState(false);
  const onShowMacet = () => {
    setShowInputMacet(true);
  };
  const onCloseMacet = () => {
    setShowInputMacet(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(InputMacet, { show: showInputMacet, onClosed: onCloseMacet }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 mb-3 lg:flex-row lg:justify-between lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between flex-none shrink-0 whitespace-nowrap", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight ", children: headerName }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 lg:hidden", children: [
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
              /* @__PURE__ */ jsx(FilterIcon, { className: "h-4" }),
              "Filter"
            ] }) }),
            /* @__PURE__ */ jsx(PopoverContent, { children: /* @__PURE__ */ jsx(
              SearchComponent,
              {
                urlLink,
                localState,
                searchMonth,
                searchHari,
                searchKelompok: server_filter.userAuthorized.canShowKelompok,
                searchBranch: server_filter.userAuthorized.canShowBranch,
                searchGroupingBranch: server_filter.userAuthorized.canShowGroupingBranch
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: onShowMacet, color: "outline", children: "Input Macet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "items-center justify-end flex-auto hidden w-full lg:flex", children: [
        /* @__PURE__ */ jsx(
          SearchComponent,
          {
            urlLink,
            localState,
            searchMonth,
            searchHari,
            searchKelompok: server_filter.userAuthorized.canShowKelompok,
            searchBranch: server_filter.userAuthorized.canShowBranch,
            searchGroupingBranch: server_filter.userAuthorized.canShowGroupingBranch
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx(Label, { children: " " }),
          /* @__PURE__ */ jsx(Button, { onClick: onShowMacet, color: "outline", children: "Input Macet" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsx(AngsuranByDateTable, { datas }) })
  ] });
};
export {
  AngsuranByDate as default
};
