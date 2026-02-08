import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
function useOptionGenerator({ propsWilayah = "", ...props } = {}) {
  var _a;
  const { server_filter } = usePage().props;
  const [selectedSearchParam, setSelectedSearchParam] = useState(
    (server_filter == null ? void 0 : server_filter.search) ?? null
  );
  const [selectedWilayah, setSelectedWilayah] = useState(
    (server_filter == null ? void 0 : server_filter.wilayah) ?? ""
  );
  useEffect(() => {
    propsWilayah !== "" && setSelectedWilayah(propsWilayah);
  }, [propsWilayah]);
  const [selectedBranch_id, setSelectedBranch_id] = useState(
    (server_filter == null ? void 0 : server_filter.branch_id) ?? ""
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (server_filter == null ? void 0 : server_filter.month) ?? ""
  );
  const [selectedDate, setSelectedDate] = useState((server_filter == null ? void 0 : server_filter.date) ?? "");
  const [selectedEmployee, setSelectedEmployee] = useState(
    (server_filter == null ? void 0 : server_filter.employee_id) ?? ""
  );
  const [selectedKelompok, setSelectedKelompok] = useState(
    (server_filter == null ? void 0 : server_filter.kelompok) ?? ""
  );
  const [selectedHari, setSelectedHari] = useState((server_filter == null ? void 0 : server_filter.hari) ?? "");
  const optWilayah = [
    { id: 0, display: "Pusat", value: 0 },
    { id: 1, display: "Wilayah 1", value: 1 },
    { id: 2, display: "Wilayah 2", value: 2 },
    { id: 3, display: "Wilayah 3", value: 3 },
    { id: 4, display: "Wilayah 4", value: 4 },
    { id: 5, display: "Wilayah 5", value: 5 },
    { id: 6, display: "Wilayah 6", value: 6 },
    { id: 7, display: "Wilayah 7", value: 7 },
    { id: 8, display: "Wilayah 8", value: 8 },
    { id: 9, display: "Wilayah 9", value: 9 },
    { id: 10, display: "Wilayah 10", value: 10 }
  ];
  const dayOpt = [
    { id: 0, display: "senin", value: "senin" },
    { id: 1, display: "selasa", value: "selasa" },
    { id: 2, display: "rabu", value: "rabu" },
    { id: 3, display: "kamis", value: "kamis" },
    { id: 4, display: "jumat", value: "jumat" },
    { id: 5, display: "sabtu", value: "sabtu" }
  ];
  const optKelompok = [
    { id: 1, display: 1, value: 1 },
    { id: 2, display: 2, value: 2 },
    { id: 3, display: 3, value: 3 },
    { id: 4, display: 4, value: 4 },
    { id: 5, display: 5, value: 5 },
    { id: 6, display: 6, value: 6 },
    { id: 7, display: 7, value: 7 },
    { id: 8, display: 8, value: 8 },
    { id: 9, display: 9, value: 9 },
    { id: 10, display: 10, value: 10 }
  ];
  const optBranch = (_a = server_filter == null ? void 0 : server_filter.branch) == null ? void 0 : _a.map((item) => {
    return {
      id: item.id,
      display: item.unit,
      value: item.id
    };
  });
  const [filteredBranch, setFilteredBranch] = useState();
  const [filteredEmps, setFilteredEmps] = useState();
  const onWilayahChangeHandler = (e) => {
    const { value } = e.target;
    setSelectedWilayah(value);
  };
  const onBranchChangeHandler = (e) => {
    const { value } = e.target;
    setSelectedBranch_id(value);
  };
  useEffect(() => {
    var _a2, _b;
    const branchFiltered = selectedWilayah !== "" ? (_b = (_a2 = server_filter == null ? void 0 : server_filter.branch) == null ? void 0 : _a2.filter((item) => {
      return item.wilayah == parseInt(selectedWilayah);
    })) == null ? void 0 : _b.map((mapitem) => {
      return {
        id: mapitem.id,
        display: mapitem.unit,
        value: mapitem.id,
        wilayah: mapitem.wilayah
      };
    }) : "";
    setFilteredBranch(branchFiltered);
  }, [selectedWilayah]);
  useEffect(() => {
    var _a2, _b;
    const employeeFiltered = selectedBranch_id !== "" ? (_b = (_a2 = server_filter == null ? void 0 : server_filter.employees) == null ? void 0 : _a2.filter((item) => {
      return item.branch_id == selectedBranch_id;
    })) == null ? void 0 : _b.map((mapitem) => {
      return {
        id: mapitem.id,
        display: `${mapitem.nama_karyawan} ${mapitem.date_resign ? " - Resign" : ""} `,
        value: mapitem.id,
        className: mapitem.date_resign ? "bg-red-200" : ""
      };
    }) : "";
    setFilteredEmps(employeeFiltered);
  }, [selectedBranch_id]);
  return {
    selectedSearchParam,
    selectedWilayah,
    setSelectedWilayah,
    selectedBranch_id,
    setSelectedBranch_id,
    selectedEmployee,
    setSelectedEmployee,
    selectedMonth,
    setSelectedMonth,
    selectedDate,
    setSelectedDate,
    optBranch,
    optWilayah,
    filteredBranch,
    filteredEmps,
    selectedKelompok,
    setSelectedKelompok,
    onWilayahChangeHandler,
    onBranchChangeHandler,
    optKelompok,
    dayOpt,
    selectedHari,
    setSelectedHari
  };
}
function SelectList({
  name,
  value,
  className,
  required = true,
  handleChange,
  options,
  nullvalue,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "select",
    {
      name,
      value,
      className: `flex h-9 w-full min-w-20 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1` + className,
      required,
      ...props,
      children: options ? /* @__PURE__ */ jsxs(Fragment, { children: [
        nullvalue ? /* @__PURE__ */ jsx("option", { children: "Pilih Salah Satu" }) : null,
        options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.display }, opt.id))
      ] }) : /* @__PURE__ */ jsx("option", { children: "Pilih Salah Satu" })
    }
  );
}
export {
  SelectList as S,
  useOptionGenerator as u
};
