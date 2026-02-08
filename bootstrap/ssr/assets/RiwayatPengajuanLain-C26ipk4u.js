import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect, useMemo } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DgsbovDN.js";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "dayjs";
import "./badge-BDQK5pqs.js";
import "./button-StO46bLt.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
const RiwayatPengajuanLain = ({ data }) => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    setCustomerData(data ?? []);
  }, [data]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "day",
        header: "Hari",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsx("div", { children: getValue() })
      },
      {
        accessorKey: "count",
        header: "Total Crash (Seluruh UBM)",
        cell: ({ row, getValue }) => /* @__PURE__ */ jsx("div", { children: `${getValue()} Kelompok` })
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
    )) }, key) }) }, key)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "4", children: "Belum Ada Catatan Pinjaman" }) }) }),
    /* @__PURE__ */ jsx("caption", { className: "text-center text-xs text-red-500 mt-3", children: "Perubahan Sementara, Hasil Rapim TGL 03-JULI-2025, Selanjutnya akan dibahas lebih detail" })
  ] });
};
export {
  RiwayatPengajuanLain as default
};
