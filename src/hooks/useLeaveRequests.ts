import { useState, useEffect } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { INITIAL_LEAVE_REQUESTS } from '@/lib/data';
import type { LeaveRequest, LeaveStatus } from '@/types';

const STORAGE_KEY = 'hr_leave_requests';

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() =>
    getItem<LeaveRequest[]>(STORAGE_KEY, INITIAL_LEAVE_REQUESTS)
  );

  useEffect(() => {
    setItem(STORAGE_KEY, leaveRequests);
  }, [leaveRequests]);

  function addLeaveRequest(req: LeaveRequest): void {
    setLeaveRequests(prev => [...prev, req]);
  }

  function updateLeaveStatus(id: string, status: LeaveStatus): void {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  return { leaveRequests, addLeaveRequest, updateLeaveStatus };
}
