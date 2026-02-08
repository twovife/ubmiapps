import React, { useEffect, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import SearchComponent from '@/Components/shadcn/SearchComponent';
import { usePage } from '@inertiajs/react';
import AngsuranByDateTable from './Components/AngsuranByDateTable';
import { Button } from '@/shadcn/ui/button';
import { FilterIcon } from 'lucide-react';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import LinkButton from '@/Components/LinkButton';
import InputMacet from '../WebView/BukuTransaksi/InputMacet';
import dayjs from 'dayjs';

const AngsuranByDate = ({
  headerName,
  datas,
  urlLink,
  localState,
  searchMonth,
  searchHari,
}) => {
  const { auth, server_filter } = usePage().props;
  const [showInputMacet, setShowInputMacet] = useState(false);
  const onShowMacet = () => {
    setShowInputMacet(true);
  };
  const onCloseMacet = () => {
    setShowInputMacet(false);
  };

  return (
    <>
      <InputMacet show={showInputMacet} onClosed={onCloseMacet} />
      <div className="flex flex-col gap-3 mb-3 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-between flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">
            {headerName}
          </h1>
          <div className="flex justify-end gap-3 lg:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <FilterIcon className="h-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <SearchComponent
                  urlLink={urlLink}
                  localState={localState}
                  searchMonth={searchMonth}
                  searchHari={searchHari}
                  searchKelompok={server_filter.userAuthorized.canShowKelompok}
                  searchBranch={server_filter.userAuthorized.canShowBranch}
                  searchGroupingBranch={
                    server_filter.userAuthorized.canShowGroupingBranch
                  }
                />
              </PopoverContent>
            </Popover>
            <Button onClick={onShowMacet} color="outline">
              Input Macet
            </Button>
          </div>
        </div>

        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={urlLink}
            localState={localState}
            searchMonth={searchMonth}
            searchHari={searchHari}
            searchKelompok={server_filter.userAuthorized.canShowKelompok}
            searchBranch={server_filter.userAuthorized.canShowBranch}
            searchGroupingBranch={
              server_filter.userAuthorized.canShowGroupingBranch
            }
          ></SearchComponent>
          <div className="ml-3">
            <Label>&nbsp;</Label>
            <Button onClick={onShowMacet} color="outline">
              Input Macet
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <AngsuranByDateTable datas={datas} />
      </div>
    </>
  );
};

export default AngsuranByDate;
