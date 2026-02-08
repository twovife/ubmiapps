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
import BargeStatus from '@/Components/shadcn/BargeStatus';
import { Input } from '@/shadcn/ui/input';
import TextInput from '@/Components/TextInput';
import { X } from 'lucide-react';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';

const AngsuranTableMobile = ({ dateOfWeek, datas }) => {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (datas) {
      const filterData = (data) => {
        return data.map((monthData) => ({
          ...monthData,
          data: monthData.data.filter(
            (item) =>
              !(item.lunas && !item.is_paid) &&
              (!filterName ||
                item.nama.toLowerCase().includes(filterName.toLowerCase()))
          ),
        }));
      };

      const filteredData = filterData(datas);

      setData(filteredData);
    }
  }, [datas, filterName]);

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
    <div className="relative overflow-auto h-[70vh] lg:h-[85vh] scrollbar-none">
      <Table className="text-xs rounded-lg">
        <TableHeader className="sticky top-0 left-0 z-10">
          <TableRow>
            <TableHead colSpan="4" className="bg-white">
              <div className="relative w-full mb-2 lg:w-auto lg:max-w-60">
                <TextInput
                  type="text"
                  placeholder="Cari Nama"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full text-xs"
                />
                <X
                  className="absolute right-0 w-auto h-5 text-gray-400 -translate-x-1/2 -translate-y-1/2 top-1/2"
                  onClick={(e) => setFilterName('')}
                />
              </div>
            </TableHead>
          </TableRow>
          <TableRow className="bg-gray-200">
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Nasabah</TableHead>
            <TableHead className="text-center border-x border-x-black">
              Nominal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-tinny">
          {data ? (
            data.map((row, i) => (
              <React.Fragment key={i}>
                <TableRow>
                  <TableCell colSpan={17 + (dateOfWeek.length ?? 0)}>
                    <div className="flex items-center gap-3">
                      <BargeStatus value={row.type2} /> <div>{row.month}</div>
                    </div>
                  </TableCell>
                </TableRow>
                {row.data.map((subrow, i) => (
                  <TableRow
                    className={`${
                      subrow.is_paid
                        ? subrow.angs_today == 0
                          ? 'bg-red-300 hover:bg-red-400'
                          : 'bg-green-200 hover:bg-green-50'
                        : ''
                    }}`}
                    key={i}
                  >
                    <TableCell onClick={() => handleRowClick(subrow.id)}>
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 text-center">
                        <div>{dayjs(subrow.tanggal_drop).format('DD-MM')}</div>
                        <div>
                          <Button
                            size="xs"
                            variant={
                              subrow.lunas
                                ? 'green'
                                : subrow.is_paid
                                ? 'blue'
                                : 'default'
                            }
                            onClick={() => onCreateShowOpen(subrow.id)}
                          >
                            {subrow.lunas
                              ? 'Lunas'
                              : subrow.is_paid
                              ? 'Dibayar'
                              : 'Bayar'}
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold">
                        {subrow.nama}
                        {subrow.notes && (
                          <BadgeStatus className="ml-2">
                            {subrow.notes}
                          </BadgeStatus>
                        )}
                      </div>
                      <div>{subrow.nik}</div>
                      <div>{subrow.alamat}</div>
                    </TableCell>
                    <TableCell className="border-x border-x-black">
                      <div className="flex justify-between gap-6 ">
                        <div>P</div>
                        <FormatNumbering value={subrow.pinjaman} />
                      </div>

                      <div className="flex justify-between gap-6 border-b-2 border-b-black ">
                        <div>A</div>
                        <div className="flex gap-3">
                          <div className="italic whitespace-nowrap">
                            <FormatNumbering
                              value={subrow.angs_today}
                              prefix={'('}
                              suffix={')'}
                            />
                          </div>
                          <FormatNumbering value={subrow.angsuran} />
                        </div>
                      </div>

                      <div className="flex justify-between gap-6">
                        <div>S</div>
                        <div className="flex gap-3">
                          {subrow.pemutihan_today !== 0 && (
                            <div className="italic whitespace-nowrap">
                              <FormatNumbering
                                value={subrow.pemutihan_today}
                                prefix={'('}
                                suffix={')'}
                              />
                            </div>
                          )}
                          <FormatNumbering value={subrow.saldo} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-100">
                  <TableCell className="py-3" colSpan={3}>
                    TOTAL
                  </TableCell>
                  <TableCell className="border-x border-x-black">
                    <div className="flex justify-between gap-6">
                      <div>P</div>
                      <FormatNumbering
                        value={calculateTotals(row.data, 'pinjaman')}
                      />
                    </div>
                    <div className="flex justify-between gap-6 border-b-2 border-b-black ">
                      <div>A</div>
                      <div className="flex gap-3">
                        <div className="italic whitespace-nowrap">
                          <FormatNumbering
                            value={calculateTotals(row.data, 'angs_today')}
                            prefix={'('}
                            suffix={')'}
                          />
                        </div>
                        <FormatNumbering
                          value={calculateTotals(row.data, 'angsuran')}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between gap-6">
                      <div>S</div>
                      <FormatNumbering
                        value={calculateTotals(row.data, 'saldo')}
                      />
                    </div>
                  </TableCell>
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

export default AngsuranTableMobile;
