import React from 'react';

export default function SelectList({
  name,
  value,
  className,
  required = true,
  handleChange,
  options,
  nullvalue,
  ...props
}) {
  return (
    <select
      name={name}
      value={value}
      className={
        `flex h-9 w-full min-w-20 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1` +
        className
      }
      required={required}
      {...props}
    >
      {options ? (
        <>
          {nullvalue ? <option>Pilih Salah Satu</option> : null}
          {options.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.display}
            </option>
          ))}
        </>
      ) : (
        <option>Pilih Salah Satu</option>
      )}
    </select>
  );
}
