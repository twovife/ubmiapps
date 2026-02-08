import { jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import RekapContent from "./RekapContent-BIZ7eLl7.js";
import { Head } from "@inertiajs/react";
import "react";
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
import "./SearchComponent-BPnDq_4y.js";
import "./SelectComponent-C78kOz17.js";
import "./input-BH-oxdzi.js";
import "dayjs";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "./popover-eMhT0muz.js";
import "@radix-ui/react-popover";
import "./TableRekap-D8lehBfC.js";
import "./table-DgsbovDN.js";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "./accordion-Bo7Hup67.js";
import "@radix-ui/react-accordion";
import "./tabs-DpwcYzou.js";
import "@radix-ui/react-tabs";
import "./TableRekapKasir-D1hP0HXY.js";
import "@tanstack/react-table";
import "./badge-BDQK5pqs.js";
import "./BargeStatus-B_JPokIk.js";
import "./TunaiMantri-Cd1XmTmd.js";
import "./Action-B7Gl9tFE.js";
import "./Checkbox-DLnjqb3e.js";
import "./InputLabel-BhdXf1ED.js";
import "./BadgeStatus-BDnUSm56.js";
import "./dialog-5zuHJd4f.js";
import "@radix-ui/react-dialog";
import "react-currency-input-field";
const RekapSatu = ({ datas, auth, ...props }) => {
  const title = "REKAP 1 & Tunai Mantri";
  return /* @__PURE__ */ jsx(Authenticated, { header: /* @__PURE__ */ jsx(Head, { children: title }), children: /* @__PURE__ */ jsx(
    RekapContent,
    {
      rekapData: datas,
      show: "rekapkasir",
      title,
      urlLink: route("kasir.rekap.rekap_satu"),
      localState: "kasir_rekap_rekap_satu"
    }
  ) });
};
export {
  RekapSatu as default
};
