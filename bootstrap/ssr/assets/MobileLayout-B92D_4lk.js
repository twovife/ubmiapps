import { jsx, jsxs } from "react/jsx-runtime";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { S as SweetAlert } from "./SweetAlert-CPwvZdfJ.js";
import { Link, usePage } from "@inertiajs/react";
import * as React from "react";
import { useState } from "react";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, e as DropdownMenuItem } from "./dropdown-menu-BEELUTJf.js";
import { B as Button } from "./button-StO46bLt.js";
import { Home, Layers, HandCoinsIcon, UserX, Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { c as cn } from "./utils-H80jjgLf.js";
const Sheet = DialogPrimitive.Root;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(DialogPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Close,
      {
        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
        children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ]
      }
    ),
    children
  ] })
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
const SidebarMobile = ({ isOpen, setIsOpen }) => {
  return /* @__PURE__ */ jsx(
    Sheet,
    {
      open: isOpen,
      onOpenChange: (open) => open ? "" : setIsOpen(false),
      children: /* @__PURE__ */ jsx(SheetContent, { children: /* @__PURE__ */ jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsx(SheetTitle, { children: "Menu Aplikasi" }),
        /* @__PURE__ */ jsx(SheetDescription, { children: /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-6 p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsx("legend", { className: "px-1 -ml-1 text-sm font-medium", children: "Mantri" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-around gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon2xl", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("mobile_apps.index"), children: /* @__PURE__ */ jsx(Home, { className: "h-7 w-7" }) }) }),
              /* @__PURE__ */ jsx("div", { children: "Home" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon2xl", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("mobile_apps.create"), children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-7 w-7" }) }) }),
              /* @__PURE__ */ jsx("div", { children: "Pengajuan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon2xl", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("mobile_apps.transaksi"), children: /* @__PURE__ */ jsx(Layers, { className: "h-7 w-7" }) }) }),
              /* @__PURE__ */ jsx("div", { children: "Drop" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon2xl", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("mobile_apps.angsuran"), children: /* @__PURE__ */ jsx(HandCoinsIcon, { className: "h-7 w-7" }) }) }),
              /* @__PURE__ */ jsx("div", { children: "Angsuran" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon2xl", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("mobile_apps.macet"), children: /* @__PURE__ */ jsx(UserX, { className: "h-7 w-7" }) }) }),
              /* @__PURE__ */ jsx("div", { children: "Macet" })
            ] })
          ] })
        ] }) })
      ] }) })
    }
  );
};
const MobileLayout = ({ header, children, loading = false }) => {
  const { auth } = usePage().props;
  const { errors, flash } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 antialiased", children: [
    Object.keys(errors).length > 0 && /* @__PURE__ */ jsx(SweetAlert, { type: "error", message: errors[0], keys: flash }),
    flash.message && /* @__PURE__ */ jsx(SweetAlert, { type: "success", message: flash.message, keys: flash }),
    /* @__PURE__ */ jsx(Loading, { show: loading }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-50 flex items-center h-10 gap-4 bg-transparent", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-row items-center justify-between w-full h-full gap-5 px-2 text-sm lg:px-4 font-mediumlg:gap-6 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start", children: [
          /* @__PURE__ */ jsx(Button, { variant: "icon", onClick: toggleSidebar, children: /* @__PURE__ */ jsx(Menu, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("p", { className: "hidden font-semibold lg:block", children: "UBMI APPS" })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "xs",
              className: "flex items-center justify-center gap-3 text-xs",
              children: auth.user.username
            }
          ) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsx(DropdownMenuLabel, { children: auth.user.employee.nama_karyawan }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), children: "Profile" }) }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                replace: "true",
                children: "Logout"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(SidebarMobile, { setIsOpen, isOpen })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "px-2 lg:px-4", children })
    ] })
  ] });
};
export {
  MobileLayout as M
};
