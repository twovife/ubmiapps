import Authenticated from '@/Layouts/AuthenticatedLayout';
import RekapContent from '@/Pages/Kasir/Rekap/RekapContent';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapSatu = ({ datas, auth, ...props }) => {
  const title = 'REKAP 1 & Tunai Mantri';

  return (
    <Authenticated header={<Head>{title}</Head>}>
      <RekapContent
        rekapData={datas}
        show="rekapkasir"
        title={title}
        urlLink={route('kasir.rekap.rekap_satu')}
        localState={'kasir_rekap_rekap_satu'}
      />
    </Authenticated>
  );
};

export default RekapSatu;
