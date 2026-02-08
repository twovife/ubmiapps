import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import NewNasabah from '@/Pages/NewLoan/NewNasabah';

const Create = ({ show = false, onClosed }) => {
  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : onClosed())}>
      <DialogContent className="w-[90vw] h-[90vh] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        <DialogHeader className={'max-h-10'}>
          <DialogTitle>Pengajuan Pinjaman Baru</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <NewNasabah
            onClosed={onClosed}
            submitUrl={route('transaction.store_buku_transaksi')}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
