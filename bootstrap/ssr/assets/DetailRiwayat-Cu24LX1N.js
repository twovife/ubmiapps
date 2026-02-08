import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState, useEffect, useMemo } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import "./button-StO46bLt.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "@radix-ui/react-slot";
import "class-variance-authority";
const DetailRiwayat = ({ detailData }) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState();
  useEffect(() => {
    setData(detailData);
  }, [detailData]);
  const columns = useMemo(
    () => [
      {
        header: "Tgl Pengajuan",
        accessorKey: "request_date",
        cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { children: dayjs(getValue()).format("DD/MM") })
      },
      {
        header: "Status Pengajuan",
        accessorKey: "status",
        cell: ({ getValue }) => getValue()
      },
      {
        header: "Tgl Drop",
        accessorKey: "drop_date",
        cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { children: dayjs(getValue()).format("DD/MM") })
      },
      {
        header: "Drop",
        accessorKey: "drop",
        cell: ({ getValue }) => /* @__PURE__ */ jsx(FormatNumbering, { value: getValue() })
      },
      {
        header: "Lunas",
        accessorKey: "lunas",
        cell: ({ getValue }) => getValue() ? "Lunas" : "Belum"
      },
      {
        header: "Status",
        accessorKey: "status_pinjaman",
        cell: ({ getValue }) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `uppercase ${getValue() == "mb" || getValue() == "ml" ? "bg-red-500 font-semibold" : ""}`,
            children: getValue()
          }
        )
      }
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  return /* @__PURE__ */ jsxs(Table, { className: "w-full table-auto", children: [
    /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup, key) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header, key2) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: flexRender(
      header.column.columnDef.header,
      header.getContext()
    ) }, key2)) }, key)) }),
    /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row, key) => /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsx(
      TableRow,
      {
        className: `${expanded == row.original.loan_id ? "border-b-0" : ""} text-center`,
        children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
          TableCell,
          {
            className: `${cell.column.columnDef.className}`,
            children: flexRender(cell.column.columnDef.cell, cell.getContext())
          },
          cell.id
        ))
      },
      key
    ) }, key)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "4", children: "Belum Ada Catatan Pinjaman" }) }) })
  ] });
};
export {
  DetailRiwayat as default
};
