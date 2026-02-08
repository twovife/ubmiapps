import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function useFilterTable(initialFilters, itemsPerPage, passingdata = null) {
    const datas = passingdata ?? usePage().props.datas;

    const [filters, setFilters] = useState([
        {
            column: "",
            operators: "1",
            values: "",
            ...initialFilters,
        },
    ]);

    const [orderData, setOrderData] = useState({
        column: "",
        orderby: "",
    });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Reset the current page to 1 when filters or sorting criteria change
        setCurrentPage(1);
    }, [filters, orderData]);

    const applyFilter = (item, filter) => {
        const itemValue = item[filter.column];
        const paramValue = filter.values;

        if (
            paramValue === null ||
            paramValue === undefined ||
            paramValue === ""
        ) {
            return true;
        }

        if (parseInt(filter.operators) === 1) {
            return applyStringFilter(itemValue, paramValue);
        }

        if (parseInt(filter.operators) === 2) {
            return applyEqualityFilter(itemValue, paramValue);
        }

        return true;
    };

    const applyStringFilter = (itemValue, paramValue) => {
        const toLowerItemValue = itemValue?.toString().toLowerCase();
        const toLowerParamValue = paramValue?.toString().toLowerCase();

        if (
            typeof toLowerItemValue === "string" &&
            !toLowerItemValue.includes(toLowerParamValue)
        ) {
            return false;
        }

        return true;
    };

    const applyEqualityFilter = (itemValue, paramValue) => {
        const toLowerItemValue = itemValue?.toString().toLowerCase();
        const toLowerParamValue = paramValue?.toString().toLowerCase();

        return toLowerItemValue === toLowerParamValue;
    };

    const filteredData = datas.filter((item) => {
        for (const filter of filters) {
            if (!applyFilter(item, filter)) {
                return false;
            }
        }

        return true;
    });

    const filteredDataWithSorting = filteredData.slice().sort((a, b) => {
        const column = orderData.column;
        const orderby = orderData.orderby;

        if (orderData.column !== "") {
            if (orderby === "asc") {
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            } else if (orderby === "desc") {
                if (a[column] > b[column]) return -1;
                if (a[column] < b[column]) return 1;
                return 0;
            }
        }

        return 0;
    });

    const totalPages = Math.ceil(filteredDataWithSorting.length / itemsPerPage);

    const displayData = filteredDataWithSorting.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    let totals = {};

    displayData.forEach((entry) => {
        for (let key in entry) {
            if (key !== "wilayah" && key !== "bulan") {
                totals[key] =
                    (parseInt(totals[key]) || 0) + parseInt(entry[key]);
            }
        }
    });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        filters,
        setFilters,
        orderData,
        setOrderData,
        currentPage,
        setCurrentPage,
        displayData,
        totalPages,
        handlePageChange,
        totals,
    };
}

export default useFilterTable;
