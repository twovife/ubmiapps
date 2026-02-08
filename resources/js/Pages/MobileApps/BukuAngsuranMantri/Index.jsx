import React from 'react';

import { Head } from '@inertiajs/react';
import MobileLayout from '@/Layouts/MobileLayout';
import Angsuran from '@/Pages/NewAngsuran/Angsuran';

const Index = ({ datas, dateOfWeek, sirkulasi, ...props }) => {
  return (
    <MobileLayout header={<Head>Angsuran Lancar</Head>}>
      <Angsuran
        datas={datas}
        dateOfWeek={dateOfWeek}
        sirkulasi={sirkulasi}
        urlLink={route('mobile_apps.buku_angsuran')}
        localState={'mobile_apps.buku_angsuran'}
      />
    </MobileLayout>
  );
};

export default Index;
