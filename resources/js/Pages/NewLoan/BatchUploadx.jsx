import InputError from '@/Components/InputError';
import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import useOptionGenerator from '@/Hooks/useOptionGenerator';
import SelectComponent from '@/Components/shadcn/SelectComponent';
import dayjs from 'dayjs';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';
import RiwayatPengajuan from './Components/RiwayatPengajuan';

const BatchUploadx = () => {
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
    request_nominal: '',
    angsuran: [],
  });

  const [elements, setElements] = useState([]);

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

  const [nik, setNik] = useState('');

  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [mixDate, setMixDate] = useState();

  useEffect(() => {
    setMixDate(data.request_date);
    setData((prevData) => ({
      ...prevData,
      tanggal_drop: data.request_date
        ? dayjs(data.request_date).add(1, 'week').format('YYYY-MM-DD')
        : '',
    }));
  }, [data.request_date]);

  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const onNikChange = (e) => {
    const { name, value } = e.target;
    setNik(value);
    setCustomerData([]);
  };

  const onNikSubmit = async (e) => {
    e.preventDefault();
    reset();
    setLoading(true);
    setErorAxios();
    await axios({
      method: 'post',
      url: route('transaction.nasabah_buku_transaksi'),
      data: {
        nik: nik,
      },
    })
      .then(function ({ data }) {
        setLoading(false);

        setData((prevData) => ({
          ...prevData,
          nik: data.return_nik,
          isActiveMember: data.data ? true : false,
        }));
        if (data.data) {
          setCustomerData(data.data);
        } else {
          setCustomerData([]);
        }
      })
      .catch(function ({ response }) {
        setErorAxios(response.data.message);
        setLoading(false);
      });
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(route('transaction.store_buku_transaksi_batch'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  const buttonValueClick = (e) => {
    const value = e.target.getAttribute('data-value');
    setData('request_nominal', value);
  };

  return (
    <Authenticated>
      <Loading show={loading || processing} />
      <div className="flex flex-col w-full gap-3 lg:flex-row">
        <div className="w-auto">
          <fieldset className="w-full p-4 mb-3 border rounded-lg">
            <legend className="px-1 -ml-1 text-sm font-medium">
              Cari Nasabah
            </legend>
            <form className="w-full mb-3" onSubmit={onNikSubmit}>
              <Label optional>NIK</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="text"
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
            </form>
          </fieldset>
          {nik && data.nik == nik && (
            <fieldset className="w-full p-4 border rounded-lg">
              <legend className="px-1 -ml-1 text-sm font-medium">
                Detail Pinjaman
              </legend>
              <form className="w-full mb-3" onSubmit={onSubmitCreate}>
                <div className="flex gap-5">
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
                        <InputError value={errors.request_date} />
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
                        <InputError value={errors.tanggal_drop} />
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
                      <InputError value={errors.nik} />
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
                          <InputError value={errors.no_kk} />
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
                          <InputError value={errors.nama} />
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
                          <InputError value={errors.alamat} />
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

                    <div className="w-full mb-3">
                      <Label>Kelompok</Label>
                      <SelectComponent
                        value={data.kelompok}
                        options={optKelompok}
                        name="kelompok"
                        nullvalue={true}
                        onChange={onInputChange}
                        required={true}
                      />
                      <InputError value={errors.kelompok} />
                    </div>
                    <div className="w-full mb-3">
                      <Label>Nominal Pinjaman</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="request_nominal"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.request_nominal}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                      <InputError value={errors.request_nominal} />
                    </div>
                    <div className="flex flex-wrap w-full gap-2 mb-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={buttonValueClick}
                        data-value="500000"
                      >
                        500.000
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={buttonValueClick}
                        data-value="700000"
                      >
                        700.000
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={buttonValueClick}
                        data-value="1000000"
                      >
                        1.000.000
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="xs"
                        onClick={buttonValueClick}
                        data-value="0"
                      >
                        reset
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    {elements.map((element, key) => (
                      <div key={element.id} className="flex gap-3 mb-3">
                        <div className="w-full">
                          <Label>Tanggal Storting</Label>
                          <Input
                            type="date"
                            name="transaction_date"
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
                            <div className="min-w-32">
                              <CurrencyInput
                                className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                name="nominal"
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

                            <div className="flex items-center justify-start gap-3">
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
                  </div>
                </div>

                <div className="text-end">
                  {data.tanggal_drop && (
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
        <div className="w-auto lg:w-3/4">
          <Tabs defaultValue="pengajuan" className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pengajuan">Riwayat Pinjaman</TabsTrigger>
              <TabsTrigger value="pinjaman">Ringkasan Pinjaman</TabsTrigger>
            </TabsList>
            <TabsContent value="pengajuan">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Unit</CardTitle>
                  <CardDescription>
                    Riwayat Pengajuan Nasabah sesuai dengan nik di satu unit
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-[50vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
                    <RiwayatPengajuan data={customerData?.history_branch} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pinjaman">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Lain</CardTitle>
                  <CardDescription>
                    Riwayat Pengajuan Nasabah sesuai dengan nik di unit selain
                    unit ini
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-[50vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
                    <RiwayatPengajuan data={customerData?.history_lain} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Authenticated>
  );
};

export default BatchUploadx;
