import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getMonthName(month: number): string {
  const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return names[month - 1] || '';
}
