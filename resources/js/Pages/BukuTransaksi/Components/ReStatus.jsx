import Loading from '@/Components/Loading';
import SelectList from '@/Components/SelectList';
import { Button } from '@/shadcn/ui/button';
import { Label } from '@/shadcn/ui/label';
import { useForm } from '@inertiajs/react';
import React from 'react';

const ReStatus = ({ triggeredId, onClosed }) => {
  //genereate form for put/patch
  const { data, setData, put, processing, reset } = useForm({});

  const onChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('transaction.updateEverything', triggeredId), {
      preventDefault: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Loading show={processing} />
      <Label htmlFor="status">Status</Label>
      <div className="flex gap-3">
        <SelectList
          onChange={onChange}
          value={data.status}
          id={'status'}
          nullValue={true}
          required
          name={'status'}
          options={[{ id: 1, value: 'open', display: 'Open' }]}
        />
        <Button type="submit">Ubah</Button>
      </div>
    </form>
  );
};

export default ReStatus;
