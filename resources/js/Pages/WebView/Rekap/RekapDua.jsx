import Authenticated from '@/Layouts/AuthenticatedLayout';
import RekapContent from '@/Pages/Kasir/Rekap/RekapContent';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapDua = ({ datas, saldoAwalBulan, auth, ...props }) => {
  const title = auth.permissions.includes('unit pimpinan')
    ? 'Rekap Pimpinan'
    : 'Rekap 2';

  return (
    <Authenticated header={<Head>{title}</Head>}>
      <RekapContent
        rekapData={datas}
        saldoAwalBulan={saldoAwalBulan}
        show="rekap2"
        title={title}
        urlLink={route('kasir.rekap.rekap_dua')}
        localState={'kasir_rekap_rekap_dua'}
      />
    </Authenticated>
  );
};

export default RekapDua;
