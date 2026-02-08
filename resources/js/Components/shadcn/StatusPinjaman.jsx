import { Badge } from '@/shadcn/ui/badge';
import React from 'react';

const StatusPinjaman = ({ value = 'normal' }) => {
  const valielue = value?.toLowerCase();

  switch (valielue) {
    case 'normal':
      return <Badge variant="outline">{value}</Badge>;
    case 'cm':
      return <Badge variant="yellow">{value}</Badge>;
    case 'mb':
      return <Badge variant="destructive">{value}</Badge>;
    case 'ml':
      return <Badge>{value}</Badge>;
    case 'lunas':
      return <Badge variant={'green'}>{value}</Badge>;
    case 'belum':
      return <Badge variant={'outline'}>{value}</Badge>;
    default:
      return <Badge>{value}</Badge>;
  }
};

export default StatusPinjaman;
