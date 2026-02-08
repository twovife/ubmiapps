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
import { toast } from 'sonner';
import { Toaster } from '@/shadcn/ui/sonner';
import { useIsMobile } from '@/Hooks/use-mobile';
import { Copy } from 'lucide-react';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import { Button } from '@/shadcn/ui/button';
import Pengajuan from './Pengajuan';
import Loading from '@/Components/Loading';
import '../../../../css/loader.css';

const Action = ({ datas, show = false, onClosed, triggeredId }) => {
  const isMobile = useIsMobile();
  const {
    auth,
    server_filter: { closed_transaction },
  } = usePage().props;
  const hasPermission = auth?.permissions?.includes('maintenance worker');

  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState(false);
  const { isCreator } = useFrontEndPermission();
  const [customerData, setCustomerData] = useState({});
  const [pemutihan, setPemutihan] = useState(null);

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
        setPemutihan(data.pemutihan);
      })
      .catch(function ({ response }) {
        setErorAxios(true);
      });
  };
  // check is pengajuan exist

  useEffect(() => {
    if (triggeredId) {
      onNikSubmit(triggeredId);
    }
  }, [triggeredId, datas]);

  const modalIsClosed = () => {
    onClosed();
    setCustomerData({});
    setInstalment([]);
    setPemutihan(null);
  };

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : modalIsClosed())}>
      <DialogContent className={`w-[95vw] p-1 lg:p-6`}>
        <DialogHeader className={'max-h-10'}>
          <DialogTitle className="p-2">Isi Angsurans</DialogTitle>
          {/* <Button type="button" /> */}
        </DialogHeader>
        <div className="h-[80vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Rincian Nasabah</CardTitle>
            </CardHeader>
            <CardContent className="p-1 lg:p-5">
              <div className="w-full overflow-auto">
                <Toaster />
                {isMobile ? (
                  <MobileCardList customerData={customerData} />
                ) : (
                  <PinjamanWebTable customerData={customerData} />
                )}
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col w-full gap-3 mt-3 lg:flex-row">
            <Card className="flex-5">
              <CardHeader>
                <CardTitle>Rincian Angsuran</CardTitle>
              </CardHeader>
              <CardContent className="p-1 lg:p-5">
                {pemutihan && (
                  <div className="w-full">
                    <Table className="text-xs">
                      <TableHeader className="bg-gray-200">
                        <TableRow>
                          <TableHead className="text-center">
                            Tanggal Pemutihan
                          </TableHead>
                          <TableHead className="text-center">
                            Nominal Pemutihan
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="text-center">
                          <TableCell>
                            {dayjs(pemutihan.transaction_date).format(
                              'DD-MM-YYYY'
                            )}
                          </TableCell>
                          <TableCell>
                            <FormatNumbering
                              className="text-center"
                              value={pemutihan.nominal}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}

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
                            <TableCell>
                              <FormatNumbering value={item.saldo} />
                            </TableCell>
                            <TableCell className="hidden lg:block">
                              {item.mantri}
                            </TableCell>
                            <TableCell>
                              {' '}
                              <StatusPinjaman value={item.status} />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : erorAxios ? (
                        <TableRow>
                          <TableCell className="font-semibold text-red-500">
                            TERJADI KESALAHAN SAAT PENGAMBILAN DATA, MOHON
                            REFRESH BROWSER
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
            <div className="flex-2 relative">
              {customerData.lunas == true ? (
                <NoEditOverlay value="Pinjaman Sudah Lunas" />
              ) : (
                !isCreator && (
                  <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Mengedit" />
                )
              )}
              {loading ? (
                <div>Loading</div>
              ) : (
                <>
                  <BayarAngsuran
                    triggeredId={customerData.id}
                    triggeredPinjaman={customerData}
                    instalment={instalment}
                  />
                  <Pengajuan
                    triggeredId={customerData.id}
                    triggeredPinjaman={customerData}
                    instalment={instalment}
                  />
                  <JenisNasabah loan={customerData} />
                  <div className="flex items-center justify-end gap-3 p-3">
                    <div className="font-semibold">Hapus Pinjaman</div>
                    <DeleteLoan id={customerData.id} onClosed={modalIsClosed} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Action;

const PinjamanWebTable = ({ customerData }) => {
  return (
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
          <TableHead className="text-center">Tanggal Drop</TableHead>
          <TableHead className="text-center">Pinjaman</TableHead>
          <TableHead className="text-center">Nama Mantri</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Ket</TableHead>
          <TableHead className="text-center">Keluar Target</TableHead>
          <TableHead className="text-center">Lunas</TableHead>
        </TableRow>
      </TableHeader>
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
              {dayjs(customerData.tanggal_drop).format('DD-MM-YYYY')}
            </TableCell>
            <TableCell>
              <FormatNumbering value={customerData.pinjaman} />
            </TableCell>
            <TableCell>{customerData.mantri}</TableCell>
            <TableCell>
              <StatusPinjaman value={customerData.status_pinjaman} />
            </TableCell>
            <TableCell>{customerData.notes}</TableCell>
            <TableCell>
              {customerData.out_date
                ? dayjs(customerData.out_date).format('DD/MM')
                : ''}
            </TableCell>
            <TableCell>
              <StatusPinjaman value={customerData.lunas ? 'Lunas' : 'Belum'} />
            </TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell>Menunggu data . . .</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const MobileCardList = ({ customerData }) => {
  const sooners = (value) => {
    toast('Nik Telah Dicopy');
    navigator.clipboard.writeText(value);
  };
  if (!customerData || customerData.length === 0) {
    return <p className="text-center text-muted">Data tidak tersedia.</p>;
  }

  return (
    <div className="w-full max-w-md overflow-hidden text-xs bg-white rounded-lg shadow-lg">
      <div className="p-6 space-y-4">
        <div className="pb-4 border-b">
          <h3 className="text-lg font-semibold text-center text-red-500">
            {customerData.nama}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm text-gray-500">NIK: {customerData.nik}</p>
            <div
              className="text-blue-500"
              onClick={() => sooners(customerData.nik)}
            >
              <Copy className="h-4" />
            </div>
          </div>
          <div className="text-center">{customerData.alamat}</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Nomor:</span>
            <span className="text-gray-800">{customerData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <BadgeStatus value={customerData.status_pinjaman} />
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Unit:</span>
            <span className="text-gray-800">{customerData.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Kelompok:</span>
            <span className="text-gray-800">{customerData.kelompok}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Tanggal Drop:</span>
            <span className="text-gray-800">
              {customerData.hari}
              {', '}
              {dayjs(customerData.tanggal_drop).format('DD-MM-YYYY')}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Pinjaman:</span>
            <span
              className={`font-bold ${
                customerData.acc === 'Ya' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <FormatNumbering
                className="text-center"
                value={customerData.pinjaman}
              />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Mantri:</span>
            <span className="text-gray-800">{customerData.mantri}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Ket:</span>
            <span className="text-gray-800">{customerData.notes}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Keluar Target:</span>
            <span className="text-gray-800">
              {customerData.out_date
                ? dayjs(customerData.out_date).format('DD/MM')
                : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">LUNAS:</span>
            <StatusPinjaman value={customerData.lunas ? 'Lunas' : 'Belum'} />
          </div>
        </div>
      </div>
    </div>
  );
};
