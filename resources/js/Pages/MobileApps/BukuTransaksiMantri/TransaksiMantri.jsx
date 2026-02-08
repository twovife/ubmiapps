import SearchComponent from '@/Components/shadcn/SearchComponent';
import { Button } from '@/shadcn/ui/button';
import { Head, usePage } from '@inertiajs/react';
import { FilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import MobileLayout from '@/Layouts/MobileLayout';
import BukuTransaksiKepala from '@/Pages/BukuTransaksi/BukuTransaksiKepala';

const TransaksiMantri = ({ datas, buku_rencana, auth, ...props }) => {
  const [flatData, setFlatData] = useState([]);
  const { server_filter } = usePage().props;

  useEffect(() => {
    setFlatData(datas.flat());
  }, [datas]);

  return (
    <MobileLayout header={<Head>Buku Transaksi</Head>}>
      {/* this filter section */}
      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <div className="flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">
            Buku Transaksi
          </h1>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={route('mobile_apps.transaksi')}
            localState={'mobile_apps.transaksi'}
            searchMonth={true}
            searchHari={true}
            searchKelompok={server_filter.userAuthorized.canShowKelompok}
            searchBranch={server_filter.userAuthorized.canShowBranch}
            searchGroupingBranch={
              server_filter.userAuthorized.canShowGroupingBranch
            }
          />
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
                urlLink={route('mobile_apps.transaksi')}
                localState={'mobile_apps.transaksi'}
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

      <div className="max-h-[80vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        {datas &&
          datas.map((item, index) => (
            <BukuTransaksiKepala key={index} datas={item} />
          ))}
      </div>
    </MobileLayout>
  );
};

export default TransaksiMantri;
