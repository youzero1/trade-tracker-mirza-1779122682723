import type { Department, Employee, LeaveRequest, Room, Booking, Benefit, AttendanceRecord } from '@/types';

export const DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Engineering' },
  { id: 'd2', name: 'Marketing' },
  { id: 'd3', name: 'Human Resources' },
  { id: 'd4', name: 'Finance' },
  { id: 'd5', name: 'Operations' },
  { id: 'd6', name: 'Sales' },
];

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Alice Johnson', email: 'alice@company.com', phone: '+1-555-0101', department: 'Engineering', role: 'Senior Engineer', managerId: null, startDate: '2020-03-15', status: 'active' },
  { id: 'e2', name: 'Bob Smith', email: 'bob@company.com', phone: '+1-555-0102', department: 'Engineering', role: 'Software Engineer', managerId: 'e1', startDate: '2021-06-01', status: 'active' },
  { id: 'e3', name: 'Carol White', email: 'carol@company.com', phone: '+1-555-0103', department: 'Marketing', role: 'Marketing Manager', managerId: null, startDate: '2019-11-20', status: 'active' },
  { id: 'e4', name: 'David Brown', email: 'david@company.com', phone: '+1-555-0104', department: 'Marketing', role: 'Content Specialist', managerId: 'e3', startDate: '2022-01-10', status: 'active' },
  { id: 'e5', name: 'Eva Martinez', email: 'eva@company.com', phone: '+1-555-0105', department: 'Human Resources', role: 'HR Manager', managerId: null, startDate: '2018-07-05', status: 'active' },
  { id: 'e6', name: 'Frank Lee', email: 'frank@company.com', phone: '+1-555-0106', department: 'Finance', role: 'Finance Analyst', managerId: null, startDate: '2021-09-14', status: 'active' },
  { id: 'e7', name: 'Grace Kim', email: 'grace@company.com', phone: '+1-555-0107', department: 'Operations', role: 'Operations Lead', managerId: null, startDate: '2020-05-22', status: 'active' },
  { id: 'e8', name: 'Henry Davis', email: 'henry@company.com', phone: '+1-555-0108', department: 'Sales', role: 'Sales Representative', managerId: null, startDate: '2022-03-30', status: 'active' },
  { id: 'e9', name: 'Isla Thompson', email: 'isla@company.com', phone: '+1-555-0109', department: 'Engineering', role: 'QA Engineer', managerId: 'e1', startDate: '2021-11-15', status: 'active' },
  { id: 'e10', name: 'James Wilson', email: 'james@company.com', phone: '+1-555-0110', department: 'Finance', role: 'Accountant', managerId: 'e6', startDate: '2023-02-01', status: 'inactive' },
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'l1', employeeId: 'e2', employeeName: 'Bob Smith', department: 'Engineering', type: 'annual', startDate: '2024-02-05', endDate: '2024-02-07', days: 3, reason: 'Family vacation', status: 'pending', managerId: 'e1', createdAt: '2024-01-20' },
  { id: 'l2', employeeId: 'e4', employeeName: 'David Brown', department: 'Marketing', type: 'sick', startDate: '2024-02-01', endDate: '2024-02-02', days: 2, reason: 'Flu recovery', status: 'approved', managerId: 'e3', createdAt: '2024-01-31' },
  { id: 'l3', employeeId: 'e9', employeeName: 'Isla Thompson', department: 'Engineering', type: 'personal', startDate: '2024-02-10', endDate: '2024-02-10', days: 1, reason: 'Personal appointment', status: 'pending', managerId: 'e1', createdAt: '2024-02-01' },
  { id: 'l4', employeeId: 'e8', employeeName: 'Henry Davis', department: 'Sales', type: 'annual', startDate: '2024-03-01', endDate: '2024-03-05', days: 5, reason: 'Holiday trip', status: 'rejected', managerId: null, createdAt: '2024-01-25' },
  { id: 'l5', employeeId: 'e6', employeeName: 'Frank Lee', department: 'Finance', type: 'sick', startDate: '2024-02-08', endDate: '2024-02-09', days: 2, reason: 'Doctor advised rest', status: 'pending', managerId: null, createdAt: '2024-02-07' },
];

export const ROOMS: Room[] = [
  { id: 'r1', name: 'Horizon', capacity: 10, floor: '2nd Floor', amenities: ['Projector', 'Whiteboard', 'Video Conferencing'] },
  { id: 'r2', name: 'Summit', capacity: 20, floor: '3rd Floor', amenities: ['Projector', 'Whiteboard', 'TV Screen', 'Video Conferencing'] },
  { id: 'r3', name: 'Crest', capacity: 6, floor: '1st Floor', amenities: ['TV Screen', 'Whiteboard'] },
  { id: 'r4', name: 'Apex', capacity: 4, floor: '1st Floor', amenities: ['Whiteboard'] },
  { id: 'r5', name: 'Pinnacle', capacity: 50, floor: '4th Floor', amenities: ['Projector', 'Stage', 'Sound System', 'Video Conferencing'] },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'b1', roomId: 'r1', roomName: 'Horizon', employeeId: 'e1', employeeName: 'Alice Johnson', date: '2024-02-05', startTime: '09:00', endTime: '10:00', title: 'Sprint Planning', attendees: 8 },
  { id: 'b2', roomId: 'r2', roomName: 'Summit', employeeId: 'e3', employeeName: 'Carol White', date: '2024-02-05', startTime: '11:00', endTime: '12:00', title: 'Marketing Quarterly Review', attendees: 15 },
  { id: 'b3', roomId: 'r3', roomName: 'Crest', employeeId: 'e5', employeeName: 'Eva Martinez', date: '2024-02-06', startTime: '14:00', endTime: '15:00', title: 'HR Interview', attendees: 3 },
];

export const BENEFITS: Benefit[] = [
  { id: 'ben1', title: 'Health Insurance', category: 'Health & Wellness', description: 'Comprehensive medical, dental, and vision coverage for employees and dependents. Includes annual health check-ups and specialist consultations.', eligibility: 'All full-time employees from Day 1', icon: 'heart' },
  { id: 'ben2', title: 'Annual Leave', category: 'Time Off', description: '20 days of paid annual leave per year, accrued monthly. Unused days can be carried over up to 5 days to the next year.', eligibility: 'All employees after probation period', icon: 'calendar' },
  { id: 'ben3', title: 'Remote Work Policy', category: 'Work Flexibility', description: 'Up to 2 days per week of remote work. Employees are provided with necessary equipment including laptop and accessories.', eligibility: 'All employees after 6 months', icon: 'laptop' },
  { id: 'ben4', title: 'Learning & Development', category: 'Growth', description: 'Annual budget of $2,000 for training courses, certifications, conferences, and professional books.', eligibility: 'All full-time employees', icon: 'book' },
  { id: 'ben5', title: 'Gym Membership', category: 'Health & Wellness', description: 'Monthly gym membership reimbursement up to $100 at any accredited fitness center or studio.', eligibility: 'All full-time employees', icon: 'activity' },
  { id: 'ben6', title: 'Parental Leave', category: 'Family', description: '16 weeks fully paid maternity leave and 4 weeks paternity leave for eligible employees.', eligibility: 'All employees after 12 months of service', icon: 'users' },
  { id: 'ben7', title: 'Performance Bonus', category: 'Compensation', description: 'Annual performance-based bonus of up to 15% of base salary, tied to individual and company targets.', eligibility: 'All full-time employees completing full year', icon: 'award' },
  { id: 'ben8', title: 'Employee Assistance Program', category: 'Health & Wellness', description: 'Confidential counseling and support services for mental health, financial advice, and personal challenges.', eligibility: 'All employees and immediate family members', icon: 'shield' },
];

export function generateAttendanceRecords(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const employees = INITIAL_EMPLOYEES.filter(e => e.status === 'active');
  const months = [10, 11, 12, 1];
  const years = [2023, 2023, 2023, 2024];

  employees.forEach(emp => {
    months.forEach((month, idx) => {
      const workingDays = 22;
      const absent = Math.floor(Math.random() * 3);
      const leaves = Math.floor(Math.random() * 2);
      const present = workingDays - absent - leaves;
      records.push({
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        month,
        year: years[idx],
        present,
        absent,
        leaves,
        totalWorkingDays: workingDays,
      });
    });
  });
  return records;
}
