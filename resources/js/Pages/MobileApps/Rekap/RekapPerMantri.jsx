import MobileLayout from '@/Layouts/MobileLayout';
import Permantri from '@/Pages/Kasir/Rekap/Permantri';
import { Head } from '@inertiajs/react';
import React from 'react';

const RekapPerMantri = ({ datas, saldoAwalBulan, auth, ...props }) => {
  const title = 'Rekap Mantri';

  return (
    <MobileLayout header={<Head>{title}</Head>}>
      <Permantri
        rekapData={datas}
        saldoAwalBulan={saldoAwalBulan}
        auth={auth}
        title={title}
        urlLink={route('mobile_apps.rekap_permantri')}
        localState={'mobile_apps_rekap_permantri'}
      />
    </MobileLayout>
  );
};

export default RekapPerMantri;
