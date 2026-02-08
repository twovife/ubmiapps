import React, { useEffect, useMemo, useState } from 'react';

import { Head } from '@inertiajs/react';
import MobileLayout from '@/Layouts/MobileLayout';
import AngsuranByDate from '@/Pages/NewAngsuran/AngsuranByDate';

const SearchByDate = ({ datas, dateOfWeek, server_filter, ...props }) => {
  const headerName =
    server_filter.type_show == 'macet' ? 'MACET' : 'Cari Angsuran';
  const urlLink =
    server_filter.type_show == 'macet'
      ? route('mobile_apps.macet')
      : route('mobile_apps.byDates');
  const localState =
    server_filter.type_show == 'macet'
      ? 'mobile_apps_macet'
      : 'mobile_apps_byDates';

  return (
    <MobileLayout header={<Head>{headerName}</Head>}>
      <AngsuranByDate
        headerName={headerName}
        datas={datas}
        dateOfWeek={dateOfWeek}
        urlLink={urlLink}
        localState={localState}
        searchMonth={server_filter.searchMonth}
        searchHari={true}
      />
    </MobileLayout>
  );
};

export default SearchByDate;
