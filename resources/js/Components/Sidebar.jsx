import { Transition } from '@headlessui/react';
import React from 'react';
import DropdownButton from './shadcn/DropDownButton';
import ButtonMenu from './ButtonMenu';
import { usePage } from '@inertiajs/react';
import { Button } from '@/shadcn/ui/button';
import MenuButton from './shadcn/MenuButton';

const Sidebar = ({ isOpen }) => {
  const { auth } = usePage().props;
  const unitAkses = auth.permissions.includes('unit apps');

  return (
    <aside
      className={`bg-white text-slate-900 w-64 fixed top-16 left-0 bottom-0 z-40 transition-all ease-in-out duration-300 border-r shadow ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <div className="px-4 py-4 font-semibold border-b">Apps Menu</div>
      <div className="p-4 space-y-4">
        <MenuButton
          href={route('home')}
          title={'Home'}
          active={route().current('home')}
        />
        {unitAkses && (
          <>
            <MenuButton
              active={route().current('administrasi.manpower.index')}
              href={route('administrasi.manpower.index')}
              title="Data Karyawan"
            />

            <DropdownButton
              title="Buku Transaksi"
              active={route().current('transaction.*')}
              items={[
                {
                  id: 1,
                  title: 'Buku Transaksi Mantri',
                  link: route('transaction.index_buku_transaksi'),
                  active: route().current('transaction.index_buku_transaksi'),
                },
                {
                  id: 2,
                  title: 'Fast Create',
                  link: route('transaction.fastcreate'),
                  active: route().current('transaction.fastcreate'),
                },
              ]}
            />

            <DropdownButton
              title="Angsuran"
              active={route().current('pinjaman.*')}
              items={[
                {
                  id: 1,
                  title: 'Angsuran Lancar',
                  link: route('pinjaman.index_pinjaman'),
                  active: route().current('pinjaman.index_pinjaman'),
                },
                {
                  id: 3,
                  title: 'Macet',
                  link: route('pinjaman.index_pinjaman_macet'),
                  active: route().current('pinjaman.index_pinjaman_macet'),
                },
                {
                  id: 2,
                  title: 'Cari Angsuran',
                  link: route('pinjaman.index_pinjaman_search'),
                  active: route().current('pinjaman.index_pinjaman_search'),
                },
              ]}
            />

            <DropdownButton
              title="Rekap"
              active={route().current('kasir.rekap.*')}
              items={[
                {
                  id: 2,
                  title: 'Rekap 1 & Tunai Mantri',
                  link: route('kasir.rekap.rekap_satu'),
                  active: route().current('kasir.rekap.rekap_satu'),
                },
                {
                  id: 1,
                  title: auth.permissions.includes('unit apps')
                    ? 'Rekap 2'
                    : 'Rekap Pimpinan',
                  link: route('kasir.rekap.rekap_dua'),
                  active: route().current('kasir.rekap.rekap_dua'),
                },
                {
                  id: 3,
                  title: 'Rencana Drop',
                  link: route('kasir.rekap.rencana_drop'),
                  active: route().current('kasir.rekap.rencana_drop'),
                },
                {
                  id: 4,
                  title: 'Rekap Mantri',
                  link: route('kasir.rekap.rekap_permantri'),
                  active: route().current('kasir.rekap.rekap_permantri'),
                },
              ]}
            />
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
