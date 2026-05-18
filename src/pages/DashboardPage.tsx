import { useMemo } from 'react';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeaveRequests } from '@/hooks/useLeaveRequests';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { employees } = useEmployees();
  const { leaveRequests, updateLeaveStatus } = useLeaveRequests();

  const activeCount = useMemo(() => employees.filter(e => e.status === 'active').length, [employees]);
  const deptCounts = useMemo(() => {
    const map: Record<string, number> = {};
    employees.filter(e => e.status === 'active').forEach(e => {
      map[e.department] = (map[e.department] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [employees]);

  const pendingLeaves = useMemo(() => leaveRequests.filter(r => r.status === 'pending'), [leaveRequests]);
  const approvedLeaves = useMemo(() => leaveRequests.filter(r => r.status === 'approved').length, [leaveRequests]);
  const rejectedLeaves = useMemo(() => leaveRequests.filter(r => r.status === 'rejected').length, [leaveRequests]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin — here's what's happening today."
      />

      <div className={styles.statsGrid}>
        <StatCard
          label="Total Employees"
          value={activeCount}
          icon={<Users size={22} />}
          color="primary"
          sub={`${employees.length} total incl. inactive`}
        />
        <StatCard
          label="Pending Leave Requests"
          value={pendingLeaves.length}
          icon={<Clock size={22} />}
          color="warning"
          sub="Awaiting approval"
        />
        <StatCard
          label="Approved Leaves"
          value={approvedLeaves}
          icon={<CheckCircle size={22} />}
          color="success"
          sub="This period"
        />
        <StatCard
          label="Rejected Leaves"
          value={rejectedLeaves}
          icon={<XCircle size={22} />}
          color="danger"
          sub="This period"
        />
      </div>

      <div className={styles.twoCol}>
        <Card>
          <h2 className={styles.sectionTitle}>Pending Leave Requests</h2>
          {pendingLeaves.length === 0 ? (
            <p className={styles.empty}>No pending leave requests.</p>
          ) : (
            <div className={styles.leaveList}>
              {pendingLeaves.map(req => (
                <div key={req.id} className={styles.leaveItem}>
                  <div className={styles.leaveInfo}>
                    <div className={styles.leaveName}>{req.employeeName}</div>
                    <div className={styles.leaveMeta}>
                      {req.department} · {req.type} · {req.days} day{req.days > 1 ? 's' : ''}
                    </div>
                    <div className={styles.leaveDates}>
                      {formatDate(req.startDate)} – {formatDate(req.endDate)}
                    </div>
                  </div>
                  <div className={styles.leaveActions}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => updateLeaveStatus(req.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => updateLeaveStatus(req.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Headcount by Department</h2>
          <div className={styles.deptList}>
            {deptCounts.map(([dept, count]) => (
              <div key={dept} className={styles.deptRow}>
                <div className={styles.deptName}>{dept}</div>
                <div className={styles.deptBarWrap}>
                  <div
                    className={styles.deptBar}
                    style={{ width: `${(count / activeCount) * 100}%` }}
                  />
                </div>
                <div className={styles.deptCount}>{count}</div>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Total Active</span>
            <Badge variant="success">{activeCount} employees</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
