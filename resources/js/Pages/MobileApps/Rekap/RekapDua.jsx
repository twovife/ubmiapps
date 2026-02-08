import Authenticated from '@/Layouts/AuthenticatedLayout';
import MobileLayout from '@/Layouts/MobileLayout';
import RekapContent from '@/Pages/Kasir/Rekap/RekapContent';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapDua = ({ datas, saldoAwalBulan, auth, ...props }) => {
  const title = auth.permissions.includes('unit pimpinan')
    ? 'Rekap Pimpinan'
    : 'Rekap 2';

  return (
    <MobileLayout header={<Head>{title}</Head>}>
      <RekapContent
        rekapData={datas}
        saldoAwalBulan={saldoAwalBulan}
        show="rekap2"
        title={title}
        urlLink={route('mobile_apps.rekap_dua')}
        localState={'mobile_apps_rekap_dua'}
      />
    </MobileLayout>
  );
};

export default RekapDua;
