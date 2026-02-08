import Authenticated from '@/Layouts/AuthenticatedLayout';
import Permantri from '@/Pages/Kasir/Rekap/Permantri';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapPerMantri = ({ datas, saldoAwalBulan, auth, ...props }) => {
  const title = 'Rekap Mantri';

  return (
    <Authenticated header={<Head>{title}</Head>}>
      <Permantri
        rekapData={datas}
        auth={auth}
        saldoAwalBulan={saldoAwalBulan}
        title={title}
        urlLink={route('kasir.rekap.rekap_permantri')}
        localState={'kasir_rekap_rekap_permantri'}
      />
    </Authenticated>
  );
};

export default RekapPerMantri;
