import Loading from '@/Components/Loading';
import NoEditOverlay from '@/Components/NoEditOverlay';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';
import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Label } from '@/shadcn/ui/label';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

const Acc = ({ id, acc, onClosed, triggeredData }) => {
  const { data, setData, put, errors, processing, reset, transform } = useForm({
    approved_nominal: '',
    status: '',
    drop: '',
  });

  const { isMantri, isCreator } = useFrontEndPermission();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      approved_nominal: triggeredData?.acc ?? triggeredData?.request,
      drop: triggeredData?.acc,
    }));
  }, [id, acc]);

  const onHandleCurencyChange = (value, name) => {
    setData(name, value);
  };

  const accPinjaman = (status) => {
    transform((data) => ({
      ...data,
      status: status,
    }));
    put(route('transaction.action_buku_transaksi', id), {
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      {!isCreator && (
        <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Mengedit" />
      )}
      <Loading show={processing} />

      <div className="mb-3">
        {triggeredData?.status === 'open' ? (
          <>
            {isMantri && (
              <NoEditOverlay value="Tunggu Pimpinan Acc Terlebih Dahulu" />
            )}
            <Label htmlFor="approved_nominal">Nominal ACC</Label>
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
            <div className="flex items-center justify-end gap-3 mt-2">
              <Button variant="green" onClick={() => accPinjaman('acc')}>
                ACC
              </Button>
              <Button
                variant="destructive"
                onClick={() => accPinjaman('tolak')}
              >
                Tolak
              </Button>
            </div>
          </>
        ) : (
          <Badge size={'lg'} variant={'green'}>
            Status Pengajuan = {triggeredData?.status}, Pada Tanggal
            {triggeredData?.check_date}
          </Badge>
        )}
      </div>

      {triggeredData?.status !== 'open' && (
        <div className="mb-3">
          {triggeredData?.status === 'acc' ? (
            <>
              <Label htmlFor="drop" className="whitespace-normal">
                Drop Jadi
              </Label>
              <CurrencyInput
                className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                name="drop"
                allowDecimals={false}
                prefix="Rp. "
                min={1}
                required
                onValueChange={onHandleCurencyChange}
                value={data.drop}
                placeholder={'Inputkan angka tanpa sparator'}
              />
              <div className="flex items-center justify-end gap-3 mt-2">
                <Button variant="green" onClick={() => accPinjaman('success')}>
                  DROP
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => accPinjaman('gagal')}
                >
                  GAGAL
                </Button>
              </div>
            </>
          ) : (
            <Badge size={'lg'} variant={'green'}>
              Status Pengajuan = {triggeredData?.status}, Tanggal
              {triggeredData?.check_date}
            </Badge>
          )}
        </div>
      )}
    </form>
  );
};

export default Acc;
