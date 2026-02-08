import React, { useEffect, useState } from 'react';
import TableRencana from './TableRekap';
import SearchComponent from '@/Components/shadcn/SearchComponent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import { Head, usePage } from '@inertiajs/react';
import { FilterIcon, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';

const Content = ({ urlLink, localState, triggeredData }) => {
  const { auth, server_filter } = usePage().props;
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(triggeredData);
  }, [triggeredData]);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <div className="flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">
            Rekap Data Harian
          </h1>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={urlLink}
            localState={localState}
            searchMonth={true}
            searchBranch={server_filter.userAuthorized.canShowBranch}
            searchGroupingBranch={
              server_filter.userAuthorized.canShowGroupingBranch
            }
          ></SearchComponent>
        </div>
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
                searchMonth={true}
                searchBranch={server_filter.userAuthorized.canShowBranch}
                searchGroupingBranch={
                  server_filter.userAuthorized.canShowGroupingBranch
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="max-h-[70vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        {datas.map((data, i) => (
          <TableRencana key={i} datas={data} />
        ))}
      </div>
    </>
  );
};

export default Content;
