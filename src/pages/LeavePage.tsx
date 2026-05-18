import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useLeaveRequests } from '@/hooks/useLeaveRequests';
import { useEmployees } from '@/hooks/useEmployees';
import { generateId, formatDate } from '@/lib/utils';
import type { LeaveRequest, LeaveType, LeaveStatus } from '@/types';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import styles from './LeavePage.module.css';

const LEAVE_TYPES: LeaveType[] = ['annual', 'sick', 'personal', 'maternity', 'paternity'];

function statusVariant(status: LeaveStatus): 'success' | 'warning' | 'danger' {
  if (status === 'approved') return 'success';
  if (status === 'rejected') return 'danger';
  return 'warning';
}

const EMPTY_FORM = {
  employeeId: '',
  type: 'annual' as LeaveType,
  startDate: '',
  endDate: '',
  reason: '',
};

export default function LeavePage() {
  const { leaveRequests, addLeaveRequest, updateLeaveStatus } = useLeaveRequests();
  const { employees } = useEmployees();
  const [filterStatus, setFilterStatus] = useState<LeaveStatus | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    if (filterStatus === 'all') return leaveRequests;
    return leaveRequests.filter(r => r.status === filterStatus);
  }, [leaveRequests, filterStatus]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emp = employees.find(em => em.id === form.employeeId);
    if (!emp) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    const req: LeaveRequest = {
      id: generateId(),
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      reason: form.reason,
      status: 'pending',
      managerId: emp.managerId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addLeaveRequest(req);
    setShowModal(false);
    setForm(EMPTY_FORM);
  }

  return (
    <div>
      <PageHeader
        title="Leave Management"
        subtitle="Manage and approve employee leave requests."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} />
            New Request
          </Button>
        }
      />

      <Card className={styles.filterCard}>
        <div className={styles.tabs}>
          {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
            <button
              key={s}
              className={[styles.tab, filterStatus === s ? styles.tabActive : ''].join(' ')}
              onClick={() => setFilterStatus(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              {s !== 'all' && (
                <span className={styles.tabCount}>
                  {leaveRequests.filter(r => r.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Period</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className={styles.empty}>No leave requests found.</td></tr>
            ) : (
              filtered.map(req => (
                <tr key={req.id}>
                  <td>
                    <div className={styles.empName}>{req.employeeName}</div>
                    <div className={styles.empDept}>{req.department}</div>
                  </td>
                  <td><span className={styles.leaveType}>{req.type}</span></td>
                  <td>
                    <div>{formatDate(req.startDate)}</div>
                    <div className={styles.dateSep}>to {formatDate(req.endDate)}</div>
                  </td>
                  <td>{req.days}</td>
                  <td className={styles.reason}>{req.reason}</td>
                  <td>
                    <Badge variant={statusVariant(req.status)}>{req.status}</Badge>
                  </td>
                  <td>
                    {req.status === 'pending' && (
                      <div className={styles.actions}>
                        <button className={styles.approveBtn} onClick={() => updateLeaveStatus(req.id, 'approved')}>Approve</button>
                        <button className={styles.rejectBtn} onClick={() => updateLeaveStatus(req.id, 'rejected')}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Leave Request" size="md">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Employee *</label>
            <select
              className={styles.input}
              required
              value={form.employeeId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, employeeId: e.target.value }))}
            >
              <option value="">Select employee</option>
              {employees.filter(em => em.status === 'active').map(em => (
                <option key={em.id} value={em.id}>{em.name} — {em.department}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Leave Type *</label>
            <select
              className={styles.input}
              value={form.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, type: e.target.value as LeaveType }))}
            >
              {LEAVE_TYPES.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Date *</label>
              <input
                type="date"
                className={styles.input}
                required
                value={form.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, startDate: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>End Date *</label>
              <input
                type="date"
                className={styles.input}
                required
                value={form.endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, endDate: e.target.value }))}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Reason</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={form.reason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, reason: e.target.value }))}
            />
          </div>
          <div className={styles.formActions}>
            <Button variant="ghost" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
