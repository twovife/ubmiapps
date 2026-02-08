import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import { Input } from '@/shadcn/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import { useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { flattenBy } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { parse } from 'postcss';
import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const Approval = ({
  show = false,
  onClosed,
  triggeredDate,
  staticData,
  datas,
}) => {
  const { data, setData, post, reset, errors, processing } = useForm({
    id: '',
    date: '',
    masuk: '',
    keluar: '',
    target: '',
    baru: '',
    lama: '',
    storting: '',
    drop: '',
    rencana: '',
    tanggal_rencana_minggu_depan: '',
    rencana_minggu_depan: '',
    target_minggu_depan: '',
  });
  const [triggeredData, setTriggeredData] = useState([]);
  const [tanggalRencanaMingguDepan, setTanggalRencanaMingguDepan] = useState();

  const [transaksiOpenHariIni, setTransaksiOpenHariIni] = useState([]);
  const [transaksiOpenMingguDepan, setTransaksiOpenMingguDepan] = useState([]);
  const [transaksiHariIni, setTransaksiHariIni] = useState({
    drop_hari_ini: 0,
    drop_jadi: 0,
    gagal: 0,
    open1: 0,

    pengajuan: 0,
    acc: 0,
    tolak: 0,
    open2: 0,
  });

  const [erorRequest, setErorRequest] = useState(false);
  useEffect(() => {
    const flaatenData = staticData?.flat(2) ?? [];

    const getSelecterDateRencanaDropData = datas?.filter(
      (item) => item.tanggal === triggeredDate
    );

    const getIsGenerateRencanaDropMingguDepan = datas?.filter(
      (item) => item.tanggal > triggeredDate && item.is_generated === true
    )[0];

    const triggeredData = Object.assign({}, getSelecterDateRencanaDropData[0]);
    setTriggeredData(triggeredData);

    if (triggeredData) {
      const filteredData = flaatenData.filter((item) => {
        return item.request_date === triggeredData.tanggal;
      });

      const filterCount = (array, condition) => array.filter(condition).length;

      const drop_today = filterCount(
        flaatenData,
        (item) =>
          item.tanggal_drop === triggeredData.tanggal && item.status !== 'tolak'
      );

      const drop_jadi = filterCount(
        flaatenData,
        (item) =>
          item.tanggal_drop === triggeredData.tanggal &&
          item.status === 'success'
      );

      const drop_gagal = filterCount(
        flaatenData,
        (item) =>
          item.tanggal_drop === triggeredData.tanggal && item.status === 'gagal'
      );

      const open1 = filterCount(
        flaatenData,
        (item) =>
          item.tanggal_drop === triggeredData.tanggal &&
          item.status !== 'gagal' &&
          item.status !== 'success' &&
          item.status !== 'tolak'
      );

      const pengajuan = filterCount(
        filteredData,
        (item) => item.tanggal_drop !== item.request_date
      );

      const acc = filterCount(
        filteredData,
        (item) =>
          item.tanggal_drop !== item.request_date && item.status === 'acc'
      );

      const tolak = filterCount(
        filteredData,
        (item) =>
          item.tanggal_drop !== item.request_date && item.status === 'tolak'
      );

      const open2 = filterCount(
        filteredData,
        (item) =>
          item.tanggal_drop !== item.request_date && item.status === 'open'
      );

      setTransaksiHariIni((prevSet) => ({
        ...prevSet,
        drop_hari_ini: drop_today,
        drop_jadi: drop_jadi,
        gagal: drop_gagal,
        open1: open1,
        pengajuan: pengajuan,
        acc: acc,
        tolak: tolak,
        open2: open2,
      }));

      const transaksiOpenToday = flaatenData.filter((item) => {
        return (
          item.tanggal_drop === triggeredData.tanggal &&
          (item.status == 'open' || item.status == 'acc')
        );
      });

      const transaksiOpenNextDay = flaatenData.filter((item) => {
        return (
          item.request_date === triggeredData.tanggal && item.status == 'open'
        );
      });

      setTransaksiOpenHariIni(transaksiOpenToday);
      setTransaksiOpenMingguDepan(transaksiOpenNextDay);

      let uniqueDropDatesString = null;
      let rencana = 0;

      if (filteredData.length > 0) {
        const dropDepan = filteredData.filter((item) => {
          return item.tanggal_drop !== item.request_date;
        });

        // Cari nilai unik dari tanggal_drop
        const uniqueDropDates = [
          ...new Set(dropDepan?.map((item) => item.tanggal_drop)),
        ];

        // Ambil elemen pertama dari nilai unik tanggal_drop
        uniqueDropDatesString = uniqueDropDates[0];

        // Filter data berdasarkan tanggal_drop yang sama dengan elemen pertama dari nilai unik
        const filteredData2 = filteredData.filter((item) => {
          return item.tanggal_drop === uniqueDropDatesString;
        });

        // Hitung jumlah acc dari filteredData2
        rencana = filteredData2.reduce((a, item) => {
          return a + item.acc;
        }, 0);
      }

      setData({
        id: triggeredData.grouping_id,
        date: triggeredData.tanggal,
        target: triggeredData.target,
        masuk:
          triggeredData.drop !== 0 && triggeredData.masuk == 0
            ? triggeredData.drop * 0.13
            : triggeredData.masuk,
        keluar: triggeredData.keluar,
        baru: triggeredData.baru,
        lama: triggeredData.lama,
        storting: triggeredData.storting,
        drop: triggeredData.drop,
        rencana: triggeredData.rencana,

        tanggal_rencana_minggu_depan: getIsGenerateRencanaDropMingguDepan
          ? getIsGenerateRencanaDropMingguDepan.tanggal
          : uniqueDropDatesString ?? null,
        rencana_minggu_depan: rencana ?? 0,
        target_minggu_depan: 0,
      });

      setTanggalRencanaMingguDepan(
        getIsGenerateRencanaDropMingguDepan
          ? getIsGenerateRencanaDropMingguDepan.tanggal
          : uniqueDropDatesString ?? null
      );
    }
  }, [datas, show, triggeredDate]);

  useEffect(() => {
    setData(
      'target_minggu_depan',
      parseInt(data.target) + (parseInt(data.masuk) - parseInt(data.keluar))
    );
  }, [data.target, data.masuk, data.keluar]);

  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    setData(
      e.target.name,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    );
  };

  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };

  const closedModal = () => {
    onClosed();
    reset();
    setErorRequest(false);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    post(route('kasir.rekap.ceklist_kepala'), {
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : closedModal())}>
      <Loading show={loading || processing} />
      <DialogContent className="w-[90vw] h-[90vh] lg:h-auto lg:max-w-xl overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Cek Transaksi & Input Rencana Drop</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div>Data Sedang Dimuat</div>
        ) : (
          <div>
            {triggeredData && (
              <div>
                <div className="mb-1 font-semibold underline">
                  Total Transaksi Hari Ini
                </div>
                <Table className="mb-3 border shadow-sm">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-center">Target</TableHead>
                      <TableHead className="text-center">Drop</TableHead>
                      <TableHead className="text-center">Storting</TableHead>
                      <TableHead className="text-center">Baru</TableHead>
                      <TableHead className="text-center">Lama</TableHead>
                      <TableHead className="text-center">Rencana</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={data.target}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={triggeredData.drop}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={triggeredData.storting}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={triggeredData.baru}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={triggeredData.lama}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={triggeredData.rencana}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table className="mb-3 border shadow-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center bg-green-200">
                        Total Drop
                      </TableHead>
                      <TableHead className="text-center bg-green-200">
                        Success
                      </TableHead>
                      <TableHead className="text-center bg-green-200">
                        Gagal
                      </TableHead>
                      <TableHead className="text-center bg-green-200">
                        Open
                      </TableHead>
                      <TableHead className="text-center bg-red-200">
                        Pengajuan
                      </TableHead>
                      <TableHead className="text-center bg-red-200">
                        Acc
                      </TableHead>
                      <TableHead className="text-center bg-red-200">
                        Tolak
                      </TableHead>
                      <TableHead className="text-center bg-red-200">
                        Open
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.drop_hari_ini}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.drop_jadi}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.gagal}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.open1}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.pengajuan}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.acc}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.tolak}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering
                          className="text-center"
                          value={transaksiHariIni.open2}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
            {transaksiOpenHariIni.length > 0 && (
              <>
                <div className="mb-1 font-semibold underline">
                  Proses Terlebih Dahulu Transaksi Dibawah Ini
                </div>
                <div className="flex p-1.5 bg-gray-300">
                  <div className="flex-1">Nasabah</div>
                  <div className="flex-1">Status</div>
                </div>
                <div className="mb-3">
                  {transaksiOpenHariIni.map((item, index) => (
                    <div key={index} className="flex p-1.5 even:bg-gray-100">
                      <div className="flex-1">{item.nama}</div>
                      <div className="flex-1">{item.status}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {transaksiOpenMingguDepan.length > 0 && (
              <>
                <div className="mb-1 font-semibold underline">
                  Proses Terlebih Dahulu Pengajuan Dibawah Ini
                </div>
                <div className="flex p-1.5 bg-gray-300">
                  <div className="flex-1">Nasabah</div>
                  <div className="flex-1">Status</div>
                  <div className="flex-1">Tgl Drop</div>
                </div>
                <div className="mb-3">
                  {transaksiOpenMingguDepan.map((item, index) => (
                    <div key={index} className="flex p-1.5 even:bg-gray-100">
                      <div className="flex-1">{item.nama}</div>
                      <div className="flex-1">{item.status}</div>
                      <div className="flex-1">
                        {dayjs(item.tanggal_drop).format('DD-MM-YYYY')}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {transaksiOpenHariIni.length == 0 &&
              transaksiOpenMingguDepan.length == 0 && (
                <form onSubmit={onSubmitForm}>
                  <div className="max-h-[60vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
                    {!triggeredData?.target && (
                      <div className="mb-3">
                        <Label htmlFor="target">Target</Label>

                        <CurrencyInput
                          className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          name="target"
                          readOnly={data.status_dayly_approval}
                          allowDecimals={false}
                          prefix="Rp. "
                          min={1}
                          required
                          onValueChange={onHandleCurencyChange}
                          value={data.target}
                          placeholder={'Inputkan angka tanpa sparator'}
                        />
                      </div>
                    )}
                    <br />
                    <p className="mb-1 italic font-thin text-gray-500">
                      Sebelum Ceklist, Diharapkan Semua Storting, Rencana,
                      target dan drop sudah sesuai, tidak diperbolehkan ada
                      transaksi yang masih Open
                    </p>
                    <div className="mb-3">
                      <Label htmlFor="masuk">Masuk</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="masuk"
                        readOnly={data.status_dayly_approval}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.masuk}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="keluar">Keluar</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="keluar"
                        readOnly={data.status_dayly_approval}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.keluar}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>

                    <p className="mb-3 font-semibold underline">
                      Transaksi Minggu Depan
                    </p>
                    <div className="mb-3">
                      <Label htmlFor="tanggal_minggu_depan">
                        Tanggal Rencana Drop Minggu Depan
                      </Label>
                      <Input
                        name="tanggal_rencana_minggu_depan"
                        readOnly={tanggalRencanaMingguDepan}
                        min={dayjs(data.date)
                          .add('1', 'week')
                          .format('YYYY-MM-DD')}
                        required
                        onChange={onInputChange}
                        type="date"
                        value={data.tanggal_rencana_minggu_depan}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                      {data.tanggal_rencana_minggu_depan == null && (
                        <small className="text-red-500 ">
                          Tidak Ada Pengajuan Untuk Minggu Depan, Isikan Tanggal
                          Secara Manual
                        </small>
                      )}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="rencana_minggu_depan">
                        Rencana Drop Minggu Depan
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="rencana_minggu_depan"
                        allowDecimals={false}
                        readOnly={data.status_dayly_approval}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.rencana_minggu_depan}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="target_minggu_depan">
                        Target Minggu Depan
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="target_minggu_depan"
                        allowDecimals={false}
                        readOnly={data.status_dayly_approval}
                        prefix="Rp. "
                        min={1}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={
                          parseInt(data.target) +
                          (parseInt(data.masuk) - parseInt(data.keluar))
                        }
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="flex items-center justify-start flex-1 gap-3 mb-1 whitespace-nowrap">
                      <Checkbox
                        readOnly={data.status_dayly_approval}
                        placeholder="Select Permission"
                        id="daily_kepala_approval"
                        required
                      />
                      <InputLabel htmlFor="daily_kepala_approval">
                        Konfirmasi Jika Sudah Benar Semua
                      </InputLabel>
                    </div>
                  </div>
                  <div className="mb-3 text-right">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Approval;
