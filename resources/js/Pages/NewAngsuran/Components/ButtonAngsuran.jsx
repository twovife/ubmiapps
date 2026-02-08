import { Button } from '@/shadcn/ui/button';
import React from 'react';

const ButtonAngsuran = ({
  nominalPembayaran,
  pelunasan,
  onClickButton,
  index,
}) => {
  const buttonValueClick = (e) => {
    const value = e.target.getAttribute('data-value');
    onClickButton(value, index);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {nominalPembayaran &&
        nominalPembayaran.map((item) => (
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={buttonValueClick}
            data-value={item}
          >
            {(item / 1000).toLocaleString('id-ID')} Rb
          </Button>
        ))}
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={buttonValueClick}
        data-value={pelunasan}
      >
        {(pelunasan / 1000).toLocaleString('id-ID')} Rb
      </Button>
    </div>
  );
};

export default ButtonAngsuran;
