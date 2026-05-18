export type Department = {
  id: string;
  name: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  managerId: string | null;
  startDate: string;
  status: 'active' | 'inactive';
};

export type LeaveType = 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  managerId: string | null;
  createdAt: string;
};

export type Room = {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  amenities: string[];
};

export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  attendees: number;
};

export type Benefit = {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  icon: string;
};

export type AttendanceRecord = {
  employeeId: string;
  employeeName: string;
  department: string;
  month: number;
  year: number;
  present: number;
  absent: number;
  leaves: number;
  totalWorkingDays: number;
};
