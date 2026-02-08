import MobileLayout from '@/Layouts/MobileLayout';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  BookA,
  BookCheck,
  BookMarked,
  HandCoinsIcon,
  Layers,
  Notebook,
  UserX,
} from 'lucide-react';
import React from 'react';

const Index = () => {
  const { auth } = usePage().props;
  return (
    <MobileLayout>
      <fieldset className="grid gap-6 p-4 border rounded-lg">
        <legend className="px-1 -ml-1 text-sm font-medium">Mantri</legend>

        <div className="flex items-center justify-around gap-6">
          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.create')}>
                <MagnifyingGlassIcon className="h-7 w-7" />
              </Link>
            </Button>
            {/* CREATE PAGE */}
            <div>Pengajuan</div>
          </div>

          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.transaksi')}>
                <Layers className="h-7 w-7" />
              </Link>
              {/* MANTRI DROP PAGE */}
            </Button>
            <div>Drop</div>
          </div>

          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.angsuran')}>
                <HandCoinsIcon className="h-7 w-7" />
              </Link>
            </Button>
            <div>Angsuran</div>
          </div>
          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.macet')}>
                <UserX className="h-7 w-7" />
              </Link>
            </Button>
            <div>Macet</div>
          </div>
        </div>
      </fieldset>
      <fieldset className="grid gap-6 p-4 mt-3 border rounded-lg">
        <legend className="px-1 -ml-1 text-sm font-medium">Laporan</legend>
        <div className="flex items-center justify-around gap-6">
          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.buku_angsuran')}>
                <BookA className="h-7 w-7" />
              </Link>
            </Button>
            <div>Buku Angsuran</div>
          </div>
          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.byDates')}>
                <UserX className="h-7 w-7" />
              </Link>
            </Button>
            <div>Cari Per Bulan</div>
          </div>
          <div className="text-center">
            <Button size="icon2xl" variant="outline" asChild>
              <Link href={route('mobile_apps.rekap_permantri')}>
                <HandCoinsIcon className="h-7 w-7" />
              </Link>
            </Button>
            <div>Rekap Mantri</div>
          </div>
        </div>
      </fieldset>
      {auth.permissions.includes('can update') && (
        <fieldset className="grid gap-6 p-4 mt-3 border rounded-lg">
          <legend className="px-1 -ml-1 text-sm font-medium">
            Menu Kepala & Pimpinan
          </legend>
          <div className="flex flex-wrap items-center justify-around gap-6">
            <div className="text-center">
              <Button size="icon2xl" variant="outline" asChild>
                <Link href={route('home')}>
                  <MagnifyingGlassIcon className="h-7 w-7" />
                </Link>
              </Button>
              <div>Web Apps</div>
            </div>
            <div className="text-center">
              <Button size="icon2xl" variant="outline" asChild>
                <Link href={route('mobile_apps.buku_transaksi_kepala')}>
                  <BookMarked className="h-7 w-7" />
                </Link>
              </Button>
              <div>Buku Transaksi</div>
            </div>
            <div className="text-center">
              <Button size="icon2xl" variant="outline" asChild>
                <Link href={route('mobile_apps.rencana_drop_kepala')}>
                  <BookMarked className="h-7 w-7" />
                </Link>
              </Button>
              <div>Rencana Drop</div>
            </div>
            <div className="text-center">
              <Button size="icon2xl" variant="outline" asChild>
                <Link href={route('mobile_apps.rekap_dua')}>
                  <BookMarked className="h-7 w-7" />
                </Link>
              </Button>
              <div>Rekap Pimpinan</div>
            </div>
            <div className="text-center">
              <Button size="icon2xl" variant="outline" asChild>
                <Link href={route('mobile_apps.rekap_satu')}>
                  <BookMarked className="h-7 w-7" />
                </Link>
              </Button>
              <div>Rekap Kasir</div>
            </div>
          </div>
        </fieldset>
      )}
    </MobileLayout>
  );
};

export default Index;
