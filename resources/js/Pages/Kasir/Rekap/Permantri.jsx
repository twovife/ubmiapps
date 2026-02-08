import SearchComponent from '@/Components/shadcn/SearchComponent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import { Head, usePage } from '@inertiajs/react';
import { FilterIcon, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TableRekap from './Components/TableRekap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import TableRekapKasir from './Components/TableRekapKasir';
import TunaiMantri from './Components/TunaiMantri';
import Action from './Components/Action';
import TableRekapPerMantri from './Components/TableRekapPerMantri';

const Permantri = ({
  rekapData,
  saldoAwalBulan,
  auth,
  urlLink,
  localState,
  title,
}) => {

  const [datas, setDatas] = useState([]);
  const { server_filter } = usePage().props;
  useEffect(() => {
    setDatas(rekapData);
  }, [rekapData]);

  const [onShowModal, setOnShowModal] = useState(false);
  const [triggeredData, setTriggeredData] = useState();

  // Event handler function to set the "onCreateShow" state variable to true
  const handleOnCreateShowOpen = (e) => {
    setOnShowModal(true);
  };

  // Event handler function to set the "onCreateShow" state variable to false
  const handleOnCreateShowClosed = (e) => {
    setOnShowModal(false);
    setTriggeredData();
  };

  const [nexOrPrevious, setNexOrPrevious] = useState(null);
  const onNexOrPreviousTogler = (params) => {
    setNexOrPrevious(params);
  };

  return (
    <>
      <Action
        show={onShowModal}
        onClosed={handleOnCreateShowClosed}
        triggeredData={triggeredData}
      />

      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <div className="flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">{title}</h1>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={urlLink}
            localState={localState}
            searchMonth={true}
            searchKelompok={server_filter.userAuthorized.canShowKelompok}
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
      <div className="max-h-[70vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-none">
        <Tabs defaultValue="rekappimpinan" className="w-full">
          <TabsList>
            <TabsTrigger value="rekappimpinan">Rekap Mantri</TabsTrigger>
            <TabsTrigger value="rekapkasir">Rekap Kasir Mantri</TabsTrigger>
            <TabsTrigger value="tunaimantri">Tunai Mantri</TabsTrigger>
          </TabsList>

          <TabsContent value="rekappimpinan">
            <TableRekapPerMantri
              setOnShowModal={setOnShowModal}
              setTriggeredData={setTriggeredData}
              saldoAwalBulan={saldoAwalBulan}
              datas={datas}
            />
          </TabsContent>

          <TabsContent value="rekapkasir">
            <TableRekapKasir datas={datas} />
          </TabsContent>

          <TabsContent value="tunaimantri">
            <TunaiMantri datas={datas} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Permantri;
