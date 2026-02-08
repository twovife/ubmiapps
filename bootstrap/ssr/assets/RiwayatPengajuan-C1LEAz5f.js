import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect, useMemo } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import { B as BadgeStatus } from "./BadgeStatus-BDnUSm56.js";
import "./badge-BDQK5pqs.js";
import "./button-StO46bLt.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
const RiwayatPengajuan = ({ data }) => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    setCustomerData(data ?? []);
  }, [data]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "branch",
        header: "Kantor",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsx("div", { children: getValue() })
      },
      {
        accessorKey: "kelompok",
        header: "Kelompok",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: row.original.unit }),
          getValue()
        ] })
      },
      {
        accessorKey: "day",
        header: "Hari",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsx("div", { children: getValue() })
      },
      {
        accessorKey: "pinjaman",
        header: "Tgl Drop",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsx("div", { children: dayjs(getValue()).format("DD-MM-YY") })
      },
      {
        accessorKey: "status_show",
        header: "Status",
        cell: ({ row, getValue }) => getValue() ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1/3 lg:flex-1/2 lg:text-right", children: /* @__PURE__ */ jsx(
            BadgeStatus,
            {
              className: "justify-center w-full lg:w-16",
              value: row.original.status
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex-2/3 lg:flex-1/2 lg:text-left", children: /* @__PURE__ */ jsx(
            BadgeStatus,
            {
              className: "lg:w-24 w-full justify-center",
              value: row.original.lunas
            }
          ) })
        ] }) : null
      }
    ],
    []
  );
  const table = useReactTable({
    data: customerData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  return /* @__PURE__ */ jsxs(Table, { className: "w-full table-auto", children: [
    /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 z-10 bg-gray-100", children: table.getHeaderGroups().map((headerGroup, key) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header, key2) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: flexRender(
      header.column.columnDef.header,
      header.getContext()
    ) }, key2)) }, key)) }),
    /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row, key) => /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(TableRow, { className: `text-center`, children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
      TableCell,
      {
        className: `${cell.column.columnDef.className}`,
        children: flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )
      },
      cell.id
    )) }, key) }) }, key)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "4", children: "Belum Ada Catatan Pinjaman" }) }) })
  ] });
};
export {
  RiwayatPengajuan as default
};
