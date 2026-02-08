import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import Content from '@/Pages/Kasir/RencanaDrop/Content';

const Index = ({ datas, ...props }) => {
  return (
    <MobileLayout header={<Head>Buku Transaksi</Head>}>
      <Content
        urlLink={route('mobile_apps.rencana_drop_kepala')}
        localState="mobile_apps_rencana_drop_kepala"
        triggeredData={datas}
      />
    </MobileLayout>
  );
};

export default Index;
