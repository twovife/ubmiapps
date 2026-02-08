import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import React, { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { useForm, usePage } from '@inertiajs/react';
import { Label } from '@/shadcn/ui/label';
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@/shadcn/ui/button';
import Loading from '@/Components/Loading';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';

const ApprovalAkhir = ({ datas, show = false, onClosed }) => {
  const {
    sirkulasi,
    server_filter: { month, hari, groupId },
  } = usePage().props;

  const { data, setData, post, reset, processing, errors, transform } = useForm(
    {
      ml_amount: '',
      mb_amount: '',
      cm_amount: '',
      amount: '',

      amount_next: '',
      cm_next: '',
      mb_next: '',
      ml_next: '',
    }
  );

  useEffect(() => {
    // const calculateTotals = datas.reduce(
    //   (acc, item) => acc + parseInt(item[saldo] ?? 0),
    //   0
    // );
    const sumAllSaldo = (data) => {
      return Object.values(data).reduce((total, { saldo }) => total + saldo, 0);
    };
    let totalSaldo = 0;

    if (datas) {
      totalSaldo = sumAllSaldo(datas);
    }

    setData({
      month: month,
      hari: hari,
      transaction_loan_officer_grouping_id: groupId,
      ml_amount: sirkulasi?.ml_amount ?? 0,
      mb_amount: sirkulasi?.mb_amount ?? 0,
      cm_amount: sirkulasi?.cm_amount ?? 0,
      calon_cm_amount: datas?.ccm?.sirkulasi ?? 0,
      normal: (datas?.n1?.sirkulasi ?? 0) + (datas?.normal?.sirkulasi ?? 0),
      amount: sirkulasi?.amount ?? 0,

      ml_amount_akhir: datas?.ml?.saldo ?? 0,
      mb_amount_akhir: datas?.mb?.saldo ?? 0,
      cm_amount_akhir: datas?.cm?.saldo ?? 0,
      calon_cm_amount_akhir: datas?.ccm?.saldo ?? 0,
      normal_akhir: (datas?.n1?.saldo ?? 0) + (datas?.normal?.saldo ?? 0),
      amount_akhir: totalSaldo,

      amount_next: totalSaldo,
      ml_next: (datas?.ml?.saldo ?? 0) + (datas?.mb?.saldo ?? 0),
      mb_next: datas?.cm?.saldo ?? 0,
      cm_next: datas?.ccm?.saldo ?? 0,
      normal_next: (datas?.n1?.saldo ?? 0) + (datas?.normal?.saldo ?? 0),
    });
  }, [sirkulasi, show]);

  const modalIsClosed = () => {
    onClosed();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route('adminpanel.sirkulasiAwal'), {
      onSuccess: () => {
        modalIsClosed();
      },
    });
  };

  const onHandleCurencyChange = (value, name) => {
    const keySum = ['ml_next', 'mb_next', 'cm_next', 'normal_next'];
    let nominalData = 0;

    keySum.forEach((key) => {
      if (key === name) {
        nominalData += parseInt(value);
      } else {
        nominalData += parseInt(data[key]);
      }
    });

    setData((prevData) => ({
      ...prevData,
      [name]: value,
      amount_next: nominalData,
    }));
  };

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : modalIsClosed())}>
      <Loading show={processing} />
      <DialogContent
        className={`w-[90vw] h-[90vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin`}
      >
        <DialogHeader className={'max-h-10'}>
          <DialogTitle>Isi Angsuran</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sirkulasi</CardTitle>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Sirkulasi Awal</CardTitle>
              </CardHeader>
              <form onSubmit={onSubmitForm}>
                <div className="flex w-full">
                  <CardContent className="flex-1">
                    <div className="mb-3">
                      <Label htmlFor="amount">Sirkulasi Awal</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="amount"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.amount}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="ml_amount">Saldo Awal (ML)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="ml_amount"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.ml_amount}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="mb_amount">Saldo Awal (MB)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="mb_amount"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.mb_amount}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="cm_amount">Saldo Awal (CM)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="cm_amount"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.cm_amount}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="calon_cm_amount">
                        Saldo Awal (Calon CM)
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="calon_cm_amount"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.calon_cm_amount}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="normal">Saldo Awal (Normal)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="normal"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.normal}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                  </CardContent>
                  <CardContent className="flex-1">
                    <div className="mb-3">
                      <Label>Sirkulasi Akhir</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        value={data.amount_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="ml_amount_akhir">Saldo Akhir (ML)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="ml_amount_akhir"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.ml_amount_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="mb_amount_akhir">Saldo Akhir (MB)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="mb_amount_akhir"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.mb_amount_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="cm_amount_akhir">Saldo Akhir (CM)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="cm_amount_akhir"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.cm_amount_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="calon_cm_amount_akhir">
                        Saldo Akhir (Calon CM)
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="calon_cm_amount_akhir"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.calon_cm_amount_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="normal_akhir">Saldo Akhir (Normal)</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="normal_akhir"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        readOnly
                        onValueChange={onHandleCurencyChange}
                        value={data.normal_akhir}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                  </CardContent>
                  <CardContent className="flex-1">
                    <div className="mb-3">
                      <Label htmlFor="amount_next">
                        Sirkulasi Awal Bulan Depan
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="amount_next"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.amount_next}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="ml_next">Saldo ML Awal Bulan Depan</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="ml_next"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.ml_next}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="mb_next">Saldo MB Awal Bulan Depan</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="mb_next"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.mb_next}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="cm_next">Saldo CM Awal Bulan Depan</Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="cm_next"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.cm_next}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="normal_next">
                        Saldo Normal Awal Bulan Depan
                      </Label>
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        name="normal_next"
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        required
                        onValueChange={onHandleCurencyChange}
                        value={data.normal_next}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                    </div>
                  </CardContent>
                </div>

                <div className="flex justify-end p-3">
                  <div className="flex items-center justify-start flex-1 gap-3 mb-1 whitespace-nowrap">
                    <Checkbox
                      placeholder="Select Permission"
                      id="daily_kepala_approval"
                      required
                    />
                    <InputLabel htmlFor="daily_kepala_approval">
                      Konfirmasi Jika Sudah Benar Semua
                    </InputLabel>
                  </div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Card>
          </CardHeader>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalAkhir;
