import { useState, useEffect } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { INITIAL_BOOKINGS } from '@/lib/data';
import type { Booking } from '@/types';

const STORAGE_KEY = 'hr_bookings';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(() =>
    getItem<Booking[]>(STORAGE_KEY, INITIAL_BOOKINGS)
  );

  useEffect(() => {
    setItem(STORAGE_KEY, bookings);
  }, [bookings]);

  function addBooking(booking: Booking): void {
    setBookings(prev => [...prev, booking]);
  }

  function deleteBooking(id: string): void {
    setBookings(prev => prev.filter(b => b.id !== id));
  }

  return { bookings, addBooking, deleteBooking };
}
