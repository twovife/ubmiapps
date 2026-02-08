import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CUMtYop0.js";
import "react";
import "./TextInput-GCtCMl-T.js";
import { Head } from "@inertiajs/react";
import UpdatePasswordForm from "./UpdatePasswordForm-BINw7Pni.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-C_BkfLV9.js";
import { M as MobileLayout } from "./MobileLayout-B92D_4lk.js";
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
import "./InputError-cRVTeK4i.js";
import "./InputLabel-BhdXf1ED.js";
import "@radix-ui/react-dialog";
function Edit({ auth, mustVerifyEmail, status }) {
  const permissionMantri = auth.permissions.includes("unit mantri");
  const Layout = permissionMantri ? MobileLayout : Authenticated;
  return /* @__PURE__ */ jsxs(
    Layout,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-white shadow-sm sm:p-8 sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-white shadow-sm sm:p-8 sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
