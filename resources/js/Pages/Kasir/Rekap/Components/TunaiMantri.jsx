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
import { Badge } from '@/shadcn/ui/badge';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import { usePage } from '@inertiajs/react';

const TunaiMantri = ({
  setOnShowModal,
  setTriggeredData,
  setTriggeredType,
  datas,
}) => {
  const [data, setData] = useState([]);
  const { auth } = usePage().props;

  useEffect(() => {
    setData(datas);
  }, [datas]);

  const calculateTotals = (data) => {
    return data.reduce((acc, item) => {
      Object.keys(item).forEach((key) => {
        acc[key] = (acc[key] || 0) + (item[key] || 0);
      });
      return acc;
    }, {});
  };

  const totals = calculateTotals(data);
  const onClickStatusHandler = (e, type) => {
    setOnShowModal(true);
    setTriggeredData(e);
    setTriggeredType(type);
  };

  const columns = useMemo(
    () => [
      {
        header: '',
        accessorKey: 'kelompok',
        cell: ({ getValue, cell }) => (
          <div className="flex items-center justify-center gap-3">
            <div>
              {cell.row.original.type == 'daily'
                ? getValue()
                : dayjs(cell.row.original.tanggal).format('DD-MM')}
            </div>
            {auth.permissions.includes('can update') && (
              <BargeStatus
                onClick={() => onClickStatusHandler(cell.row.original, 2)}
                value={cell.row.original.status_dayly_approval}
              >
                {cell.row.original.status_dayly_approval ? 'Approved' : 'Open'}
              </BargeStatus>
            )}
          </div>
        ),
      },
      {
        header: 'Titipan 9%',
        accessorKey: 'titipan9',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.titipan9} />,
      },

      {
        header: 'Tunai',
        accessorKey: 'tunai',
        cell: ({ getValue }) => <FormatNumbering value={getValue()} />,
        footer: (info) => <FormatNumbering value={totals.tunai} />,
      },
      {
        header: 'Status',
        accessorKey: 'is_balance',
        cell: ({ getValue }) => <BargeStatus value={getValue()} />,
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
      {/* <Action
        show={onCreateShow}
        onClosed={handleOnCreateShowClosed}
        triggeredData={actionData}
      /> */}

      <Table className="w-full mb-3 table-auto">
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

export default TunaiMantri;
