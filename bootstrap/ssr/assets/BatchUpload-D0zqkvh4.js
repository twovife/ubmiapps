import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import NewNasabah from "./NewNasabah-CTZlMGRG.js";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import "./button-StO46bLt.js";
import { L as LinkButton } from "./LinkButton-Cyzm0_CJ.js";
import "./InputError-cRVTeK4i.js";
import "./Loading-DPcVnbEk.js";
import "react-dom";
import "@headlessui/react";
import "./card-DK9akThy.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./tabs-DpwcYzou.js";
import "@radix-ui/react-tabs";
import "./input-BH-oxdzi.js";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@inertiajs/react";
import "axios";
import "lucide-react";
import "react-currency-input-field";
import "./SelectComponent-C78kOz17.js";
import "./RiwayatPengajuan-C1LEAz5f.js";
import "./table-DgsbovDN.js";
import "@tanstack/react-table";
import "dayjs";
import "./BadgeStatus-BDnUSm56.js";
import "./badge-BDQK5pqs.js";
import "@radix-ui/react-slot";
import "./Checkbox-DLnjqb3e.js";
import "./FormatNumbering-CTESXtjE.js";
import "react-number-format";
import "./useFrontEndPermission-i32ufhQ2.js";
import "./NoEditOverlay-GIB1h_zq.js";
import "./Dropdown-tAzvTn5J.js";
import "react-icons/bi";
import "hamburger-react";
import "./dropdown-menu-BEELUTJf.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-icons";
import "./SweetAlert-CPwvZdfJ.js";
import "sweetalert2";
import "sweetalert2-react-content";
const BatchUpload = () => {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(
      NewNasabah,
      {
        onClosed: () => void 0,
        generateAngsuran: true,
        typeInput: "text",
        submitUrl: route("transaction.store_buku_transaksi_batch")
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute z-20 right-2 bottom-2", children: /* @__PURE__ */ jsx(LinkButton, { href: route("transaction.fastcreatev2"), color: "outline", children: "V2" }) })
  ] });
};
export {
  BatchUpload as default
};
