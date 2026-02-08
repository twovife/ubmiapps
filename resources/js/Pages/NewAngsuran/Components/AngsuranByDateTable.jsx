import React, { useEffect, useState } from 'react';
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
import { Button } from '@/shadcn/ui/button';
import Action from './Action';
import { Badge } from '@/shadcn/ui/badge';

const AngsuranByDateTable = ({ datas }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(datas);
  }, [datas]);

  const calculateInstalment = (data, keyToSum) => {
    const result = data.reduce(
      (acc, item) => acc + parseInt(item.instalment[keyToSum] ?? 0),
      0
    );
    return result;
  };

  const calculateTotals = (data, keyToSum) => {
    const result = data.reduce(
      (acc, item) => acc + parseInt(item[keyToSum] ?? 0),
      0
    );
    return result;
  };

  const [triggeredId, setTriggeredId] = useState(null);
  const [show, setShow] = useState(false);
  const onCreateShowOpen = (id) => {
    setTriggeredId(id);
    setShow(true);
  };

  const onClosedShowOpen = () => {
    setShow(false);
    setTriggeredId(null);
  };

  const [selectedId, setSelectedId] = useState([]);

  const handleRowClick = (id) => {
    setSelectedId((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        // Jika ID sudah ada, hapus dari array (toggle)
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        // Jika ID belum ada, tambahkan ke array
        return [...prevSelectedRows, id];
      }
    });
  };

  return (
    <div className="relative overflow-auto h-[60vh] lg:h-[85vh]">
      <Table className="text-xs rounded-lg">
        <TableHeader className="sticky top-0 left-0 z-10">
          <TableRow className="bg-gray-200">
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Nama Nasabah</TableHead>
            <TableHead className="text-center">NIK</TableHead>
            <TableHead className="text-center">Note</TableHead>
            <TableHead className="text-center">Alamat</TableHead>
            <TableHead className="text-center">Kelompok</TableHead>
            <TableHead className="text-center">Hari</TableHead>
            <TableHead className="text-center">Pnj Ke</TableHead>
            <TableHead className="text-center">X Angs</TableHead>
            <TableHead className="text-center border-x border-x-black">
              Pinjaman
            </TableHead>
            <TableHead className="text-center border-x border-x-black">
              Angsuran
            </TableHead>
            <TableHead className="text-center border-x border-x-black">
              Saldo
            </TableHead>
            <TableHead className="text-center">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((row, i) => (
              <React.Fragment key={i}>
                <TableRow>
                  <TableCell colSpan={16}>{row.month}</TableCell>
                </TableRow>
                {row.data.map((subrow, i) => (
                  <TableRow
                    className={`${
                      selectedId.includes(subrow.id)
                        ? 'bg-green-200 hover:bg-green-50'
                        : ''
                    }}`}
                    key={i}
                  >
                    <TableCell>
                      <div className="flex items-center justify-between gap-2">
                        <div>{dayjs(subrow.tanggal_drop).format('DD-MM')}</div>
                        <div>
                          <Button
                            size="xs"
                            onClick={() => onCreateShowOpen(subrow.id)}
                          >
                            Pay
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => handleRowClick(subrow.id)}>
                      {subrow.nama}
                    </TableCell>
                    <TableCell className="text-center">{subrow.nik}</TableCell>
                    <TableCell className="text-center">
                      {subrow.lunas ? (
                        <span className="px-2 py-1 mr-1 text-xs text-white bg-green-400 border rounded">
                          Lunas
                        </span>
                      ) : (
                        ''
                      )}
                      {subrow.status_pinjaman == 'normal' ? (
                        <span className="px-2 py-1 mr-1 text-xs border rounded">
                          {subrow.status_pinjaman}
                        </span>
                      ) : subrow.status_pinjaman == 'cm' ? (
                        <span className="px-2 py-1 mr-1 text-xs text-white bg-yellow-400 border rounded">
                          {subrow.status_pinjaman}
                        </span>
                      ) : subrow.status_pinjaman == 'mb' ? (
                        <span className="px-2 py-1 mr-1 text-xs text-white bg-red-400 border rounded">
                          {subrow.status_pinjaman}
                        </span>
                      ) : subrow.status_pinjaman == 'ml' ? (
                        <span className="px-2 py-1 mr-1 text-xs text-white bg-black border rounded">
                          {subrow.status_pinjaman}
                        </span>
                      ) : (
                        <div>{subrow.status_pinjaman}</div>
                      )}
                      {subrow.notes !== null ? (
                        <Badge>{subrow.notes}</Badge>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>{subrow.alamat}</TableCell>
                    <TableCell className="text-center">
                      {subrow.kelompok}
                    </TableCell>
                    <TableCell className="text-center">{subrow.hari}</TableCell>
                    <TableCell className="text-center">
                      {subrow.pinjaman_ke}
                    </TableCell>
                    <TableCell className="text-center">
                      {subrow.x_angs}
                    </TableCell>
                    <TableCell className="border-x border-x-black">
                      <FormatNumbering value={subrow.pinjaman} />
                    </TableCell>
                    <TableCell className="border-x border-x-black">
                      <FormatNumbering value={subrow.angsuran} />
                    </TableCell>
                    <TableCell className="border-x border-x-black">
                      <FormatNumbering value={subrow.saldo} />
                    </TableCell>
                    <TableCell>{subrow.notes}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-100">
                  <TableCell className="py-3" colSpan={9}>
                    <b>Total</b>
                  </TableCell>
                  <TableCell className="border-x border-x-black">
                    <FormatNumbering
                      value={calculateTotals(row.data, 'pinjaman')}
                    />
                  </TableCell>

                  <TableCell className="border-x border-x-black">
                    <FormatNumbering
                      value={calculateTotals(row.data, 'angsuran')}
                    />
                  </TableCell>
                  <TableCell className="border-x border-x-black">
                    <FormatNumbering
                      value={calculateTotals(row.data, 'saldo')}
                    />
                  </TableCell>
                  <TableCell className="py-3"></TableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell>a</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Action
        datas={data}
        show={show}
        onClosed={onClosedShowOpen}
        triggeredId={triggeredId}
      />
    </div>
  );
};

export default AngsuranByDateTable;
