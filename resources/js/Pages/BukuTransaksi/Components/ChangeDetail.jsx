import Loading from '@/Components/Loading';
import NoEditOverlay from '@/Components/NoEditOverlay';
import SelectList from '@/Components/SelectList';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';
import { showNominalByStatus } from '@/lib/utils';

import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { useForm } from '@inertiajs/react';

import React, { useEffect, useState, useTransition } from 'react';
import CurrencyInput from 'react-currency-input-field';

const ChangeDetail = ({ triggeredData, onClosed }) => {
  //genereate form for put/patch

  const { isUnit, isMantri, isPusat, isCreator } = useFrontEndPermission();

  const { data, setData, put, processing, reset, transform, errors } = useForm({
    request_date: '',
    drop_date: '',
    request_nominal: '',
    approved_nominal: '',
    nominal_drop: '',
    drop_langsung: '',
  });
  const [errorClient, setErrorClient] = useState(null);
  useEffect(() => {
    if (triggeredData) {
      setData((prevData) => ({
        ...prevData,
        request_date: triggeredData.request_date,
        drop_date: triggeredData.tanggal_drop,
        drop_langsung: triggeredData.drop_langsung,

        request_nominal:
          triggeredData.drop_langsung == 'baru'
            ? triggeredData.drop_jadi
            : triggeredData.request,

        approved_nominal: triggeredData.acc,
        nominal_drop: triggeredData.drop_jadi,
      }));
    }
  }, [triggeredData]);

  const onDateChange = (e) => {
    setErrorClient(null);

    const { name, value } = e.target;
    const isRequestDate = name === 'request_date' && data.drop_date === value;
    const isDropDate = name === 'drop_date' && data.request_date === value;

    const istrue = isRequestDate || isDropDate;
    const statusBefore =
      triggeredData?.status == 'gagal' || triggeredData?.status == 'tolak';

    if (istrue && statusBefore) {
      setErrorClient(
        'Status GAGAL / TOLAK tidak bisa diubah ke drop Langsung / Pengajuan'
      );
      return null;
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
      drop_langsung: istrue ? 'baru' : 'lama',

      request_nominal: istrue
        ? null
        : triggeredData.drop_langsung == 'baru'
        ? triggeredData.drop_jadi
        : triggeredData.request,

      approved_nominal: istrue
        ? null
        : triggeredData.drop_langsung == 'baru'
        ? triggeredData.drop_jadi
        : triggeredData.acc,

      nominal_drop: istrue
        ? triggeredData.drop_langsung == 'baru'
          ? triggeredData.drop_jadi
          : triggeredData.request
        : triggeredData.status == 'success'
        ? triggeredData.drop_jadi
        : null,
    }));
  };

  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };

  const onChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (status) => {
    transform((data) => ({
      ...data,
      updateType: status,
    }));

    put(route('transaction.updateEverything', triggeredData?.nomor_pengajuan), {
      preventDefault: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {isMantri && (
        <NoEditOverlay value="Hanya bisa dilakukan oleh Pimpinan / Staff" />
      )}
      <Loading show={processing} />
      {/* <div className="mb-1 ">
        <div className="flex w-full gap-3">
          <div className="flex-1">
            <Label htmlFor="request_date">Tanggal Pengajuan</Label>
            <Input
              type="date"
              onChange={onDateChange}
              value={data.request_date}
              id={'request_date'}
              max={data.drop_date}
              required
              name={'request_date'}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="drop_date">Tanggal Drop</Label>
            <Input
              type="date"
              onChange={onDateChange}
              value={data.drop_date}
              id={'drop_date'}
              min={data.request_date}
              required
              name={'drop_date'}
            />
          </div>
        </div>
        {errorClient ? (
          <div className="font-semibold text-red-500">{errorClient}</div>
        ) : data.drop_langsung == 'baru' ? (
          <div className="text-red-500 w-fullfont-semibold">DROP BARU</div>
        ) : (
          <div className="w-full font-semibold text-red-500">
            PENGAJUAN DROP
          </div>
        )}
      </div> */}

      {/* <div className="mb-3">
        <div className="text-xs text-blue-500">
          Perubahan Tanggal Mempengaruhi Perolehan Drop dan Rencana Drop
        </div>
        <div className="text-xs">
          Jika <span className="font-semibold text-blue-500">Drop Baru</span>{' '}
          diubah ke{' '}
          <span className="font-semibold text-blue-500">
            Drop Lama / Pengajuan
          </span>
        </div>
      </div> */}

      {/* <div className="flex w-full gap-3 mb-1">
        {data.drop_langsung == 'lama' && (
          <>
            <div className="flex-1">
              <Label htmlFor="request_nominal">Pengajuan</Label>
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
            </div>

            {data.approved_nominal && (
              <div className="flex-1">
                <Label htmlFor="approved_nominal">Acc</Label>
                <CurrencyInput
                  className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  name="approved_nominal"
                  allowDecimals={false}
                  prefix="Rp. "
                  min={1}
                  required
                  onValueChange={onHandleCurencyChange}
                  value={data.approved_nominal}
                  placeholder={'Inputkan angka tanpa sparator'}
                />
              </div>
            )}
          </>
        )}

        {data.nominal_drop && (
          <div className="flex-1">
            <Label htmlFor="nominal_drop">Drop Jadi</Label>
            <CurrencyInput
              className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              name="nominal_drop"
              allowDecimals={false}
              prefix="Rp. "
              min={1}
              required
              onValueChange={onHandleCurencyChange}
              value={data.nominal_drop}
              placeholder={'Inputkan angka tanpa sparator'}
            />
          </div>
        )}
      </div> */}
      <div className="mb-3">
        <div className="text-xs text-blue-500">
          Perubahan Nominal Mempengaruhi Perolehan Drop dan Rencana Drop
        </div>
        <div className="text-xs text-yellow-500">
          Reset Pinjaman akan menghilangkan semua data angsuran pada pinjaman
          ini
        </div>
      </div>
      <div className="flex items-center justify-between">
        {/* <Button onClick={() => handleSubmit('detailchange')} type="submit">
          Ubah
        </Button> */}
        {triggeredData?.drop_langsung == 'lama' && (
          <Button
            onClick={() => handleSubmit('resetdata')}
            variant="yellow"
            type="submit"
          >
            Reset Pinjaman
          </Button>
        )}
      </div>
    </form>
  );
};

export default ChangeDetail;
