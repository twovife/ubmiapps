import React from 'react';
import NewNasabah from '@/Pages/NewLoan/NewNasabah';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/shadcn/ui/button';
import LinkButton from '@/Components/LinkButton';

const BatchUpload = () => {
  return (
    <Authenticated>
      <NewNasabah
        onClosed={() => void 0}
        generateAngsuran={true}
        typeInput={'text'}
        submitUrl={route('transaction.store_buku_transaksi_batch')}
      />
      <div className="absolute z-20 right-2 bottom-2">
        <LinkButton href={route('transaction.fastcreatev2')} color="outline">
          V2
        </LinkButton>
      </div>
    </Authenticated>
  );
};

export default BatchUpload;
