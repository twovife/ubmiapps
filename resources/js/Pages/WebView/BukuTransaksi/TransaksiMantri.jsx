import SearchComponent from '@/Components/shadcn/SearchComponent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/shadcn/ui/button';
import { Head, usePage } from '@inertiajs/react';
import { FilterIcon, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import BukuTransaksi from '@/Pages/BukuTransaksi/BukuTransaksi';
import Create from './Create';
import Rencana from '@/Pages/BukuTransaksi/Rencana';

const TransaksiMantri = ({ datas, buku_rencana, auth, ...props }) => {
  const { server_filter } = usePage().props;

  const [flatData, setFlatData] = useState([]);
  useEffect(() => {
    setFlatData(datas.flat());
  }, [datas]);

  // Declare a state variable to track the visibility of the "onCreateShow" component
  const [onCreateShow, setOnCreateShow] = useState(false);

  // Event handler function to set the "onCreateShow" state variable to true
  const handleOnCreateShowOpen = (e) => {
    setOnCreateShow(true);
  };

  // Event handler function to set the "onCreateShow" state variable to false
  const handleOnCreateShowClosed = (e) => {
    setOnCreateShow(false);
  };
  // Declare a state variable to track the visibility of the "onCreateShow" component

  return (
    <Authenticated header={<Head>Buku Transaksi</Head>}>
      {/* this filter section */}
      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <div className="flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">
            Buku Transaksi
          </h1>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={route('transaction.index_buku_transaksi')}
            localState={'transaction_index_buku_transaksi'}
            searchMonth={true}
            searchHari={true}
            searchKelompok={server_filter.userAuthorized.canShowKelompok}
            searchBranch={server_filter.userAuthorized.canShowBranch}
            searchGroupingBranch={
              server_filter.userAuthorized.canShowGroupingBranch
            }
          >
            {server_filter.userAuthorized.canCreate && (
              <Button type="button" onClick={handleOnCreateShowOpen}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tambah Pengajuan
                </span>
              </Button>
            )}
          </SearchComponent>
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
                urlLink={route('transaction.index_buku_transaksi')}
                localState={'transaction_index_buku_transaksi'}
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
          <Button type="button" onClick={handleOnCreateShowOpen}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah Pengajuan
            </span>
          </Button>
        </div>
      </div>

      <Create show={onCreateShow} onClosed={handleOnCreateShowClosed} />

      {/* Whoooooa!!! what is this */}

      <div className="max-h-[70vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        <Tabs defaultValue="bukutransaksi" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="bukutransaksi">Buku Transaksi</TabsTrigger>
              <TabsTrigger value="dailyTarget">Rencana Drop</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bukutransaksi">
            {datas &&
              datas.map((item, index) => (
                <BukuTransaksi key={index} datas={item} />
              ))}
          </TabsContent>
          <TabsContent value="dailyTarget">
            <Rencana datas={buku_rencana} dataTransaksi={datas} />
          </TabsContent>
        </Tabs>
      </div>
    </Authenticated>
  );
};

export default TransaksiMantri;
