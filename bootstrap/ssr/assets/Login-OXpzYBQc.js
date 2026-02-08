import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { G as Guest } from "./GuestLayout-DWRj8wt9.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { useForm, Head } from "@inertiajs/react";
import { I as Input } from "./input-BH-oxdzi.js";
import { L as Label } from "./label-e-KMhPKP.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DK9akThy.js";
import { B as Button } from "./button-StO46bLt.js";
import { L as Loading } from "./Loading-DPcVnbEk.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "react-dom";
import "@headlessui/react";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    password: "",
    remember: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsx(Loading, { show: processing }),
    /* @__PURE__ */ jsxs(Card, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Login" }),
        /* @__PURE__ */ jsx(CardDescription, { children: status ? status : "Enter your username below to login to your account" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { className: "grid gap-4", onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              name: "username",
              type: "text",
              placeholder: "username",
              required: true,
              autoComplete: "username",
              isFocused: true,
              value: data.username,
              onChange: (e) => setData("username", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.username, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              name: "password",
              type: "password",
              required: true,
              value: data.password,
              onChange: (e) => setData("password", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Login" })
      ] }) })
    ] })
  ] });
}
export {
  Login as default
};
