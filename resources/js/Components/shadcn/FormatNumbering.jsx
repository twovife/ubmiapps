import React from 'react';
import { NumericFormat } from 'react-number-format';

const FormatNumbering = ({
  value = 0,
  prefix,
  suffix,
  className = 'text-end',
}) => {
  return (
    <div className={`${className}`}>
      <NumericFormat
        value={value}
        displayType={'text'}
        thousandSeparator={','}
        prefix={prefix ?? ''}
        suffix={suffix ?? ''}
      />
    </div>
  );
};

export default FormatNumbering;
