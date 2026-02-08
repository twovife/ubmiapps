import InputError from '@/Components/InputError';
import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import useOptionGenerator from '@/Hooks/useOptionGenerator';
import SelectComponent from '@/Components/shadcn/SelectComponent';
import RiwayatPengajuan from './Components/RiwayatPengajuan';
import dayjs from 'dayjs';
import Checkbox from '@/Components/Checkbox';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';
import NoEditOverlay from '@/Components/NoEditOverlay';
import RiwayatPengajuanLain from './Components/RiwayatPengajuanLain';
import RiwayatPengajuanNonBranch from '@/Pages/NewLoan/Components/RiwayatPengajuanNonBranch';

const NewNasabah = ({
  onClosed,
  generateAngsuran = false,
  submitUrl,
  typeInput = 'number',
}) => {
  // getLink after generate
  const { printUrl } = usePage().props;
  const { isUnit, isMantri, isCanShowKelompok, isCreator } =
    useFrontEndPermission();

  const [newGenerate, setNewGenerate] = useState(null);

  useEffect(() => {
    setNewGenerate(printUrl.url);
  }, [printUrl.timestamp]);

  const { optKelompok } = useOptionGenerator();
  const { data, setData, post, errors, processing, reset } = useForm({
    isActiveMember: false,
    nik: '',
    request_date: '',
    tanggal_drop: '',
    no_kk: '',
    nama: '',
    alamat: '',
    kelompok: '',
    request_nominal: 0,
    angsuran: [],
  });

  // handlingForAngsuranBatchProssess
  const [elements, setElements] = useState([]);
  const [calculatePinjaman, setCalculatePinjaman] = useState(0);

  useEffect(() => {
    const totalPinjaman = parseInt(data.request_nominal ?? 0) * 1.3;

    const totalAngsuran = data.angsuran.reduce((acc, curr) => {
      const nominal = parseInt(curr.nominal, 10);
      return acc + (isNaN(nominal) ? 0 : nominal);
    }, 0);

    setCalculatePinjaman(totalPinjaman - totalAngsuran);
  }, [data.angsuran, data.request_nominal]);

  useEffect(() => {
    setElements([]);
  }, [data.tanggal_drop]);

  useEffect(() => {
    setData('angsuran', elements);
  }, [elements]);

  const addElement = () => {
    const lastTransactionDate =
      elements.length > 0
        ? dayjs(elements[elements.length - 1].transaction_date)
            .add(1, 'week')
            .format('YYYY-MM-DD')
        : data.tanggal_drop
        ? dayjs(data.tanggal_drop).add(1, 'week').format('YYYY-MM-DD')
        : '';

    setElements([
      ...elements,
      { id: Date.now(), transaction_date: lastTransactionDate },
    ]);
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const onInputElementChange = (id, name, value) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, [name]: value } : element
      )
    );
  };

  const onHandleElementCurencyChange = (value, name, id) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, [name]: value } : element
      )
    );
  };

  // handling pinjaman proses
  const [nik, setNik] = useState('');

  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [mixDate, setMixDate] = useState();

  useEffect(() => {
    setMixDate(data.request_date);
    setData((prevData) => ({
      ...prevData,
      tanggal_drop: dayjs(data.request_date)
        .add(1, 'week')
        .format('YYYY-MM-DD'),
    }));
  }, [data.request_date]);

  const onHandleCurencyChange = (value, name, float) => {
    setData(name, value);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const onNikChange = (e) => {
    const { name, value } = e.target;
    setCustomerData([]);
    setNik(value);
  };

  const controllerRef = useRef(null);

  const onNikSubmit = async (e) => {
    e.preventDefault();

    // Batalkan request sebelumnya kalau masih aktif
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    reset();
    setLoading(true);
    setErorAxios();

    try {
      const { data } = await axios.post(
        route('transaction.nasabah_buku_transaksi'),
        { nik },
        { signal: controller.signal }
      );

      setLoading(false);
      setData((prevData) => ({
        ...prevData,
        nik: data.return_nik,
        isActiveMember: !!data.data,
      }));

      if (data.data) {
        console.log(data.data);
        setCustomerData(data.data);
      } else {
        setCustomerData([]);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request dibatalkan karena ada fetch baru.');
      } else {
        setErorAxios(error.response?.data?.message || 'Terjadi kesalahan.');
        setLoading(false);
      }
    }
  };

  const modalIsClosed = (e) => {
    onClosed();
    reset();
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(submitUrl, {
      onSuccess: () => {
        modalIsClosed();
      },
      replace: true,
    });
  };

  const buttonValue = [
    { value: 300000, label: '300rb' },
    { value: 400000, label: '400rb' },
    { value: 500000, label: '500rb' },
    { value: 700000, label: '700rb' },
    { value: 800000, label: '800rb' },
    { value: 1000000, label: '1 jt' },
    { value: 1300000, label: '1,3 jt' },
    { value: 1500000, label: '1,5 jt' },
    { value: 2000000, label: '2 jt' },
  ];

  const buttonValueClick = (e) => {
    const value = e.target.getAttribute('data-value');
    setData('request_nominal', value);
  };
  // newGenerate
  return (
    <div className="flex flex-col w-full gap-3 lg:flex-row">
      <Loading show={loading || processing} />
      <div className="w-auto">
        <fieldset className="min-w-[20vw] p-4 mb-3 border rounded-lg">
          <legend className="px-1 -ml-1 text-sm font-medium">
            CEK NIK NASABAH
          </legend>
          <form className="w-full mb-3" onSubmit={onNikSubmit}>
            <Label optional>NIK</Label>
            <div className="flex items-center gap-3">
              <Input
                type={typeInput}
                name="nik"
                value={nik}
                onChange={onNikChange}
                placeholder="Cek NIK"
              />
              <Button className="text-xs" size="sm">
                <Search className="w-auto h-4 mr-1" />
                Cari
              </Button>
            </div>
            {erorAxios && <InputError message={erorAxios} className="mt-1" />}
            <div
              className={`font-semibold mt-1 ${
                nik.length == 16 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {nik.length} Digit
            </div>
            <div>
              {newGenerate && (
                <a href={newGenerate ?? '#'} target="_blank">
                  Lihat Transaksi Terakhir
                </a>
              )}
            </div>
          </form>
        </fieldset>
        <div className="relative">
          {nik && data.nik == nik && (
            <fieldset className="w-full p-4 border rounded-lg">
              {!isCreator && (
                <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Menambah Pinjaman" />
              )}
              <legend className="px-1 -ml-1 text-sm font-medium">
                Detail Pinjaman
              </legend>
              <form className="w-full mb-3" onSubmit={onSubmitCreate}>
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex-1">
                    <div className="flex gap-3">
                      <div className="w-full mb-3">
                        <Label>Tanggal Pengajuan</Label>
                        <Input
                          type="date"
                          name="request_date"
                          required={true}
                          value={data.request_date}
                          onChange={onInputChange}
                        />
                        <InputError message={errors.request_date} />
                      </div>
                      <div className="w-full mb-3">
                        <Label>Tanggal Drop</Label>
                        <Input
                          type="date"
                          name="tanggal_drop"
                          min={mixDate}
                          required={true}
                          value={data.tanggal_drop}
                          onChange={onInputChange}
                        />
                        <InputError message={errors.tanggal_drop} />
                      </div>
                    </div>
                    {data.request_date &&
                    data.request_date == data.tanggal_drop ? (
                      <div className="w-full mb-3 font-semibold text-red-500">
                        DROP BARU
                      </div>
                    ) : (
                      <div className="w-full mb-3 font-semibold text-red-500">
                        PENGAJUAN DROP
                      </div>
                    )}
                    <div className="w-full mb-3">
                      <Label optional>NIK</Label>
                      <Input
                        type="text"
                        name="nik"
                        value={data.nik}
                        disabled
                        onChange={onInputChange}
                      />
                      <InputError message={errors.nik} />
                    </div>

                    {!data.isActiveMember ? (
                      <>
                        <div className="w-full mb-3">
                          <Label optional>NO KK</Label>
                          <Input
                            type="text"
                            name="no_kk"
                            value={data.no_kk}
                            onChange={onInputChange}
                          />
                          <InputError message={errors.no_kk} />
                        </div>
                        <div className="w-full mb-3">
                          <Label>Nama</Label>
                          <Input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={onInputChange}
                            required={true}
                          />
                          <InputError message={errors.nama} />
                        </div>
                        <div className="w-full mb-3">
                          <Label>Alamat</Label>
                          <Input
                            type="text"
                            name="alamat"
                            value={data.alamat}
                            onChange={onInputChange}
                            required={true}
                          />
                          <InputError message={errors.alamat} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full mb-3">
                          <Label>Nama</Label>
                          <Input
                            type="text"
                            disabled
                            value={customerData.nama ?? ''}
                          />
                        </div>
                        <div className="w-full mb-3">
                          <Label>Alamat</Label>
                          <Input
                            type="text"
                            disabled
                            value={customerData.alamat ?? ''}
                          />
                        </div>
                      </>
                    )}
                    {isCanShowKelompok && (
                      <div className="w-full mb-3">
                        <Label>Kelompok</Label>
                        <SelectComponent
                          value={data.kelompok}
                          options={optKelompok}
                          name="kelompok"
                          nullvalue={true}
                          onChange={onInputChange}
                        />
                        <InputError message={errors.kelompok} />
                      </div>
                    )}

                    <div className="w-full mb-3">
                      <Label>Nominal Pinjaman</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="request_nominal"
                        defaultValue={0}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.request_nominal}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                      <InputError message={errors.request_nominal} />
                    </div>
                    <div className="grid grid-cols-4 mb-3 gap-x-2 gap-y-1">
                      {buttonValue.map((button, key) => (
                        <Button
                          type="button"
                          size="xs"
                          key={key}
                          data-value={button.value}
                          onClick={buttonValueClick}
                        >
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {elements.length > 0 && (
                    <div className="flex-1">
                      {elements.map((element, key) => (
                        <div
                          key={element.id}
                          className="flex flex-col gap-3 mb-3 lg:flex-row"
                        >
                          <div className="w-full">
                            <Label>Tanggal Storting</Label>
                            <Input
                              type="date"
                              name="transaction_date"
                              min={dayjs(data.tanggal_drop)
                                .add(1, 'week')
                                .format('YYYY-MM-DD')}
                              required={true}
                              value={element.transaction_date}
                              onChange={(e) =>
                                onInputElementChange(
                                  element.id,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-full">
                            <Label>Nominal</Label>
                            <div className="flex items-center justify-start gap-3">
                              <div className="flex-1 min-w-32">
                                <CurrencyInput
                                  className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  name="nominal"
                                  defaultValue={0}
                                  allowDecimals={false}
                                  prefix="Rp. "
                                  min={1}
                                  required
                                  onValueChange={(value, name) =>
                                    onHandleElementCurencyChange(
                                      parseInt(value),
                                      name,
                                      element.id
                                    )
                                  }
                                  value={element.nominal}
                                  placeholder={'Inputkan angka tanpa sparator'}
                                />
                              </div>

                              <div className="flex items-center justify-start gap-1">
                                <Checkbox
                                  name="dana_titipan"
                                  id={`dana_titipan_${element.id}`}
                                  checked={element.isActiveMember}
                                  onChange={(e) =>
                                    onInputElementChange(
                                      element.id,
                                      e.target.name,
                                      e.target.checked
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`dana_titipan_${element.id}`}
                                  className="whitespace-nowrap"
                                  nomb={true}
                                >
                                  Dana Titipan
                                </Label>
                              </div>
                              <Button
                                onClick={() => removeElement(element.id)}
                                type="button"
                                size="iconsm"
                                variant="outline"
                              >
                                <X className="w-auto h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end gap-3 font-semibold text-red-500">
                        <div>Saldo Tersisa</div>
                        <FormatNumbering value={calculatePinjaman} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-end">
                  {generateAngsuran && data.tanggal_drop && (
                    <Button
                      type="button"
                      onClick={addElement}
                      className="mr-3"
                      variant="outline"
                    >
                      Add Angsuran
                    </Button>
                  )}

                  <Button>Submit</Button>
                </div>
              </form>
            </fieldset>
          )}
        </div>
      </div>
      <div className="w-auto lg:w-full">
        <div className="text-xl mb-3 font-semibold">CRASH</div>
        <Tabs defaultValue="pengajuan" className="w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pengajuan">Kantor</TabsTrigger>
            <TabsTrigger value="pinjaman">Kantor Lain (NT)</TabsTrigger>
            <TabsTrigger value="pinjaman2">Kantor Lain (T)</TabsTrigger>
          </TabsList>
          <TabsContent value="pengajuan">
            <div className="overflow-auto shadow-sm scrollbar-thin h-max">
              <RiwayatPengajuan data={customerData?.history_branch} />
            </div>
          </TabsContent>
          <TabsContent value="pinjaman">
            <div className="overflow-auto shadow-sm scrollbar-thin h-max">
              <RiwayatPengajuan data={customerData?.history_macet_lain} />
            </div>
          </TabsContent>
          <TabsContent value="pinjaman2">
            <div className="overflow-auto shadow-sm scrollbar-thin h-max">
              <RiwayatPengajuan data={customerData?.history_target} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewNasabah;
