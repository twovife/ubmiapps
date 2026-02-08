import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import { Badge } from '@/shadcn/ui/badge';
import dayjs from 'dayjs';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';

const ActionTable = ({ datas }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(datas);
  }, [datas]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Tanggal Pengajuan</TableHead>
            <TableHead className="text-center">Nomor Pengajuan</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Nama Nasabah</TableHead>
            <TableHead className="text-center">NIK</TableHead>
            <TableHead className="text-center">Alamat</TableHead>
            <TableHead className="text-center">Unit</TableHead>
            <TableHead className="text-center">Kelompok</TableHead>
            <TableHead className="text-center">Pengajuan</TableHead>
            <TableHead className="text-center">Tgl Drop</TableHead>
            <TableHead className="text-center">Kelompok</TableHead>
            <TableHead className="text-center">Pinj Ke</TableHead>
            <TableHead className="text-center">Acc</TableHead>
            <TableHead className="text-center">Drop Jadi</TableHead>
          </TableRow>
        </TableHeader>
        {data && (
          <TableBody>
            <TableRow className="text-center">
              <TableCell>{dayjs(data.request_date).format('DD/MM')}</TableCell>
              <TableCell>{data.nomor_pengajuan}</TableCell>
              <TableCell>
                <BadgeStatus value={data.status} />
              </TableCell>
              <TableCell>{data.nama}</TableCell>
              <TableCell>{data.nik}</TableCell>
              <TableCell>{data.alamat}</TableCell>
              <TableCell>{data.unit}</TableCell>
              <TableCell>{data.kelompok}</TableCell>
              <TableCell>
                <FormatNumbering value={data.request} />
              </TableCell>
              <TableCell>{dayjs(data.tanggal_drop).format('DD/MM')}</TableCell>
              <TableCell>{data.kelompok}</TableCell>
              <TableCell>{data.pinjaman_ke}</TableCell>
              <TableCell>{data.acc}</TableCell>
              <TableCell>{data.drop_jadi}</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ActionTable;
