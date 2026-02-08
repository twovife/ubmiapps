import React, { useEffect, useMemo, useState } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AngsuranByDate from '@/Pages/NewAngsuran/AngsuranByDate';

const SearchByDate = ({ datas, dateOfWeek, server_filter, ...props }) => {
  const headerName =
    server_filter.type_show == 'macet' ? 'MACET' : 'Cari Angsuran';
  const urlLink =
    server_filter.type_show == 'macet'
      ? route('pinjaman.index_pinjaman_macet')
      : route('pinjaman.index_pinjaman_search');
  const localState =
    server_filter.type_show == 'macet'
      ? 'pinjaman_index_pinjaman_macet'
      : 'pinjaman_index_pinjaman_search';

  return (
    <Authenticated header={<Head>{headerName}</Head>}>
      <AngsuranByDate
        headerName={headerName}
        datas={datas}
        dateOfWeek={dateOfWeek}
        urlLink={urlLink}
        localState={localState}
        searchMonth={server_filter.searchMonth}
        searchHari={true}
      />
    </Authenticated>
  );
};

export default SearchByDate;
