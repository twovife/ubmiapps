import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const NewCustomer = ({
    status,
    setLoading,
    max_date,
    min_date,
    emps,
    customer_id,
    nik,
    url = route("transaction.store"),
}) => {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        no_kk: "",
        alamat: "",
        nik: nik,
        tanggal_drop: "",
        mantri: "",
        pinjaman: "",
        type_create: "2",
        danatitipan_1: false,
        tanggal_angsuran_1: "",
        status_angsuran_: "",
    });
    const [inputColumns, setInputColumns] = useState([{ id: 1 }]);


    const addInputColumn = () => {
        const newId = inputColumns[inputColumns.length - 1].id + 1;
        setInputColumns([...inputColumns, { id: newId }]);
        setData({
            ...data,
            [`tanggal_angsuran_${newId}`]: dayjs(data.tanggal_drop)
                .add(newId, "week")
                .format("YYYY-MM-DD"),
        });
    };

    const removeInputColumn = (id) => {
        const filteredColumns = inputColumns.filter(
            (column) => column.id !== id
        );
        setInputColumns(filteredColumns);

        const updatedData = { ...data };
        delete updatedData[`tanggal_angsuran_${id}`];
        delete updatedData[`angsuran_${id}`];
        setData(updatedData);
    };

    const onTanggalDropChange = (e) => {
        const { name, value } = e.target;
        const manipulateData = { ...data };
        Object.keys(manipulateData).forEach((element) => {
            if (
                element.includes("angsuran") ||
                element.includes("danatitipan")
            ) {
                delete manipulateData[element];
            }
        });
        setInputColumns([{ id: 1 }, { id: 2 }, { id: 3 }]);
        const newData = {
            ...manipulateData,
            [name]: value,
            tanggal_angsuran_1: dayjs(value)
                .add(1, "week")
                .format("YYYY-MM-DD"),
            tanggal_angsuran_2: dayjs(value)
                .add(2, "week")
                .format("YYYY-MM-DD"),
            tanggal_angsuran_3: dayjs(value)
                .add(3, "week")
                .format("YYYY-MM-DD"),
        };
        setData(newData);
    };
    const handleOnChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };
    const onSubmitCreate = (e) => {
        e.preventDefault();
        post(url);
        setLoading(processing);
    };
    return (
        <form className="flex-1" onSubmit={onSubmitCreate}>
            <div className="text-lg font-semibold">
                Permintaan Pinjaman Baru (Nasabah Lama)
            </div>
            <div className="p-4">
                <div className="mb-1">
                    <InputLabel
                        optional
                        htmlFor="no_kk"
                        value="No KK Customer"
                    />

                    <TextInput
                        id="no_kk"
                        type="text"
                        name="no_kk"
                        required={false}
                        value={data.no_kk}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.no_kk} className="mt-2" />
                </div>
                <div className="mb-1">
                    <InputLabel htmlFor="nama" value="Nama Customer" />

                    <TextInput
                        id="nama"
                        type="text"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>
                <div className="mb-1">
                    <InputLabel htmlFor="alamat" value="Alamat Customer" />

                    <TextInput
                        id="alamat"
                        type="text"
                        name="alamat"
                        value={data.alamat}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                <div className="mb-1">
                    <InputLabel htmlFor="tanggal_drop" value="Tanggal Drop" />

                    <TextInput
                        id="tanggal_drop"
                        type="date"
                        name="tanggal_drop"
                        min={min_date}
                        value={data.tanggal_drop}
                        className="mt-1 block w-full"
                        onChange={onTanggalDropChange}
                    />

                    <InputError
                        message={errors.tanggal_drop}
                        className="mt-2"
                    />
                </div>
                <div className="flex w-full gap-2 mb-1">
                    <div className="flex-1">
                        <InputLabel htmlFor="nik" value="NIK Customer" />

                        <TextInput
                            id="nik"
                            type="text"
                            name="nik"
                            value={data.nik}
                            className="mt-1 block w-full"
                            readOnly={true}
                            onChange={handleOnChange}
                        />

                        <InputError message={errors.nik} className="mt-2" />
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="mantri" value="Mantri" />

                        <SelectList
                            id="mantri"
                            type="text"
                            name="mantri"
                            options={emps}
                            nullValue={true}
                            value={data.mantri}
                            className="mt-1 block w-full"
                            onChange={handleOnChange}
                        />

                        <InputError message={errors.mantri} className="mt-2" />
                    </div>
                </div>

                <div className="mb-1">
                    <InputLabel
                        htmlFor="pinjaman"
                        value={"Nominal Pinjaman"}
                        className="mb-1"
                    />
                    <CurrencyInput
                        name="pinjaman"
                        id="pinjaman"
                        className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10 block w-full text-sm mt-2`}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.pinjaman}
                        placeholder={"Inputkan angka tanpa sparator"}
                    />
                    <InputError message={errors.pinjaman} className="mt-2" />
                </div>

                <div className="mt-3 mb-3 font-semibold underline">
                    Input Angsuran
                </div>
                {inputColumns.map((column, index) => (
                    <div className="flex w-full gap-2 mb-1" key={column.id}>
                        <div className="flex-1">
                            <InputLabel
                                htmlFor={`tanggal_angsuran_${column.id}`}
                                value="Tanggal Angsuran"
                            />

                            <TextInput
                                id={`tanggal_angsuran_${column.id}`}
                                type="date"
                                name={`tanggal_angsuran_${column.id}`}
                                value={data[`tanggal_angsuran_${column.id}`]}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError
                                message={
                                    errors[`tanggal_angsuran_${column.id}`]
                                }
                                className="mt-2"
                            />
                        </div>

                        <div className="flex-[1.5]">
                            <InputLabel
                                htmlFor={`angsuran_${column.id}`}
                                value={"Nominal Angsuran"}
                                className="mb-1"
                            />

                            <div className="flex gap-2 justify-center items-center">
                                <CurrencyInput
                                    name={`angsuran_${column.id}`}
                                    id={`angsuran_${column.id}`}
                                    className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10 block w-full`}
                                    allowDecimals={false}
                                    prefix="Rp. "
                                    min={1}
                                    required
                                    onValueChange={onHandleCurencyChange}
                                    value={data[`angsuran_${column.id}`]}
                                    placeholder={
                                        "Inputkan angka tanpa sparator"
                                    }
                                />
                                <div className="block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name={`danatitipan_${column.id}`}
                                            value={
                                                data[`danatitipan_${column.id}`]
                                            }
                                            onChange={handleOnChange}
                                        />
                                        <span className="ml-2 text-xs text-gray-600">
                                            titipan
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    {index >= 0 && (
                                        <PrimaryButton
                                            color="red"
                                            type="button"
                                            className="block"
                                            onClick={() =>
                                                removeInputColumn(column.id)
                                            }
                                        >
                                            X
                                        </PrimaryButton>
                                    )}
                                </div>
                            </div>
                            <InputError
                                message={errors[`angsuran_${index}`]}
                                className="mt-2"
                            />
                        </div>
                    </div>
                ))}
                <PrimaryButton
                    type="button"
                    onClick={addInputColumn}
                    title={"Add"}
                />
                <div className="block mt-4">
                    <PrimaryButton
                        type="submit"
                        title={"Submit"}
                        color="green"
                    />
                </div>
            </div>
        </form>
    );
};

export default NewCustomer;
