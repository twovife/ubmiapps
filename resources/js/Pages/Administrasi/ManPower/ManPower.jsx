import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import React, { useState } from 'react';
import GenerateUser from './GenerateUser';
import dayjs from 'dayjs';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import { usePage } from '@inertiajs/react';
import SearchComponent from '@/Components/shadcn/SearchComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import { Button } from '@/shadcn/ui/button';
import { FilterIcon } from 'lucide-react';

const ManPower = ({ datas, title }) => {
  const { auth, server_filter } = usePage().props;

  const [onShowCreateUser, setOnShowCreateUser] = useState(false);
  const [paramsData, setParamsData] = useState(null);
  const handleOnCreateUserOpen = (params) => {
    setParamsData(params);
    setOnShowCreateUser(true);
  };
  const handleOnCreateUserClosed = () => {
    setParamsData(null);
    setOnShowCreateUser(false);
  };
  return (
    <>
      <GenerateUser
        show={onShowCreateUser}
        triggeredData={paramsData}
        onClosed={handleOnCreateUserClosed}
      />
      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <div className="flex-none shrink-0 whitespace-nowrap">
          <h1 className="text-xl font-semibold tracking-tight ">{title}</h1>
        </div>
        <div className="items-center justify-end flex-auto hidden w-full lg:flex">
          <SearchComponent
            urlLink={route('administrasi.manpower.index')}
            localState={'administrasi_manpower_store'}
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
                urlLink={route('administrasi.manpower.index')}
                localState={'administrasi_manpower_store'}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor</TableHead>
              <TableHead>Nama Karaywan</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Tanggal Masuk</TableHead>
              <TableHead>Date Resign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas &&
              datas.map((data, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="hidden lg:flex-1 lg:block">{key + 1}</div>
                      <div className="flex-1">
                        {auth.permissions.includes('superuser') ? (
                          <BargeStatus
                            onClick={() => handleOnCreateUserOpen(data)}
                            value={data.isActive}
                          >
                            {data.isActive ? 'Act' : 'Non Act'}
                          </BargeStatus>
                        ) : (
                          <BadgeStatus value={data.isActive}>
                            {data.isActive ? 'Act' : 'Non Act'}
                          </BadgeStatus>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{data.employee_name}</TableCell>
                  <TableCell>
                    <BadgeStatus
                      value={data.username_status == 1 ? true : false}
                    >
                      {data.username}
                    </BadgeStatus>
                    {auth.permissions.includes('superuser') && (
                      <div className="flex gap-1">
                        {data.rolelist?.map((item) => (
                          <span>{item.name}</span>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{data.identity_id}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.employment}</TableCell>
                  <TableCell>
                    {data.hire_date
                      ? dayjs(data.hire_date).format('DD-MM-YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    {data.resign_date
                      ? dayjs(data.resign_date).format('DD-MM-YYYY')
                      : ''}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ManPower;
