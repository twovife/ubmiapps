import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import SelectList from '@/Components/SelectList';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';

export default function Register({ employees }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    employee_id: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const { auth } = usePage().props;
  const superman = auth.permissions.includes('can update pusat');

  const handleOnChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    const empopt = employees.map((item) => {
      return {
        id: item.id,
        display: `${item.nama_karyawan} - ${item.jabatan} - ${item.area}`,
        value: item.id,
      };
    });
    setEmployee(empopt);
  }, [employees]);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <Authenticated>
      <Loading show={processing} />
      <Head title="Register" />
      {superman && (
        <form onSubmit={submit} className="max-w-lg mx-auto">
          <div>
            <InputLabel htmlFor="employee_id" value="Nama Karyawan" />

            <SelectList
              id="employee_id"
              name="employee_id"
              value={data.employee_id}
              className="mt-1 block w-full"
              options={employee}
              nullvalue={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.employee_id} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="username" value="username" />

            <TextInput
              id="username"
              name="username"
              value={data.username}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.username} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirm Password"
            />

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={handleOnChange}
              required
            />

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Already registered?
            </Link>

            <Button className="ml-4" disabled={processing}>
              Register
            </Button>
          </div>
        </form>
      )}
    </Authenticated>
  );
}
