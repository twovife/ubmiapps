import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, type, isFocused = false, ...props }, ref) => {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (isFocused) {
        inputRef.current?.focus();
      }
    }, []);

    return (
      <input
        type={type}
        className={cn(
          'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
