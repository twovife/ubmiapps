import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import Angsuran from '@/Pages/NewAngsuran/Angsuran';

const Index = ({ datas, dateOfWeek, sirkulasi, ...props }) => {
  return (
    <Authenticated header={<Head>Angsuran Lancar</Head>}>
      <Angsuran
        datas={datas}
        dateOfWeek={dateOfWeek}
        sirkulasi={sirkulasi}
        urlLink={route('pinjaman.index_pinjaman')}
        localState={'pinjaman_index_pinjaman'}
      />
    </Authenticated>
  );
};

export default Index;
