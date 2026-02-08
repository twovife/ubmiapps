import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect, useMemo } from "react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, f as TableFooter } from "./table-DgsbovDN.js";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { F as FormatNumbering } from "./FormatNumbering-CTESXtjE.js";
import dayjs from "dayjs";
import "./badge-BDQK5pqs.js";
import { B as BargeStatus } from "./BargeStatus-B_JPokIk.js";
import "./button-StO46bLt.js";
import { usePage } from "@inertiajs/react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "react-number-format";
import "class-variance-authority";
import "@radix-ui/react-slot";
const TunaiMantri = ({
  setOnShowModal,
  setTriggeredData,
  setTriggeredType,
  datas
}) => {
  const [data, setData] = useState([]);
  const { auth } = usePage().props;
  useEffect(() => {
    setData(datas);
  }, [datas]);
  const calculateTotals = (data2) => {
    return data2.reduce((acc, item) => {
      Object.keys(item).forEach((key) => {
        acc[key] = (acc[key] || 0) + (item[key] || 0);
      });
      return acc;
    }, {});
  };
  const totals = calculateTotals(data);
  const onClickStatusHandler = (e, type) => {
    setOnShowModal(true);
    setTriggeredData(e);
    setTriggeredType(type);
  };
  const columns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "kelompok",
        cell: ({ getValue, cell }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { children: cell.row.original.type == "daily" ? getValue() : dayjs(cell.row.original.tanggal).format("DD-MM") }),
          auth.permissions.includes("can update") && /* @__PURE__ */ jsx(
            BargeStatus,
            {
              onClick: () => onClickStatusHandler(cell.row.original, 2),
              value: cell.row.original.status_dayly_approval,
              children: cell.row.original.status_dayly_approval ? "Approved" : "Open"
            }
          )
        ] })
      },
      {
        header: "Titipan 9%",
        accessorKey: "titipan9",
        cell: ({ getValue }) => /* @__PURE__ */ jsx(FormatNumbering, { value: getValue() }),
        footer: (info) => /* @__PURE__ */ jsx(FormatNumbering, { value: totals.titipan9 })
      },
      {
        header: "Tunai",
        accessorKey: "tunai",
        cell: ({ getValue }) => /* @__PURE__ */ jsx(FormatNumbering, { value: getValue() }),
        footer: (info) => /* @__PURE__ */ jsx(FormatNumbering, { value: totals.tunai })
      },
      {
        header: "Status",
        accessorKey: "is_balance",
        cell: ({ getValue }) => /* @__PURE__ */ jsx(BargeStatus, { value: getValue() })
      }
    ],
    [totals]
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  const [onCreateShow, setOnCreateShow] = useState(false);
  const [actionData, setActionData] = useState();
  const handleOnCreateShowOpen = (e) => {
    setOnCreateShow(true);
    setActionData(e);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Table, { className: "w-full mb-3 table-auto", children: [
    /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 z-10 bg-gray-100", children: table.getHeaderGroups().map((headerGroup, key) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header, key2) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: flexRender(
      header.column.columnDef.header,
      header.getContext()
    ) }, key2)) }, key)) }),
    /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row, key) => /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsx(TableRow, { className: `text-center`, children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
      TableCell,
      {
        className: `${cell.column.columnDef.className}`,
        children: cell.column.columnDef.type == "show" ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2", children: /* @__PURE__ */ jsx(
          BargeStatus,
          {
            value: cell.row.original.status,
            onClick: () => handleOnCreateShowOpen(cell.row.original)
          }
        ) }) : flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )
      },
      cell.id
    )) }, key) }, key)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "4", children: "Belum Ada Catatan Pinjaman" }) }) }),
    /* @__PURE__ */ jsx(TableFooter, { children: table.getFooterGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
      return /* @__PURE__ */ jsx(
        TableHead,
        {
          className: "text-center text-black bg-gray-100",
          children: flexRender(
            header.column.columnDef.footer,
            header.getContext()
          )
        },
        header.id
      );
    }) }, headerGroup.id)) })
  ] }) });
};
export {
  TunaiMantri as default
};
