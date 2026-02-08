import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import axios from 'axios';
import RiwayatPengajuan from '../NewLoan/Components/RiwayatPengajuan';

import Acc from './Components/Acc';

import DetailTableOnAction from './Components/ActionTable';
import RemoveLoan from './Components/RemoveLoan';
import ReStatus from './Components/ReStatus';
import ChangeDetail from './Components/ChangeDetail';
import { usePage } from '@inertiajs/react';
import NoEditOverlay from '@/Components/NoEditOverlay';
import useFrontEndPermission from '@/Hooks/useFrontEndPermission';

const Action = ({ show = false, onClosed, triggeredData }) => {
  const [data, setData] = useState([]);
  const { isCreator } = useFrontEndPermission();

  const [customerData, setCustomerData] = useState([]);
  const [acc, setAcc] = useState();
  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState(false);

  useEffect(() => {
    setData(triggeredData);
    setAcc(triggeredData?.request);
  }, [triggeredData]);

  const onNikSubmit = async (signal) => {
    setLoading(true);
    setErorAxios();

    try {
      const { data } = await axios.post(
        route('transaction.nasabah_buku_transaksi'),
        { nik: triggeredData.nik },
        { signal } // 👈 inject signal buat cancel
      );

      setCustomerData(data.data ?? []);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request dibatalkan');
      } else {
        setErorAxios(error.response?.data?.message || 'Terjadi kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!triggeredData?.nik) return;

    const controller = new AbortController();
    onNikSubmit(controller.signal);

    return () => {
      controller.abort(); // ❌ cancel request saat komponen unmount / modal close
    };
  }, [triggeredData]);

  return (
    <>
      <Dialog open={show} onOpenChange={(open) => (open ? '' : onClosed())}>
        <DialogContent className="w-[98vw] p-2">
          <DialogHeader>
            <DialogTitle className="p-2">Check Transaksi Mantri</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="account">Action</TabsTrigger>
                  <TabsTrigger disabled={loading} value="history">
                    {loading ? 'Loading...' : 'Crash Kantor'}
                  </TabsTrigger>
                  <TabsTrigger disabled={loading} value="crashubmml">
                    {loading ? 'Loading...' : 'Crash (NT)'}
                  </TabsTrigger>
                  <TabsTrigger disabled={loading} value="crashubm">
                    {loading ? 'Loading...' : 'Crash (T)'}
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="account"
                  className="h-[80vh] overflow-auto scrollbar-thin"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Detail Pengajuan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="overflow-auto border rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
                        <DetailTableOnAction datas={data} />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col gap-3 mt-3 lg:flex-row">
                    <div className="w-full">
                      <Card className="relative mb-3">
                        <CardHeader>
                          <CardTitle>ACC / DROP</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-end justify-center gap-2 mx-auto mb-3">
                            <Acc
                              id={data?.nomor_pengajuan}
                              triggeredData={data}
                              onClosed={onClosed}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="relative">
                        {!isCreator && (
                          <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Mengedit" />
                        )}
                        <CardHeader>
                          <CardTitle>Admin Edit</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            {data && (
                              <ChangeDetail
                                onClosed={onClosed}
                                triggeredData={triggeredData}
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="relative w-full">
                      {!isCreator && (
                        <NoEditOverlay value="User Tidak Dapat Digunakan Untuk Mengedit" />
                      )}
                      <CardHeader>
                        <CardTitle>Remove Loan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="w-full mt-6 mb-3 text-start">
                          <p className="text-lg font-semibold text-red-500">
                            Hapus Pinjaman
                          </p>
                          <p className="mb-1 text-xs italic font-light text-red-500">
                            Perhatian !!!, Jika pengajuan berstatus sukses, maka
                            pengajuan sudah masuk dalam daftar angsuran, jika
                            tetap dihapus akan mempengaruhi data pada angsuran,
                            dan angsuran akan ikut terhapus.
                            <br /> ( Penghapusan hanya bisa dilakukan 2hari dari
                            tanggal drop (Mantri) dan 2bulan (Admin & Kepala))
                          </p>
                          <div className="text-right">
                            <RemoveLoan
                              triggeredId={data?.nomor_pengajuan}
                              onClosed={onClosed}
                            />
                          </div>
                        </div>
                        <Accordion className="mb-3" type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Tambahan</AccordionTrigger>
                            <AccordionContent>
                              <div className="text-sm">
                                <ul className="list-disc list-outside">
                                  <li>
                                    1. Jika ada kesalahan pada angsuran baru (
                                    angsuran hari ini ) utamakan menghapus, dan
                                    buat angsuran lagi.
                                  </li>
                                  <li>
                                    2. Jika terjadi kesalahan Status * Tanggal,
                                    usahakan untuk ganti tanggal ( tanggal drop
                                    / tanggal request ) dan dan reset status
                                    setelah itu
                                  </li>
                                  <li>
                                    3. Setelah mengganti Detail pada angsuran,
                                    dimohon untuk cek ulang, storting & dan
                                    transaksi lagi, dikarenakan perubahan pada
                                    detail, akan mempengaruhi laporan lainnya
                                  </li>
                                  <li className="text-red-500">
                                    4. Reset Status Hanya Tersedia jika pinjaman
                                    adalah drop lama / pengajuan
                                  </li>
                                </ul>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent
                  value="history"
                  className="h-[80vh] overflow-auto scrollbar-thin"
                >
                  <div className="overflow-auto scrollbar-thin h-max">
                    <div className="mb-1">
                      Crash Antar Kelompok Dalam 1 Kantor
                    </div>
                    <RiwayatPengajuan data={customerData.history_branch} />
                  </div>
                </TabsContent>
                <TabsContent
                  value="crashubmml"
                  className="h-[80vh] overflow-auto scrollbar-thin"
                >
                  <div className="overflow-auto scrollbar-thin h-max">
                    <div className="mb-1">
                      Crash Kantor Lain Dalam UBM (Macet)
                    </div>
                    <RiwayatPengajuan data={customerData.history_macet_lain} />
                  </div>
                </TabsContent>
                <TabsContent
                  value="crashubm"
                  className="h-[80vh] overflow-auto scrollbar-thin"
                >
                  <div className="overflow-auto scrollbar-thin h-max">
                    <div className="mb-1">
                      Crash Kantor Lain Dalam UBM (Target)
                    </div>
                    <RiwayatPengajuan data={customerData.history_target} />
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Action;
