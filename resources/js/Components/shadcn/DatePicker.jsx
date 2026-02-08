import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/ui/button';
import { Calendar } from '@/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/ui/select';
import { format, getMonth, getYear, min, setMonth, setYear } from 'date-fns';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const DatePicker = ({
  startYear = 2015,
  endYear = getYear(new Date()),
  values,
  onChange,
  name = 'date',
  minDate,
}) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(values || minDate);
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const year = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear
  );

  const handleChangeMonth = (month) => {
    const newDate = setMonth(displayDate, months.indexOf(month));
    setDisplayDate(newDate);
  };
  const handleChangeYear = (year) => {
    const newDate = setYear(displayDate, parseInt(year));

    setDisplayDate(newDate);
  };

  const handleSelect = (date) => {
    const minimalDate = new Date(minDate);

    if (date > minimalDate) {
      return false;
    }

    if (date) {
      setDate(date);
      onChange(name, dayjs(date).format('YYYY-MM-DD'));
      setOpen(false);
    }
  };

  const isDisabled = (date) => {
    const minimalDate = new Date(minDate);

    const today = dayjs().toDate();
    const todayDay = today.getDay();
    // Disable kalau lebih dari 5 bulan lalu atau masuk ke hari Sabtu/Minggu
    return date > minimalDate || date.getDay() !== todayDay;
  };

  useEffect(() => {
    onChange(name, dayjs(date).format('YYYY-MM-DD'));
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            ' justify-between text-left font-normal w-full',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? dayjs(date).format('YYYY-MM-DD') : <span>Pick a date</span>}

          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between gap-3">
          <Select
            onValueChange={handleChangeMonth}
            value={months[getMonth(displayDate ?? minDate)]}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleChangeYear}
            value={getYear(displayDate || minDate).toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {year.map((item, index) => (
                  <SelectItem key={index} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          month={displayDate}
          disabled={isDisabled}
          onMonthChange={setDisplayDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
