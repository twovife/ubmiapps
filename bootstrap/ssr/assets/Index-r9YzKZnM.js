import { jsx } from "react/jsx-runtime";
import "react";
import "./Dropdown-tAzvTn5J.js";
import { Head } from "@inertiajs/react";
import "./button-StO46bLt.js";
import "./dropdown-menu-BEELUTJf.js";
import "sweetalert2";
import "sweetalert2-react-content";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import { M as MobileLayout } from "./MobileLayout-B92D_4lk.js";
import Content from "./Content-C3ogxioF.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-icons";
import "@headlessui/react";
import "./SweetAlert-CPwvZdfJ.js";
import "lucide-react";
import "@radix-ui/react-dialog";
import "./TableRekap-BXZ_zJtu.js";
import "./table-DgsbovDN.js";
import "@tanstack/react-table";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "dayjs";
import "./badge-BDQK5pqs.js";
import "./BargeStatus-B_JPokIk.js";
import "./SearchComponent-BPnDq_4y.js";
import "./SelectComponent-C78kOz17.js";
import "./input-BH-oxdzi.js";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "./popover-eMhT0muz.js";
import "@radix-ui/react-popover";
import "./tabs-DpwcYzou.js";
import "@radix-ui/react-tabs";
const Index = ({ datas, ...props }) => {
  return /* @__PURE__ */ jsx(MobileLayout, { header: /* @__PURE__ */ jsx(Head, { children: "Buku Transaksi" }), children: /* @__PURE__ */ jsx(
    Content,
    {
      urlLink: route("mobile_apps.rencana_drop_kepala"),
      localState: "mobile_apps_rencana_drop_kepala",
      triggeredData: datas
    }
  ) });
};
export {
  Index as default
};
