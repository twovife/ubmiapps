import React from 'react';

import SearchComponent from '@/Components/shadcn/SearchComponent';
import { usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import AngsuranTable from './Components/AngsuranTable';
import BukuStorting from './Components/BukuStorting';
import { Button } from '@/shadcn/ui/button';
import { FilterIcon } from 'lucide-react';
import AngsuranTableMobile from './Components/AngsuranTableMobile';
import { Input } from '@/shadcn/ui/input';
import BukuStortingMobile from './Components/BukuStortingMobile';

const Angsuran = ({
  datas,
  dateOfWeek,
  sirkulasi,
  urlLink,
  localState,
  type = 'desktop',
}) => {
  const { auth, server_filter } = usePage().props;
  return (
    <>
      <div className="flex flex-col gap-3 mb-3 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-between flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">
            Angsuran Lancar
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
                  searchMonth={true}
                  searchHari={true}
                  searchKelompok={server_filter.userAuthorized.canShowKelompok}
                  searchBranch={server_filter.userAuthorized.canShowBranch}
                  searchGroupingBranch={
                    server_filter.userAuthorized.canShowGroupingBranch
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={urlLink}
            localState={localState}
            searchMonth={true}
            searchHari={true}
            searchKelompok={server_filter.userAuthorized.canShowKelompok}
            searchBranch={server_filter.userAuthorized.canShowBranch}
            searchGroupingBranch={
              server_filter.userAuthorized.canShowGroupingBranch
            }
          ></SearchComponent>
        </div>
      </div>
      <Tabs defaultValue="bukuangsuran" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="bukuangsuran">Buku Angsuran</TabsTrigger>
            <TabsTrigger value="bukustorting">Buku Storting</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bukuangsuran">
          {type === 'mobile' && (
            <AngsuranTableMobile dateOfWeek={dateOfWeek} datas={datas} />
          )}
          {type === 'desktop' && (
            <AngsuranTable dateOfWeek={dateOfWeek} datas={datas} />
          )}
        </TabsContent>
        <TabsContent value="bukustorting">
          {type === 'mobile' && (
            <BukuStortingMobile
              dateOfWeek={dateOfWeek}
              datas={datas}
              sirkulasi={sirkulasi}
            />
          )}
          {type === 'desktop' && (
            <BukuStorting
              dateOfWeek={dateOfWeek}
              datas={datas}
              sirkulasi={sirkulasi}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Angsuran;
