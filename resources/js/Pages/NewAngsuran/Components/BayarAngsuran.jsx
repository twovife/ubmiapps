import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';

import React, { useEffect, useState } from 'react';

import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import CurrencyInput from 'react-currency-input-field';
import Checkbox from '@/Components/Checkbox';
import { Button } from '@/shadcn/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import Loading from '@/Components/Loading';
import dayjs from 'dayjs';
import NoEditOverlay from '@/Components/NoEditOverlay';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';

const BayarAngsuran = ({ triggeredId, triggeredPinjaman, instalment }) => {
  const [triggeredData, setTriggeredData] = useState({});
  useEffect(() => {
    setTriggeredData(triggeredPinjaman);
  }, [triggeredPinjaman]);

  const {
    server_filter: { closed_transaction, today },
  } = usePage().props;

  const { data, setData, post, errors, processing, reset, recentlySuccessful } =
    useForm({
      type_transaksi: 'bayar',
      transaction_date: '',
      nominal: 0,
      id: '',
    });

  useEffect(() => {
    setData('id', triggeredId);
  }, [triggeredId, recentlySuccessful]);

  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };

  const onInputChange = (e) => {
    setData(
      e.target.name,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    );
  };

  const buttonValueClick = (e) => {
    const value = e.target.getAttribute('data-value');
    setData('nominal', value);
  };
  const buttonAddNominal = (e) => {
    const nominal = parseInt(data.nominal);
    const value = parseInt(e.target.getAttribute('data-value'));
    setData('nominal', value + nominal);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route('pinjaman.bayar_pinjaman', data.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset('transaction_date', 'nominal');
      },
    });
  };

  const [nominalPembayaran, setNominalPembayaran] = useState([
    50000, 52000, 60000, 65000, 100000, 130000, 195000, 260000, 390000,
  ]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      transaction_date: today,
    }));

    if (instalment.length > 0) {
      const getMostFrequentNumber = (data) => {
        const frequency = data.reduce((acc, { nomor }) => {
          acc[nomor] = (acc[nomor] || 0) + 1;
          return acc;
        }, {});

        return Object.keys(frequency).reduce((a, b) =>
          frequency[a] > frequency[b] ? a : b
        );
      };

      const result = Number(getMostFrequentNumber(instalment));
      const pelunasan =
        instalment.sort((a, b) => a.saldo - b.saldo)[0]?.saldo ?? 0;

      setNominalPembayaran((prev) => {
        // Filter hanya angka yang valid
        const validResult = !isNaN(result) && result > 0 ? result : null;
        const validPelunasan =
          !isNaN(pelunasan) && pelunasan > 0 ? pelunasan : null;

        // Gabungkan array baru tanpa duplikasi, dengan filter validasi
        const updated = [
          ...new Set(
            [
              ...prev.filter(
                (value) => value !== validResult && value !== validPelunasan
              ),
              validResult,
              validPelunasan,
            ].filter((value) => value !== null)
          ), // Hapus null dari array
        ];

        return updated.sort((a, b) => a - b); // Urutkan dari kecil ke besar
      });
    }
  }, [instalment]);

  return (
    <Card className="relative w-full mb-3">
      <Loading show={processing} />
      <CardHeader>
        <CardTitle>Isi Angsuran</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <form onSubmit={onSubmitForm}>
          <div className="mb-3">
            <Label htmlFor="transaction_date">Tanggal Pembayaran</Label>
            <Input
              type="date"
              min={closed_transaction}
              name="transaction_date"
              id="transaction_date"
              className="w-full"
              value={data.transaction_date}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="nominal">Nominal</Label>
            <CurrencyInput
              className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              name="nominal"
              allowDecimals={false}
              prefix="Rp. "
              min={0}
              required
              onValueChange={onHandleCurencyChange}
              value={data.nominal}
              placeholder={'Inputkan angka tanpa sparator'}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonAddNominal}
              data-value={1000}
            >
              +1 Rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonAddNominal}
              data-value={5000}
            >
              +5 Rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonAddNominal}
              data-value={10000}
            >
              +10 Rb
            </Button>
            {nominalPembayaran &&
              nominalPembayaran.map((item) => (
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={buttonValueClick}
                  data-value={item}
                >
                  {(item / 1000).toLocaleString('id-ID')} Rb
                </Button>
              ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              {triggeredData.status_pinjaman !== 'normal' && (
                <label className="flex items-center">
                  <Checkbox
                    name="danatitipan"
                    value={data.danatitipan}
                    onChange={onInputChange}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Dana Titipan?
                  </span>
                </label>
              )}
            </div>
            <Button disabled={processing} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BayarAngsuran;
