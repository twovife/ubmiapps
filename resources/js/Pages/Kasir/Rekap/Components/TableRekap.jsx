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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion';
import { CheckCircle, XCircle } from 'lucide-react';

const TableRekap = ({
  setOnShowModal,
  saldoAwalBulan,
  setTriggeredData,
  datas,
}) => {
  const [data, setData] = useState([]);
  const [sirkulasiAwal, setSirkulasiAwal] = useState([]);
  useEffect(() => {
    setData(datas);
    setSirkulasiAwal(saldoAwalBulan);
  }, [datas, saldoAwalBulan]);

  const calculateTotals = (data, keyToSum) => {
    const result = data.reduce(
      (acc, item) => acc + parseInt(item[keyToSum] ?? 0),
      0
    );
    return result;
  };

  return (
    <div>
      <Accordion type="single" collapsible className="mb-3">
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-3">Saldo Awal Bulan</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-center">Kelompok</TableHead>
                  <TableHead className="text-center">Surkulasi</TableHead>
                  <TableHead className="text-center">Saldo CM</TableHead>
                  <TableHead className="text-center">Saldo MB</TableHead>
                  <TableHead className="text-center">Saldo ML</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-tinny">
                {sirkulasiAwal.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{item.kelompok}</TableCell>
                    <TableCell>
                      <FormatNumbering value={item.sirkulasi} />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering value={item.sirkulasiCm} />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering value={item.sirkulasiMb} />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering value={item.sirkulasiMl} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="max-h-[65vh] border rounded-lg overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        <Table className="w-full mb-3 table-auto">
          <TableHeader className="sticky top-0 z-10 bg-gray-100">
            <TableRow>
              <TableHead className="text-center">Tanggal</TableHead>
              <TableHead className="text-center">Kelompok</TableHead>
              <TableHead className="text-center">Drop</TableHead>
              <TableHead className="text-center">Jumlah Drop</TableHead>
              <TableHead className="text-center">Storting</TableHead>
              <TableHead className="text-center">Jumlah Storting</TableHead>
              <TableHead className="text-center">Sirkulasi</TableHead>
              <TableHead className="text-center">Angsuran CM</TableHead>
              <TableHead className="text-center">Jumlah CM</TableHead>
              <TableHead className="text-center">Saldo CM</TableHead>
              <TableHead className="text-center">Angsuran MB</TableHead>
              <TableHead className="text-center">Jumlah MB</TableHead>
              <TableHead className="text-center">Saldo MB</TableHead>
              <TableHead className="text-center">Angsuran ML</TableHead>
              <TableHead className="text-center">Jumlah ML</TableHead>
              <TableHead className="text-center">Saldo ML</TableHead>
              <TableHead className="text-center">Cek Staff</TableHead>
              <TableHead className="text-center">Cek Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((item, key) => (
                <>
                  <TableRow
                    key={key}
                    className={`${
                      dayjs(item.tanggal).format('dddd') == 'Senin'
                        ? 'bg-red-300 hover:bg-red-400'
                        : ''
                    }`}
                  >
                    <TableCell className="whitespace-nowrap" colSpan="18">
                      {dayjs(item.tanggal).format('dddd')},
                      {dayjs(item.tanggal).format('DD-MM-YYYY')}
                    </TableCell>
                  </TableRow>

                  {item.data.map((subitem, subkey) => (
                    <TableRow key={subkey}>
                      <TableCell></TableCell>
                      <TableCell>{subitem.kelompok}</TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.drop} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.total_drop} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.storting} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.total_storting} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.sirkulasi} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.angsuran_cm} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.total_angsuran_cm} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.saldo_cm} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.angsuran_mb} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.total_angsuran_mb} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.saldo_mb} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.angsuran_ml} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.total_angsuran_ml} />
                      </TableCell>
                      <TableCell>
                        <FormatNumbering value={subitem.saldo_ml} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {subitem.status_approve_kasir ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <XCircle className="text-red-500" />
                          )}
                        </div>
                        {/* {subitem.status_approve_kasir
                          ? dayjs(subitem.status_approve_kasir).format('DD-MM')
                          : ''} */}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center ">
                          {subitem.status_approve_kepala ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <XCircle className="text-red-500" />
                          )}
                        </div>
                        {/* {subitem.status_approve_kepala
                          ? dayjs(subitem.status_approve_kepala).format('DD-MM')
                          : ''} */}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="bg-gray-100">
                    <TableCell></TableCell>
                    <TableCell className="font-semibold">TOTAL</TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'drop')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'total_drop')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'storting')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'total_storting')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'sirkulasi')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'angsuran_cm')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'total_angsuran_cm')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'saldo_cm')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'angsuran_mb')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'total_angsuran_mb')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'saldo_mb')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'angsuran_ml')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'total_angsuran_ml')}
                      />
                    </TableCell>
                    <TableCell>
                      <FormatNumbering
                        value={calculateTotals(item.data, 'saldo_ml')}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default TableRekap;
