import { jsxs, jsx } from "react/jsx-runtime";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import { S as SelectList } from "./SelectList-DrCNDu1u.js";
import { B as Button } from "./button-StO46bLt.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-5zuHJd4f.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { usePage, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import "react-dom";
import "@headlessui/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "@radix-ui/react-label";
const GenerateUser = ({ show, onClosed, triggeredData }) => {
  const { roles } = usePage().props;
  const roleOptions = roles == null ? void 0 : roles.map((role) => {
    return {
      display: role.name,
      value: role.id,
      id: role.id
    };
  });
  const { data, setData, post, reset, transform, errors, processing } = useForm(
    {
      id: "",
      branch_id: "",
      nama: "",
      jabatan: "",
      username: "",
      role: ""
    }
  );
  const onSubmitHandler = (e) => {
    e.preventDefault();
    post(route("administrasi.manpower.store"));
  };
  useEffect(() => {
    if (triggeredData) {
      setData((prevData) => ({
        ...prevData,
        id: triggeredData.id,
        branch_id: triggeredData.branch_id,
        nama: triggeredData.employee_name,
        username: triggeredData.username,
        jabatan: triggeredData.employment,
        role: triggeredData.role
      }));
    }
  }, [triggeredData]);
  const onClosedModalHandler = (e) => {
    onClosed();
    reset();
  };
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      open: show,
      onOpenChange: (open) => open ? "" : onClosedModalHandler(),
      children: [
        /* @__PURE__ */ jsx(Loading, { show: processing }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "w-[90vw] lg:max-w-md h-[90vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin", children: [
          /* @__PURE__ */ jsx(DialogHeader, { className: "max-h-10", children: /* @__PURE__ */ jsx(DialogTitle, { children: "Buat User" }) }),
          /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsxs("form", { onSubmit: onSubmitHandler, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "nama", children: "Nama" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "nama",
                  name: "nama",
                  readOnly: true,
                  value: data.nama,
                  onChange: (e) => setData("nama", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "username",
                  name: "username",
                  value: data.username,
                  onChange: (e) => setData("username", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "jabatan", children: "Jabatan" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "jabatan",
                  name: "jabatan",
                  readOnly: true,
                  value: data.jabatan,
                  onChange: (e) => setData("jabatan", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 mb-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "role", children: "Role Name" }),
              /* @__PURE__ */ jsx(
                SelectList,
                {
                  options: roleOptions,
                  required: true,
                  name: "role",
                  onChange: (e) => setData("role", e.target.value),
                  value: data.role,
                  id: "role",
                  nullvalue: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" })
          ] }) })
        ] })
      ]
    }
  );
};
export {
  GenerateUser as default
};
