import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToCurrencyFormat(value: number | string, currency: string = 'USD') {
  const resolvedValue = typeof value === 'string' ? parseFloat(value) : value;

  const option: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  };

  const formatter = new Intl.NumberFormat('en-US', option);
  return formatter.format(resolvedValue);
}
