import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        green:
          'border-transparent bg-green-500 text-white shadow-sm hover:bg-green-500/80',
        yellow:
          'border-transparent bg-yellow-500 text-white shadow-sm hover:bg-yellow-500/80',
        blue: 'border-transparent bg-blue-500 text-white shadow-sm hover:bg-blue-500/80',
        new: 'border-green-500 bg-transparent text-green-500 shadow-sm hover:border-green-500/80 hover:text-green-500/80',
        old: 'border-amber-500 bg-transparent text-amber-500 shadow-sm hover:border-amber-500/80 hover:text-amber-500/80',
        greenoutline:
          'border-green-500 bg-transparent text-green-500 shadow-sm hover:border-green-500/80 hover:text-green-500/80',
        outline: 'text-foreground',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-base',
        xl: 'px-4 py-1.5 text-lg',
        xs: 'px-1 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Badge({ className, variant, size, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
