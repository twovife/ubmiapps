import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

function useOptionGenerator({ propsWilayah = '', ...props } = {}) {
  const { server_filter } = usePage().props;

  const [selectedSearchParam, setSelectedSearchParam] = useState(
    server_filter?.search ?? null
  );
  const [selectedWilayah, setSelectedWilayah] = useState(
    server_filter?.wilayah ?? ''
  );

  useEffect(() => {
    propsWilayah !== '' && setSelectedWilayah(propsWilayah);
  }, [propsWilayah]);

  // dipakai jika hanya tanpa mengganti request branch_id
  const [selectedBranch_id, setSelectedBranch_id] = useState(
    server_filter?.branch_id ?? ''
  );
  // dipakai jika hanya tanpa mengganti request branch_id
  const [selectedMonth, setSelectedMonth] = useState(
    server_filter?.month ?? ''
  );
  // dipakai jika hanya tanpa mengganti request branch_id
  const [selectedDate, setSelectedDate] = useState(server_filter?.date ?? '');

  const [selectedEmployee, setSelectedEmployee] = useState(
    server_filter?.employee_id ?? ''
  );
  const [selectedKelompok, setSelectedKelompok] = useState(
    server_filter?.kelompok ?? ''
  );
  const [selectedHari, setSelectedHari] = useState(server_filter?.hari ?? '');

  const optWilayah = [
    { id: 0, display: 'Pusat', value: 0 },
    { id: 1, display: 'Wilayah 1', value: 1 },
    { id: 2, display: 'Wilayah 2', value: 2 },
    { id: 3, display: 'Wilayah 3', value: 3 },
    { id: 4, display: 'Wilayah 4', value: 4 },
    { id: 5, display: 'Wilayah 5', value: 5 },
    { id: 6, display: 'Wilayah 6', value: 6 },
    { id: 7, display: 'Wilayah 7', value: 7 },
    { id: 8, display: 'Wilayah 8', value: 8 },
    { id: 9, display: 'Wilayah 9', value: 9 },
    { id: 10, display: 'Wilayah 10', value: 10 },
  ];

  const dayOpt = [
    { id: 0, display: 'senin', value: 'senin' },
    { id: 1, display: 'selasa', value: 'selasa' },
    { id: 2, display: 'rabu', value: 'rabu' },
    { id: 3, display: 'kamis', value: 'kamis' },
    { id: 4, display: 'jumat', value: 'jumat' },
    { id: 5, display: 'sabtu', value: 'sabtu' },
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
    { id: 10, display: 10, value: 10 },
  ];

  const optBranch = server_filter?.branch?.map((item) => {
    return {
      id: item.id,
      display: item.unit,
      value: item.id,
    };
  });
  const [filteredBranch, setFilteredBranch] = useState();

  const [filteredEmps, setFilteredEmps] = useState();

  // dipakai jika hanya tanpa mengganti request branch_id
  const onWilayahChangeHandler = (e) => {
    const { value } = e.target;
    setSelectedWilayah(value);
  };

  const onBranchChangeHandler = (e) => {
    const { value } = e.target;
    setSelectedBranch_id(value);
  };

  const onEmployeeChangeHandler = (e) => {
    const { value } = e.target;
    setSelectedBranch_id(value);
  };

  useEffect(() => {
    const branchFiltered =
      selectedWilayah !== ''
        ? server_filter?.branch
            ?.filter((item) => {
              return item.wilayah == parseInt(selectedWilayah);
            })
            //   ?.sort((a, b) => a.unit - b.unit)
            ?.map((mapitem) => {
              return {
                id: mapitem.id,
                display: mapitem.unit,
                value: mapitem.id,
                wilayah: mapitem.wilayah,
              };
            })
        : '';
    setFilteredBranch(branchFiltered);
  }, [selectedWilayah]);

  useEffect(() => {
    const employeeFiltered =
      selectedBranch_id !== ''
        ? server_filter?.employees
            ?.filter((item) => {
              return item.branch_id == selectedBranch_id;
            })
            ?.map((mapitem) => {
              return {
                id: mapitem.id,
                display: `${mapitem.nama_karyawan} ${
                  mapitem.date_resign ? ' - Resign' : ''
                } `,
                value: mapitem.id,
                className: mapitem.date_resign ? 'bg-red-200' : '',
              };
            })
        : '';
    setFilteredEmps(employeeFiltered);
  }, [selectedBranch_id]);

  // fungsi ini dipakai jika yang dicari adalah employee

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
    setSelectedHari,
  };
}

export default useOptionGenerator;
