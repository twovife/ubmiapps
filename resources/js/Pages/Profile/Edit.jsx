import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, usePage } from '@inertiajs/react';
import { MobileIcon } from '@radix-ui/react-icons';
import MobileLayout from '@/Layouts/MobileLayout';

export default function Edit({ auth, mustVerifyEmail, status }) {
  const permissionMantri = auth.permissions.includes('unit mantri');
  const Layout = permissionMantri ? MobileLayout : AuthenticatedLayout;

  return (
    <Layout
      auth={auth}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
          <div className="p-4 bg-white shadow-sm sm:p-8 sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 bg-white shadow-sm sm:p-8 sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
