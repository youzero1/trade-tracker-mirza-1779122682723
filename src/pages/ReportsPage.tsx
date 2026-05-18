import { useEmployees } from '@/hooks/useEmployees';
import { useLeaveRequests } from '@/hooks/useLeaveRequests';
import { useBookings } from '@/hooks/useBookings';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import { Users, CalendarDays, BookOpen, TrendingUp } from 'lucide-react';
import styles from './ReportsPage.module.css';

export default function ReportsPage() {
  const { employees } = useEmployees();
  const { leaveRequests } = useLeaveRequests();
  const { bookings } = useBookings();

  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const pendingLeave = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedLeave = leaveRequests.filter(r => r.status === 'approved').length;
  const confirmedBookings = bookings.length;

  const deptMap: Record<string, number> = {};
  employees.forEach(e => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });
  const departments = Object.entries(deptMap).map(([name, count]) => ({ name, count }));

  const leaveByType: Record<string, number> = {};
  leaveRequests.forEach(r => {
    leaveByType[r.type] = (leaveByType[r.type] || 0) + 1;
  });
  const leaveTypes = Object.entries(leaveByType).map(([type, count]) => ({ type, count }));

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Overview of HR metrics and analytics"
      />

      <div className={styles.statsGrid}>
        <StatCard
          label="Total Employees"
          value={employees.length}
          icon={<Users size={24} />}
          color="primary"
          sub={`${activeEmployees} active`}
        />
        <StatCard
          label="Leave Requests"
          value={leaveRequests.length}
          icon={<CalendarDays size={24} />}
          color="warning"
          sub={`${pendingLeave} pending`}
        />
        <StatCard
          label="Room Bookings"
          value={confirmedBookings}
          icon={<BookOpen size={24} />}
          color="success"
        />
        <StatCard
          label="Approved Leave"
          value={approvedLeave}
          icon={<TrendingUp size={24} />}
          color="danger"
        />
      </div>

      <div className={styles.grid}>
        <Card>
          <h2 className={styles.sectionTitle}>Employees by Department</h2>
          <div className={styles.list}>
            {departments.length === 0 && (
              <p className={styles.empty}>No department data available.</p>
            )}
            {departments.map(d => (
              <div key={d.name} className={styles.listRow}>
                <span className={styles.listLabel}>{d.name}</span>
                <div className={styles.listRight}>
                  <div
                    className={styles.bar}
                    style={{ width: `${Math.min(100, (d.count / employees.length) * 100)}%` }}
                  />
                  <span className={styles.listCount}>{d.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Leave Requests by Type</h2>
          <div className={styles.list}>
            {leaveTypes.length === 0 && (
              <p className={styles.empty}>No leave request data available.</p>
            )}
            {leaveTypes.map(l => (
              <div key={l.type} className={styles.listRow}>
                <span className={styles.listLabel}>{l.type}</span>
                <div className={styles.listRight}>
                  <div
                    className={styles.bar}
                    style={{ width: `${Math.min(100, (l.count / leaveRequests.length) * 100)}%` }}
                  />
                  <span className={styles.listCount}>{l.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className={styles.recentCard}>
        <h2 className={styles.sectionTitle}>Recent Leave Requests</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.slice(0, 10).map(r => (
              <tr key={r.id}>
                <td>{r.employeeName}</td>
                <td>{r.type}</td>
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>
                  <Badge
                    variant={
                      r.status === 'approved'
                        ? 'success'
                        : r.status === 'rejected'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
