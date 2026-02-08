import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import dayjs from 'dayjs';
import FormatNumbering from '@/Components/shadcn/FormatNumbering';
import StatusPinjaman from '@/Components/shadcn/StatusPinjaman';
import BayarAngsuran from './BayarAngsuran';
import JenisNasabah from './JenisNasabah';
import DeleteAngsuran from './DeleteAngsuran';
import DeleteLoan from './DeleteLoan';
import { usePage } from '@inertiajs/react';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';
import NoEditOverlay from '@/Components/NoEditOverlay';

const xAction = ({ datas, show = false, onClosed, triggeredId }) => {
  const {
    server_filter: { closed_transaction },
  } = usePage().props;

  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState(false);
  const { isCreator } = useFrontEndPermission();
  const [customerData, setCustomerData] = useState({});

  const [instalment, setInstalment] = useState([]);

  const onNikSubmit = async (triggeredId) => {
    setLoading(true);
    setErorAxios();
    await axios({
      method: 'get',
      url: route('pinjaman.get_loan_pinjaman', triggeredId),
    })
      .then(function ({ data }) {
        setLoading(false);
        setCustomerData(data.pinjaman);
        setInstalment(data.instalment);
      })
      .catch(function ({ response }) {
        setErorAxios();
      });
  };

  useEffect(() => {
    if (triggeredId) {
      onNikSubmit(triggeredId);
    }
  }, [triggeredId, datas]);

  const modalIsClosed = () => {
    onClosed();
    setCustomerData({});
    setInstalment([]);
  };

  const revisiAngsuranLink = `https://api.whatsapp.com/send?phone=6281233302284&text=saya%20dari%20%3A%20(%20ganti%20nama%20dan%20dari%20kantor%20mana%20)%0Aminta%20tolong%20untuk%20revisi%20data%20dengan%20nomor%20${
    triggeredId ?? null
  }.%0A(%20jangan%20hapus%20nomor%2C%20sebutkan%20revisi%20setelah%20nomor%20)`;

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : modalIsClosed())}>
      {/* <Loading show={loading || processing} /> */}
      <DialogContent className={`w-[97vw] p-1 lg:p-6`}>
        <DialogHeader className={'max-h-10'}>
          <DialogTitle className="p-2">Isi Angsuransxx</DialogTitle>
        </DialogHeader>
        <div className=" h-[90vh] overflow-auto lg:scrollbar-thin scrollbar-none">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Rincian Pinjaman</CardTitle>
            </CardHeader>
            <CardContent className="p-1 lg:p-5">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader className="bg-gray-200">
                    <TableRow>
                      <TableHead className="text-center">Nomor</TableHead>
                      <TableHead className="text-center">Nasabah</TableHead>
                      <TableHead className="text-center">NIK</TableHead>
                      <TableHead className="text-center">Alamat</TableHead>
                      <TableHead className="text-center">Unit</TableHead>
                      <TableHead className="text-center">Kelompok</TableHead>
                      <TableHead className="text-center">Hari</TableHead>
                      <TableHead className="text-center">
                        Tanggal Drop
                      </TableHead>
                      <TableHead className="text-center">Pinjaman</TableHead>
                      <TableHead className="text-center">Nama Mantri</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Ket</TableHead>
                      <TableHead className="text-center">Lunas</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/*  */}
                  <TableBody>
                    {Object.keys(customerData).length !== 0 ? (
                      <TableRow className="text-center">
                        <TableCell>{customerData.id}</TableCell>
                        <TableCell>{customerData.nama}</TableCell>
                        <TableCell>{customerData.nik}</TableCell>
                        <TableCell>{customerData.alamat}</TableCell>
                        <TableCell>{customerData.branch}</TableCell>
                        <TableCell>{customerData.kelompok}</TableCell>
                        <TableCell>{customerData.hari}</TableCell>
                        <TableCell>
                          {dayjs(customerData.tanggal_drop).format(
                            'DD-MM-YYYY'
                          )}
                        </TableCell>
                        <TableCell>
                          <FormatNumbering value={customerData.pinjaman} />
                        </TableCell>
                        <TableCell>{customerData.mantri}</TableCell>
                        <TableCell>
                          <StatusPinjaman
                            value={customerData.status_pinjaman}
                          />
                        </TableCell>
                        <TableCell>{customerData.notes}</TableCell>
                        <TableCell>
                          <StatusPinjaman
                            value={customerData.lunas ? 'Lunas' : 'Belum'}
                          />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell>Menunggu data . . .</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col w-full gap-3 mt-3 lg:flex-row">
            <Card className="flex-5">
              <CardHeader>
                <CardTitle>Rincian Angsuran</CardTitle>
              </CardHeader>
              <CardContent className="p-1 lg:p-5">
                <div className="w-full overflow-auto">
                  <Table className="text-xs">
                    <TableHeader className="bg-gray-200">
                      <TableRow>
                        <TableHead className="text-center">Action</TableHead>
                        <TableHead className="text-center">Tanggal</TableHead>
                        <TableHead className="text-center">Jumlah</TableHead>
                        <TableHead className="text-center">Saldo</TableHead>
                        <TableHead className="hidden text-center lg:table-cell">
                          Mantri
                        </TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(customerData).length !== 0 ? (
                        instalment.map((item) => (
                          <TableRow className="text-center">
                            <TableCell>
                              {(!closed_transaction ||
                                closed_transaction <=
                                  item.transaction_date) && (
                                <DeleteAngsuran id={item.id} />
                              )}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {dayjs(item.transaction_date).format('DD-MM-YY')}
                            </TableCell>
                            <TableCell
                              className={`${
                                item.danatitipan == 1
                                  ? 'text-red-500 font-semibold'
                                  : ''
                              }`}
                            >
                              <FormatNumbering value={item.nominal} />
                            </TableCell>
                            <TableCell>{item.saldo}</TableCell>
                            <TableCell className="hidden lg:block">
                              {item.mantri}
                            </TableCell>
                            <TableCell>
                              {' '}
                              <StatusPinjaman value={item.status} />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell>Menunggu data . . .</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <div className="flex-2 relative">
              {customerData.lunas == true ? (
                <NoEditOverlay value="Pinjaman Sudah Lunas" />
              ) : (
                !isCreator && (
                  <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Mengedit" />
                )
              )}
              <BayarAngsuran
                triggeredId={customerData.id}
                triggeredPinjaman={customerData}
                instalment={instalment}
              />
              <JenisNasabah loan={customerData} />
              <div className="mt-3 text-red-400 text-tinny text-end">
                JIKA TERJADI KESALAHAN TERHADAP ANGSURAN INI, BISA LAPORKAN
                MELALUI TOMBOL DIBAWAH
                <br />
                <a
                  href={revisiAngsuranLink}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Laporkan
                </a>
              </div>
              {/* <div className="flex items-center justify-end gap-3 p-3">
                <div className="font-semibold">Hapus Pinjaman</div>
                <DeleteLoan id={customerData.id} onClosed={modalIsClosed} />
              </div> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default xAction;
