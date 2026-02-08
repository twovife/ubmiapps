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
import dayjs from 'dayjs';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import { Button } from '@/shadcn/ui/button';
import { Play } from 'lucide-react';

const DetailRiwayat = ({ detailData }) => {

  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState();
  const handleExpandedTogled = (value) => {
    setExpanded((prevId) => (prevId === value ? null : value));
  };

  useEffect(() => {
    setData(detailData);
  }, [detailData]);

  const columns = useMemo(
    () => [
      {
        header: 'Tgl Pengajuan',
        accessorKey: 'request_date',
        cell: ({ getValue }) => <div>{dayjs(getValue()).format('DD/MM')}</div>,
      },
      {
        header: 'Status Pengajuan',
        accessorKey: 'status',
        cell: ({ getValue }) => getValue(),
      },

      {
        header: 'Tgl Drop',
        accessorKey: 'drop_date',
        cell: ({ getValue }) => <div>{dayjs(getValue()).format('DD/MM')}</div>,
      },
      {
        header: 'Drop',
        accessorKey: 'drop',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
      },
      {
        header: 'Lunas',
        accessorKey: 'lunas',
        cell: ({ getValue }) => (getValue() ? 'Lunas' : 'Belum'),
      },
      {
        header: 'Status',
        accessorKey: 'status_pinjaman',
        cell: ({ getValue }) => (
          <div
            className={`uppercase ${
              getValue() == 'mb' || getValue() == 'ml'
                ? 'bg-red-500 font-semibold'
                : ''
            }`}
          >
            {getValue()}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <Table className="w-full table-auto">
      <TableHeader>
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
              <TableRow
                className={`${
                  expanded == row.original.loan_id ? 'border-b-0' : ''
                } text-center`}
                key={key}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`${cell.column.columnDef.className}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </Table>
  );
};

export default DetailRiwayat;
