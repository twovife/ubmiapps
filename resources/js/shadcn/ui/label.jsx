import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef(
  ({ className, optional, nomb = false, ...props }, ref) => (
    <div className={`flex items-end ${nomb ? 'mb-0' : 'mb-1'}`}>
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
      />
      <small className={`${optional && 'text-gray-300 italic'} text-xs ml-2`}>
        {optional && `(optional)`}
      </small>
    </div>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
