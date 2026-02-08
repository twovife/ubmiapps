import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import React from 'react';
const variantMap = {
  open: 'blue',
  acc: 'yellow',
  success: 'green',
  tolak: 'default',
  gagal: 'destructive',
  lama: 'outline',
  baru: 'yellow',
  true: 'green',
  false: 'destructive',
  ml: 'default',
  mb: 'destructive',
  cm: 'yellow',
  normal: 'green',
  lunas: 'greenoutline',
  belum_lunas: 'outline',
};
const BadgeStatus = ({ value, onClick, children, ...props }) => {
  const variant = variantMap[value] || 'default';
  return (
    <Badge {...props} onClick={onClick} size="xs" variant={variant}>
      {children ?? value}
    </Badge>
  );
};
export default BadgeStatus;
