import Authenticated from '@/Layouts/AuthenticatedLayout';
import MobileLayout from '@/Layouts/MobileLayout';
import RekapContent from '@/Pages/Kasir/Rekap/RekapContent';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapSatu = ({ datas, auth, ...props }) => {
  const title = 'REKAP 1 & Tunai Mantri';

  return (
    <MobileLayout header={<Head>{title}</Head>}>
      <RekapContent
        rekapData={datas}
        show="rekapkasir"
        title={title}
        urlLink={route('mobile_apps.rekap_satu')}
        localState={'mobile_apps_rekap_satu'}
      />
    </MobileLayout>
  );
};

export default RekapSatu;
