import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Loading from '@/Components/Loading';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectList from '@/Components/SelectList';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

const JenisNasabah = ({ loan }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    notes: '',
    type_transaksi: 'notes',
  });

  useEffect(() => {
    setData('notes', loan.notes);
  }, [loan]);

  const handleOnChange = (e) => {
    setData(
      e.target.name,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    );
  };
  const onSubmitCreate = (e) => {
    e.preventDefault();
    post(route('pinjaman.bayar_pinjaman', loan.id));
    reset('notes');
  };
  return (
    <Card>
      <Loading show={processing} />
      <CardHeader>
        <CardTitle>Jenis Nasabah</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitCreate}>
          <InputLabel htmlFor="status" value="Status" />
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex-3">
              <SelectList
                id="notes"
                type="date"
                name="notes"
                value={data.notes}
                options={[
                  {
                    id: 1,
                    value: '10L',
                    display: '10L',
                  },
                  {
                    id: 2,
                    value: 'Beban Pemakaian',
                    display: 'Beban Pemakaian',
                  },
                  {
                    id: 3,
                    value: 'CM LUNAS',
                    display: 'CM LUNAS',
                  },
                ]}
                nullValue={true}
                className="block w-full mt-1"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex-1">
              <PrimaryButton title={'Submit'} type="submit" />
            </div>
          </div>

          <InputError message={errors.notes} className="mt-2" />
        </form>
      </CardContent>
    </Card>
  );
};

export default JenisNasabah;
