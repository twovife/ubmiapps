import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className,
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.employee.nama_karyawan,
      jabatan: `${user.employee.jabatan} ${
        user.employee.area > 0 ? user.employee.area : ''
      }`,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="block w-full mt-1"
            readOnly
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="jabatan" value="Jabatan" />

          <TextInput
            id="jabatan"
            readOnly
            className="block w-full mt-1"
            value={data.jabatan}
            onChange={(e) => setData('jabatan', e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.jabatan} />
        </div>
      </form>
    </section>
  );
}
