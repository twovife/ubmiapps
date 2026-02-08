import React from 'react';

export default function SelectList({
  name,
  value,
  className,
  required = true,
  handleChange,
  options,
  nullValue,
  nullvalue,
  ...props
}) {
  return (
    <select
      name={name}
      value={value}
      className={
        `flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-` +
        className
      }
      required={required}
      {...props}
    >
      {options ? (
        <>
          {nullValue || nullvalue ? (
            <option value={''}>Pilih Salah Satu</option>
          ) : null}
          {options.map((opt) => (
            <option
              key={opt.id}
              value={opt.value}
              // selected={opt.selected || false}
            >
              {opt.display}
            </option>
          ))}
        </>
      ) : (
        <option value={''}>Pilih Salah Satu</option>
      )}
    </select>
  );
}
