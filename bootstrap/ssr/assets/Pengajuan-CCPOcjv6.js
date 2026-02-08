import { jsxs, jsx } from "react/jsx-runtime";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { B as Button } from "./button-StO46bLt.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DK9akThy.js";
import { A as Accordion, a as AccordionItem, c as AccordionContent } from "./accordion-Bo7Hup67.js";
import { useState } from "react";
import WhiteOff from "./WhiteOff-CmM5sBlW.js";
import PengajuanLama from "./PengajuanLama-CPWXFCy0.js";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-accordion";
import "@radix-ui/react-icons";
import "@inertiajs/react";
import "dayjs";
import "./input-BH-oxdzi.js";
import "./label-e-KMhPKP.js";
import "@radix-ui/react-label";
import "./InputError-cRVTeK4i.js";
import "react-currency-input-field";
const Pengajuan = ({ triggeredId, triggeredPinjaman, instalment }) => {
  var _a;
  const [activePanel, setActivePanel] = useState(null);
  const togglePanel = (panel) => {
    setActivePanel((prev) => prev === panel ? null : panel);
  };
  const pelunasan = ((_a = instalment.sort((a, b) => a.saldo - b.saldo)[0]) == null ? void 0 : _a.saldo) ?? 0;
  return /* @__PURE__ */ jsxs(Card, { className: "relative w-full mb-3", children: [
    /* @__PURE__ */ jsx(Loading, { show: false }),
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Action" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: activePanel == "item-1" ? "green" : "outline",
            onClick: () => togglePanel("item-1"),
            disabled: true,
            children: "Pengajuan"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: activePanel == "item-2" ? "green" : "outline",
            onClick: () => togglePanel("item-2"),
            children: "Pemutihan"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        Accordion,
        {
          type: "single",
          collapsible: true,
          value: activePanel,
          onValueChange: setActivePanel,
          children: [
            /* @__PURE__ */ jsx(AccordionItem, { borderless: true, value: "item-1", children: /* @__PURE__ */ jsx(AccordionContent, { children: activePanel == "item-1" && /* @__PURE__ */ jsx(
              PengajuanLama,
              {
                isActive: activePanel == "item-1",
                triggeredId,
                triggeredPinjaman
              }
            ) }) }),
            /* @__PURE__ */ jsx(AccordionItem, { borderless: true, value: "item-2", children: /* @__PURE__ */ jsx(AccordionContent, { children: activePanel == "item-2" && /* @__PURE__ */ jsx(
              WhiteOff,
              {
                triggeredId,
                nominalWhiteOff: pelunasan ?? 0
              }
            ) }) })
          ]
        }
      )
    ] })
  ] });
};
export {
  Pengajuan as default
};
