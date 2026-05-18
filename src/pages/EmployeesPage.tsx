import { useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, UserCheck, UserX } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { DEPARTMENTS } from '@/lib/data';
import { generateId } from '@/lib/utils';
import type { Employee } from '@/types';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import styles from './EmployeesPage.module.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  startDate: '',
  status: 'active' as Employee['status'],
};

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.role.toLowerCase().includes(search.toLowerCase());
      const matchDept = !filterDept || e.department === filterDept;
      return matchSearch && matchDept;
    });
  }, [employees, search, filterDept]);

  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(emp: Employee) {
    setEditTarget(emp);
    setForm({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      role: emp.role,
      startDate: emp.startDate,
      status: emp.status,
    });
    setShowModal(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editTarget) {
      updateEmployee({ ...editTarget, ...form });
    } else {
      addEmployee({
        id: generateId(),
        managerId: null,
        ...form,
      });
    }
    setShowModal(false);
  }

  function handleDelete(id: string) {
    if (window.confirm('Delete this employee?')) deleteEmployee(id);
  }

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${employees.filter(e => e.status === 'active').length} active employees across ${DEPARTMENTS.length} departments`}
        action={
          <Button onClick={openAdd}>
            <Plus size={16} />
            Add Employee
          </Button>
        }
      />

      <Card className={styles.filterCard}>
        <div className={styles.filters}>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search employees…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.select}
            value={filterDept}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>No employees found.</td>
              </tr>
            ) : (
              filtered.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className={styles.empName}>{emp.name}</div>
                    <div className={styles.empEmail}>{emp.email}</div>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.startDate}</td>
                  <td>
                    <Badge variant={emp.status === 'active' ? 'success' : 'default'}>
                      {emp.status === 'active' ? <UserCheck size={12} /> : <UserX size={12} />}
                      {' '}{emp.status}
                    </Badge>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => openEdit(emp)}>
                        <Pencil size={15} />
                      </button>
                      <button className={[styles.iconBtn, styles.iconBtnDanger].join(' ')} onClick={() => handleDelete(emp.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editTarget ? 'Edit Employee' : 'Add Employee'}
        size="md"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                className={styles.input}
                required
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email *</label>
              <input
                className={styles.input}
                type="email"
                required
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                className={styles.input}
                value={form.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Department *</label>
              <select
                className={styles.input}
                required
                value={form.department}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, department: e.target.value }))}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Role / Job Title *</label>
              <input
                className={styles.input}
                required
                value={form.role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, role: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Date *</label>
              <input
                className={styles.input}
                type="date"
                required
                value={form.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, startDate: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.input}
                value={form.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, status: e.target.value as Employee['status'] }))}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className={styles.formActions}>
            <Button variant="ghost" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">{editTarget ? 'Save Changes' : 'Add Employee'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
