import { useState, useEffect } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { INITIAL_EMPLOYEES } from '@/lib/data';
import type { Employee } from '@/types';

const STORAGE_KEY = 'hr_employees';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(() =>
    getItem<Employee[]>(STORAGE_KEY, INITIAL_EMPLOYEES)
  );

  useEffect(() => {
    setItem(STORAGE_KEY, employees);
  }, [employees]);

  function addEmployee(emp: Employee): void {
    setEmployees(prev => [...prev, emp]);
  }

  function updateEmployee(updated: Employee): void {
    setEmployees(prev => prev.map(e => e.id === updated.id ? updated : e));
  }

  function deleteEmployee(id: string): void {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }

  return { employees, addEmployee, updateEmployee, deleteEmployee };
}
