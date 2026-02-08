import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import Angsuran from '@/Pages/NewAngsuran/Angsuran';
import MobileLayout from '@/Layouts/MobileLayout';

const Index = ({ datas, dateOfWeek, sirkulasi, ...props }) => {
  return (
    <MobileLayout header={<Head>Angsuran Lancar</Head>}>
      <Angsuran
        datas={datas}
        dateOfWeek={dateOfWeek}
        sirkulasi={sirkulasi}
        type={'mobile'}
        urlLink={route('mobile_apps.angsuran')}
        localState={'mobile_apps.angsuran'}
      />
    </MobileLayout>
  );
};

export default Index;
