import InputError from '@/Components/InputError';
import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const PengajuanLama = ({ isActive, triggeredId, triggeredPinjaman }) => {
  const { data, setData, errors, post, processing, reset } = useForm({
    request_date: dayjs().format('YYYY-MM-DD'),
    tanggal_drop: '',
    request_nominal: 0,
    type: 'pengajuan', //type have pengajuan,baru,TD
  });
  const [isActiveTarget, setIsActiveTarget] = useState();

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

  const isTargetActive = (params) => {
    if (params) {
      setIsActiveTarget(true);
    } else {
      setIsActiveTarget(false);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const onHandleCurencyChange = (value, name, float) => {
    setData(name, value);
  };

  const buttonValueClick = (e) => {
    const value = e.target.getAttribute('data-value');
    setData('request_nominal', value);
  };

  const getDataAxios = async () => {
    try {
      const response = await axios.get(
        route('pinjaman.checkpengajuan', triggeredId)
      );

      isTargetActive(response.data.data.loan_out_status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive && triggeredId) {
      getDataAxios(); // Call the function here
    }
  }, [isActive, triggeredId]);

  const submitForm = (e) => {
    e.preventDefault();
    post(route('pinjaman.store_pengajuan_lama', triggeredId), {
      onSuccess: () => {
        reset();
        getDataAxios();
      },
      // preserveState: true,
    });
  };
  return (
    <div>
      {isActiveTarget ? (
        <div>Ada Pengajuan</div>
      ) : (
        <div>
          <Loading show={processing} />
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
          <div className="flex flex-wrap w-full gap-2 mb-3">
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="400000"
            >
              400rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="500000"
            >
              500rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="700000"
            >
              700rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="800000"
            >
              800rb
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="1000000"
            >
              1 Jt
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={buttonValueClick}
              data-value="1500000"
            >
              1,5 Jt
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
          <div className="text-end">
            <Button type="submit" onClick={submitForm} disabled={processing}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengajuanLama;
