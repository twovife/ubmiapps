import React, { useState, useEffect, useRef } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Input } from '@/shadcn/ui/input';
import InputLabel from '@/Components/InputLabel';
import dayjs from 'dayjs';
import { Button } from '@/shadcn/ui/button';
import { Search, SearchCheck } from 'lucide-react';
import Loading from '@/Components/Loading';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';
import { Label } from '@/shadcn/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import SelectComponent from '@/Components/shadcn/SelectComponent';
import useOptionGenerator from '@/Hooks/useOptionGenerator';
import Checkbox from '@/Components/Checkbox';
import { Separator } from '@/shadcn/ui/separator';
import RiwayatPengajuan from '@/Pages/NewLoan/Components/RiwayatPengajuan';
import LinkButton from '@/Components/LinkButton';

const FastCreateV2 = () => {
  const initialMonth =
    localStorage.getItem('currentMonth') || dayjs().format('YYYY-MM');
  const initialKelompok = localStorage.getItem('currentKelompok') || 1;

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentKelompok, setCurrentKelompok] = useState(initialKelompok);

  useEffect(() => {
    localStorage.setItem('currentMonth', currentMonth);
    localStorage.setItem('currentKelompok', currentKelompok);
  }, [currentMonth, currentKelompok]);

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
    tanggal_drop: '',
    no_kk: '',
    nama: '',
    alamat: '',
    kelompok: currentKelompok || '',
    request_nominal: 0,
    angsuran: [],
  });

  const [calculatePinjaman, setCalculatePinjaman] = useState(0);

  useEffect(() => {
    const totalPinjaman = parseInt(data.request_nominal ?? 0) * 1.3;

    const totalAngsuran = data.angsuran.reduce((acc, curr) => {
      const nominal = parseInt(curr.nominal, 10);
      return acc + (isNaN(nominal) ? 0 : nominal);
    }, 0);

    setCalculatePinjaman(totalPinjaman - totalAngsuran);
  }, [data.angsuran, data.request_nominal]);

  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [angsuran, setAngsuran] = useState([]);
  const [isSaldoAkhir, setIsSaldoAkhir] = useState(false);

  const generateAngsuranField = (value) => {
    const tanggalDrop = dayjs(value);
    const awalDrop = tanggalDrop.add(1, 'week').format('YYYY-MM-DD');
    const endDate = dayjs().format('YYYY-MM-DD');

    let date = dayjs(currentMonth);

    const isExistSaldoAkhir =
      awalDrop < date.startOf('month').format('YYYY-MM-DD');
    setIsSaldoAkhir(isExistSaldoAkhir);

    let tempDates = new Set();

    if (isExistSaldoAkhir) {
      tempDates.add({
        id: 1,
        transaction_date: awalDrop,
        nominal: 0,
      });
    }

    while (date.isBefore(endDate)) {
      const formattedDate = date.format('YYYY-MM-DD');
      if (date.day() === tanggalDrop.day() && date.isAfter(tanggalDrop)) {
        tempDates.add({
          id: date.unix(),
          transaction_date: formattedDate,
          nominal: 0,
        });
      }
      date = date.add(1, 'day');
    }

    let uniqueDates = [...tempDates];

    setAngsuran(uniqueDates);
  };

  const onHandleCurencyChange = (value, name, prams) => {
    setData(name, value);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
    if (name == 'kelompok') {
      setCurrentKelompok(value);
    }

    if (name == 'tanggal_drop') {
      generateAngsuranField(value);
    }
  };

  useEffect(() => {
    setData('angsuran', angsuran);
  }, [angsuran]);

  const onNikChange = (e) => {
    const { name, value } = e.target;
    setCustomerData([]);
    reset();
    setData('kelompok', currentKelompok);

    setAngsuran([]);
    setIsSaldoAkhir(false);
    setNik(value);
  };

  const onInputElementChange = (id, name, value) => {
    setAngsuran(
      angsuran.map((element) =>
        element.id === id ? { ...element, [name]: value } : element
      )
    );
  };

  const onHandleElementCurencyChange = (value, name, id) => {
    setAngsuran(
      angsuran.map((element) =>
        element.id === id ? { ...element, [name]: value } : element
      )
    );
  };

  const controllerRef = useRef();

  const onNikSubmit = async (e) => {
    e.preventDefault();

    // Cancel request sebelumnya kalau masih jalan
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    reset();
    setData('kelompok', currentKelompok);
    setAngsuran([]);
    setIsSaldoAkhir(false);
    setLoading(true);
    setErorAxios();

    try {
      const { data } = await axios.post(
        route('transaction.nasabah_buku_transaksi'),
        { nik },
        { signal: controller.signal }
      );

      setLoading(false);
      setData((prev) => ({
        ...prev,
        nik: data.return_nik,
        isActiveMember: !!data.data,
      }));
      setCustomerData(data.data ?? []);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request dibatalkan (race condition prevented)');
      } else {
        setErorAxios(error.response?.data?.message || 'Terjadi kesalahan');
        setLoading(false);
      }
    }
  };

  const buttonValue = [
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

  const onSaldoAkhirChange = (value) => {
    const angsuran = data?.request_nominal * 1.3 - value;
    setAngsuran((prevAngs) =>
      prevAngs.some((item) => item.id === 1)
        ? prevAngs.map((item) =>
            item.id === 1 ? { ...item, nominal: angsuran } : item
          )
        : [
            {
              id: 1,
              transaction_date: dayjs(data.tanggal_drop)
                .add(1, 'week')
                .format('YYYY-MM-DD'),
            },
            ...prevAngs,
          ]
    );
  };

  const modalIsClosed = (e) => {
    reset();
    setData('kelompok', currentKelompok);
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();

    post(route('transaction.store_buku_transaksi_batch'), {
      onSuccess: () => {
        modalIsClosed();
      },
      replace: true,
    });
  };

  return (
    <Authenticated>
      <div className="absolute z-20 right-2 bottom-2">
        <LinkButton
          color="outline"
          href={route('transaction.fastcreate')}
          variant="ghost"
        >
          V1
        </LinkButton>
      </div>

      <Loading show={loading} />
      <div className="w-full gap-3 lg:flex">
        <div
          className={`w-auto min-w-[20vw] ${
            data.request_nominal > 0 ? 'lg:w-1/2' : 'lg:w-auto'
          }`}
        >
          <div className="mb-3">
            <InputLabel value="Tanggal Awal" className="mb-1" />
            <Input
              type="month"
              value={currentMonth}
              max={dayjs().format('YYYY-MM')}
              onChange={(e) => setCurrentMonth(e.target.value)}
            />
          </div>
          <form className="mb-1" onSubmit={onNikSubmit}>
            <InputLabel value="NIK" className="mb-1" />
            <div className="flex gap-3">
              <Input type="text" onChange={onNikChange} />
              <Button variant="destructiveoutline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>
          {erorAxios && <InputError message={erorAxios} className="mt-1" />}
          <div
            className={`font-semibold mb-3 ${
              nik.length == 16 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {nik.length} Digit
          </div>

          <form className="relative" onSubmit={onSubmitCreate}>
            <div className="flex flex-col w-full gap-3 lg:flex-row">
              {nik && data.nik == nik && (
                <fieldset className="flex-1 p-4 border rounded-lg">
                  {/* {!isCreator && (
                  <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Menambah Pinjaman" />
                )} */}

                  <legend className="px-1 -ml-1 text-sm font-medium">
                    Detail Pinjaman
                  </legend>
                  <div className="w-full mb-3">
                    <div className="flex flex-col gap-5 lg:flex-row">
                      <div className="flex-1">
                        <div className="flex gap-3">
                          <div className="w-full mb-3">
                            <Label>Tanggal Drop</Label>
                            <Input
                              type="date"
                              name="tanggal_drop"
                              required={true}
                              value={data.tanggal_drop}
                              onChange={onInputChange}
                            />
                            <InputError message={errors.tanggal_drop} />
                            <div className="mt-1 font-semibold text-green-500">
                              {dayjs(data.tanggal_drop).format('dddd')}
                            </div>
                          </div>
                        </div>

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
                    </div>
                  </div>
                </fieldset>
              )}
              {data.request_nominal > 0 && (
                <fieldset className="flex-1 p-4 border rounded-lg">
                  <legend className="px-1 -ml-1 text-sm font-medium">
                    Detail Angsuran
                  </legend>
                  {dayjs(data.tanggal_drop) && isSaldoAkhir && (
                    <div>
                      <div className="mb-3">
                        <Label>
                          Saldo Akhir{' '}
                          {dayjs(currentMonth)
                            .subtract(1, 'month')
                            .format('MMMM')}
                        </Label>
                        <CurrencyInput
                          className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          name="nominal"
                          defaultValue={data.request_nominal * 1.3}
                          allowDecimals={false}
                          prefix="Rp. "
                          min={1}
                          max={calculatePinjaman}
                          required
                          onValueChange={(value, name) =>
                            onSaldoAkhirChange(value, name, 1)
                          }
                          placeholder={'Inputkan angka tanpa sparator'}
                        />
                      </div>
                    </div>
                  )}
                  <Separator className="my-3" />
                  {dayjs(data.tanggal_drop) &&
                    angsuran.length > 0 &&
                    angsuran.map((element, key) => (
                      <>
                        <div
                          key={element.id}
                          className="flex flex-col gap-3 mb-3 lg:flex-row "
                        >
                          <div className="w-full">
                            <Label>Tanggal Storting</Label>
                            <Input
                              type="date"
                              readOnly
                              name="transaction_date"
                              required={true}
                              value={element.transaction_date}
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
                                  max={calculatePinjaman}
                                  required
                                  readOnly={isSaldoAkhir && key == 0}
                                  onValueChange={(value, name) =>
                                    onHandleElementCurencyChange(
                                      value,
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
                            </div>
                          </div>
                        </div>
                        <Separator className="my-3 bg-red-500" />
                      </>
                    ))}

                  <div className="mb-3">
                    <Label className="mb-1">Sisa Saldo</Label>
                    {/* calculatePinjaman */}
                    <CurrencyInput
                      className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      name="request_nominal"
                      defaultValue={0}
                      allowDecimals={false}
                      prefix="Rp. "
                      min={1}
                      value={calculatePinjaman}
                      disabled
                      placeholder={'Inputkan angka tanpa sparator'}
                    />
                  </div>
                </fieldset>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                {newGenerate && (
                  <a href={newGenerate ?? '#'} target="_blank">
                    Lihat Transaksi Terakhir
                  </a>
                )}
              </div>
              <div>{data.request_nominal > 0 && <Button>Submit</Button>}</div>
            </div>
          </form>
        </div>
        <div
          className={`w-auto  ${
            data.request_nominal > 0 ? 'lg:w-1/2' : 'lg:w-full'
          }`}
        >
          <div>Crash</div>
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
    </Authenticated>
  );
};

export default FastCreateV2;
