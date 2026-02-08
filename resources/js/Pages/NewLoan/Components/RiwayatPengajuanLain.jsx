import React, { useEffect, useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
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
import BadgeStatus from '@/Components/shadcn/BadgeStatus';

const RiwayatPengajuanLain = ({ data }) => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    setCustomerData(data ?? []);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'day',
        header: 'Hari',
        cell: ({ row, getValue }) => <div>{getValue()}</div>,
      },
      {
        accessorKey: 'count',
        header: 'Total Crash (Seluruh UBM)',
        cell: ({ row, getValue }) => <div>{`${getValue()} Kelompok`}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: customerData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <Table className="w-full table-auto">
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
              <>
                <TableRow className={`text-center`} key={key}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${cell.column.columnDef.className}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4">Belum Ada Catatan Pinjaman</TableCell>
          </TableRow>
        )}
      </TableBody>
      <caption className="text-center text-xs text-red-500 mt-3">
        Perubahan Sementara, Hasil Rapim TGL 03-JULI-2025, Selanjutnya akan
        dibahas lebih detail
      </caption>
    </Table>
  );
};

export default RiwayatPengajuanLain;
