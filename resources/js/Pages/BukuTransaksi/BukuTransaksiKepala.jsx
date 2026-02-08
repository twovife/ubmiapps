import React, { useEffect, useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';

import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import dayjs from 'dayjs';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import Action from './Action';

const BukuTransaksiKepala = ({ datas }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(datas);
  }, [datas]);

  const calculateTotals = (data) => {
    return data.reduce(
      (acc, item) => {
        acc.request += item.request || 0;
        acc.drop += item.drop || 0;
        acc.drop_jadi += item.drop_jadi || 0;
        acc.acc += item.acc || 0;

        return acc;
      },
      {
        request: 0,
        drop: 0,
        acc: 0,
        drop_jadi: 0,
      }
    );
  };

  const totals = calculateTotals(data);

  // Declare a state variable to track the visibility of the "onCreateShow" component
  const [onCreateShow, setOnCreateShow] = useState(false);
  const [actionData, setActionData] = useState();

  // Event handler function to set the "onCreateShow" state variable to true
  const handleOnCreateShowOpen = (e) => {
    setOnCreateShow(true);
    setActionData(e);
  };

  // Event handler function to set the "onCreateShow" state variable to false
  const handleOnCreateShowClosed = (e) => {
    setOnCreateShow(false);
    setActionData();
  };

  return (
    <>
      <Action
        show={onCreateShow}
        onClosed={handleOnCreateShowClosed}
        triggeredData={actionData}
      />

      <Table className="w-full mb-3 text-xs table-auto">
        <TableHeader className="sticky top-0 z-10 bg-gray-100">
          <TableRow>
            <TableHead className="font-semibold text-black whitespace-nowrap">
              {dayjs(data[0]?.tanggal_drop).format('DD-MM-YYYY')}{' '}
            </TableHead>
            <TableHead>Nasabah</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-0">
                  <div className="flex items-center justify-center gap-2">
                    <BargeStatus
                      value={item.status}
                      onClick={() => handleOnCreateShowOpen(item)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-base font-semibold">
                      <span> {item.nama}</span>{' '}
                      <BadgeStatus value={item.drop_langsung} />
                    </div>
                    <div>{item.nik}</div>
                    <div>{item.alamat}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-between gap-6">
                    <div>Pengajuan</div>
                    <FormatNumbering value={item.request} />
                  </div>
                  <div className="flex justify-between gap-6">
                    <div>ACC</div>
                    <FormatNumbering value={item.acc} />
                  </div>
                  <div className="flex justify-between gap-6">
                    <div>Drop Jadi</div>
                    <FormatNumbering value={item.drop_jadi} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Total</TableCell>
            <TableCell>
              <div className="flex justify-between gap-6">
                <div>Pengajuan</div>
                <FormatNumbering value={totals.request} />
              </div>
              <div className="flex justify-between gap-6">
                <div>ACC</div>
                <FormatNumbering value={totals.acc} />
              </div>
              <div className="flex justify-between gap-6">
                <div>Drop Jadi</div>
                <FormatNumbering value={totals.drop_jadi} />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default BukuTransaksiKepala;
