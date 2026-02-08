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
};
const BargeStatus = ({ value, children, onClick, ...props }) => {
  const variant = variantMap[value] || 'default';
  return (
    <Button {...props} onClick={onClick} size="xs" variant={variant}>
      {children ?? value}
    </Button>
  );
};

export default BargeStatus;
