import Loading from '@/Components/Loading';
import SelectList from '@/Components/SelectList';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

const GenerateUser = ({ show, onClosed, triggeredData }) => {
  const { roles } = usePage().props;

  const roleOptions = roles?.map((role) => {
    return {
      display: role.name,
      value: role.id,
      id: role.id,
    };
  });

  const { data, setData, post, reset, transform, errors, processing } = useForm(
    {
      id: '',
      branch_id: '',
      nama: '',
      jabatan: '',
      username: '',
      role: '',
    }
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    post(route('administrasi.manpower.store'));
  };

  useEffect(() => {
    if (triggeredData) {
      setData((prevData) => ({
        ...prevData,
        id: triggeredData.id,
        branch_id: triggeredData.branch_id,
        nama: triggeredData.employee_name,
        username: triggeredData.username,
        jabatan: triggeredData.employment,
        role: triggeredData.role,
      }));
    }
  }, [triggeredData]);

  const onClosedModalHandler = (e) => {
    onClosed();
    reset();
  };

  return (
    <Dialog
      open={show}
      onOpenChange={(open) => (open ? '' : onClosedModalHandler())}
    >
      <Loading show={processing} />
      <DialogContent className="w-[90vw] lg:max-w-md h-[90vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        <DialogHeader className={'max-h-10'}>
          <DialogTitle>Buat User</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                name="nama"
                readOnly
                value={data.nama}
                onChange={(e) => setData('nama', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Input
                id="jabatan"
                name="jabatan"
                readOnly
                value={data.jabatan}
                onChange={(e) => setData('jabatan', e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5 mb-3">
              <Label htmlFor="role">Role Name</Label>
              <SelectList
                options={roleOptions}
                required
                name="role"
                onChange={(e) => setData('role', e.target.value)}
                value={data.role}
                id="role"
                nullvalue={true}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateUser;
