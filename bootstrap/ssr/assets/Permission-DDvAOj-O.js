import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DK9akThy.js";
import { useForm } from "@inertiajs/react";
import { L as Label } from "./label-e-KMhPKP.js";
import { I as Input } from "./input-BH-oxdzi.js";
import { B as Button } from "./button-StO46bLt.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
const Permission = () => {
  const { data, setData, post, reset, processing, errors } = useForm({
    name: "",
    type: "permission"
  });
  const onChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("adminpanel.post_permission"), {
      onSuccess: () => {
        reset("name");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-1/4", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Generate Permission" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Permission" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Pemission Name" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            required: true,
            name: "name",
            onChange,
            id: "name",
            value: data.name
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "mt-3", children: "Submit" })
    ] }) })
  ] });
};
export {
  Permission as default
};
