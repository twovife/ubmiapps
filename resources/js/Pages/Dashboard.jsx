import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
  return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors} header="Home">
      <Head title="Home" />

      <div className="relative">
        <div className="px-6 py-4 bg-white rounded-md shadow-sm text-slate-700 ring-1 ring-slate-700 ring-opacity-5">
          You're logged in!!
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
