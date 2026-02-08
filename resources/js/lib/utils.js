import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function showNominalByStatus(params, status) {
  if (params == 'acc') {
    switch (status) {
      case 'acc':
        return true;
        break;
      case 'success':
        return true;
        break;
      case 'gagal':
        return true;
        break;
      default:
        false;
        break;
    }
  }
  if (params == 'nominal_drop') {
    switch (status) {
      case 'success':
        return true;
        break;
      default:
        false;
        break;
    }
  }
}
