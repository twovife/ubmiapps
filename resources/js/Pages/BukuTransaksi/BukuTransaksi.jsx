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
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import dayjs from 'dayjs';
import Action from './Action';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';

const BukuTransaksi = ({ datas }) => {
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

  const columns = useMemo(
    () => [
      {
        header: 'Tgl Drop',
        accessorKey: 'tanggal_drop',
        cell: ({ getValue, cell }) => (
          <div className="flex flex-col items-center justify-center gap-1 lg:gap-3 lg:flex-row">
            <div className="whitespace-nowrap">
              {dayjs(getValue()).format('DD-MM-YY')}
            </div>
            <BadgeStatus value={cell.row.original.drop_langsung} />
          </div>
        ),
      },
      {
        header: 'Status',
        type: 'show',
        accessorKey: 'status',
        cell: ({ getValue }) => getValue(),
      },
      {
        header: 'Nama',
        accessorKey: 'nama',
        cell: ({ getValue }) => getValue(),
      },
      {
        header: 'Alamat',
        accessorKey: 'alamat',
        cell: ({ getValue }) => getValue(),
      },
      {
        header: 'No Angt',
        accessorKey: 'nomor_anggota',
        cell: ({ getValue }) => getValue(),
      },
      {
        header: 'Pinj ke',
        accessorKey: 'pinjaman_ke',
        cell: ({ getValue }) => getValue(),
      },

      {
        header: 'Drop',
        accessorKey: 'drop',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.drop} />,
      },
      {
        header: 'Pengajuan',
        accessorKey: 'request',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.request} />,
      },
      {
        header: 'Acc',
        accessorKey: 'acc',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.acc} />,
      },
      {
        header: 'Drop Jadi',
        accessorKey: 'drop_jadi',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.drop_jadi} />,
      },
    ],
    [totals]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

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
          {table.getHeaderGroups().map((headerGroup, key) => (
            <TableRow key={key}>
              {headerGroup.headers.map((header, key) => (
                <TableHead className="text-center" key={key}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, key) => (
              <React.Fragment key={key}>
                <TableRow className={`text-center`} key={key}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${cell.column.columnDef.className}`}
                    >
                      {cell.column.columnDef.type == 'show' ? (
                        <div className="flex items-center justify-center gap-2">
                          <BargeStatus
                            value={cell.row.original.status}
                            onClick={() =>
                              handleOnCreateShowOpen(cell.row.original)
                            }
                          />
                        </div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4">Belum Ada Catatan Pinjaman</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center text-black bg-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </>
  );
};

export default BukuTransaksi;
