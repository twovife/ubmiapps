import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

function useServerFilter(
    url,
    server_filters,
    branch,
    employees,
    batch_datas,
    tabel_type = null
) {
    const { kelompok } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(
        tabel_type ? batch_datas[0]?.[tabel_type] ?? null : null
    ); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [serverFilters, setServerFilters] = useState({ ...server_filters });
    const onServerFilterChange = (e) => {
        const { value, name } = e.target;
        setServerFilters({ ...serverFilters, [name]: value });
    };

    const transaction_day = [
        {
            id: 1,
            value: "senin",
            display: "Senin",
        },
        {
            id: 2,
            value: "selasa",
            display: "Selasa",
        },
        {
            id: 3,
            value: "rabu",
            display: "Rabu",
        },
        {
            id: 4,
            value: "kamis",
            display: "Kamis",
        },
        {
            id: 5,
            value: "jumat",
            display: "Jumat",
        },
        {
            id: 6,
            value: "sabtu",
            display: "Sabtu",
        },
    ];

    const mantriMantri = [];
    for (let i = 1; i <= 10; i++) {
        mantriMantri.push({
            id: i,
            value: i,
            display: `Mantri ${i}`,
        });
    }
    const kolompokMantri = kelompok?.map((item) => {
        return {
            id: item,
            value: item,
            display: `Mantri ${item}`,
        };
    });

    // const selectMantri = mantriMantri.filter(item=>item.value)

    const branchess = branch?.map((item) => {
        if (tabel_type == "wilayah") {
            return {
                id: item.id,
                value: item.wilayah,
                display: `wilayah ${item.wilayah}`,
            };
        }

        if (tabel_type == "unit") {
            return {
                id: item.id,
                value: item.unit,
                display: `${item.unit}`,
            };
        }
    });

    const emps = employees?.map((item) => {
        return {
            id: item.id,
            value: item.id,
            display: `${item.nama_karyawan} - ${item.jabatan} ${
                item.area != 0 ? item.area : ""
            }`,
        };
    });

    const onServerFilterSubmit = (e) => {
        setLoading(true);
        router.get(route(url), serverFilters);
    };

    const status_angsuran = [
        {
            id: 1,
            value: 1,
            display: "normal",
        },
        {
            id: 2,
            value: 2,
            display: "cm",
        },
        {
            id: 3,
            value: 3,
            display: "mb",
        },
        {
            id: 4,
            value: 4,
            display: "ml",
        },
    ];
    return {
        serverFilters,
        onServerFilterChange,
        onServerFilterSubmit,
        branchess,
        loading,
        setLoading,
        activeTab,
        setActiveTab,
        handleTabClick,
        transaction_day,
        emps,
        mantriMantri,
        kolompokMantri,
        status_angsuran,
    };
}

export default useServerFilter;
