import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import { BarChart3, TrendingUp, Users, CalendarDays } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeaveRequests } from '@/hooks/useLeaveRequests';
import { useBookings } from '@/hooks/useBookings';

export default function ReportsPage() {
  const { employees } = useEmployees();
  const { requests } = useLeaveRequests();
  const { bookings } = useBookings();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const pendingLeave = requests.filter(r => r.status === 'pending').length;
  const approvedLeave = requests.filter(r => r.status === 'approved').length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  const deptMap: Record<string, number> = {};
  employees.forEach(e => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });

  const leaveTypeMap: Record<string, number> = {};
  requests.forEach(r => {
    leaveTypeMap[r.type] = (leaveTypeMap[r.type] || 0) + 1;
  });

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Overview of HR metrics and analytics"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', display: 'flex' }}>
              <Users size={24} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>Employee Summary</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total Employees</span>
              <span style={{ fontWeight: 600 }}>{totalEmployees}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Active</span>
              <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{activeEmployees}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Inactive</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{totalEmployees - activeEmployees}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', display: 'flex' }}>
              <CalendarDays size={24} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>Leave Summary</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total Requests</span>
              <span style={{ fontWeight: 600 }}>{requests.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Pending</span>
              <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{pendingLeave}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Approved</span>
              <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{approvedLeave}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', display: 'flex' }}>
              <TrendingUp size={24} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>Bookings Summary</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total Bookings</span>
              <span style={{ fontWeight: 600 }}>{totalBookings}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Confirmed</span>
              <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{confirmedBookings}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Pending</span>
              <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{totalBookings - confirmedBookings}</span>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <BarChart3 size={20} style={{ color: 'var(--color-primary)' }} />
            <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>Employees by Department</div>
          </div>
          {Object.entries(deptMap).length === 0 ? (
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>No data available</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(deptMap).sort((a, b) => b[1] - a[1]).map(([dept, count]) => (
                <div key={dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{dept}</span>
                    <span style={{ fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--color-border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 'var(--radius-full)', width: `${Math.round((count / totalEmployees) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <BarChart3 size={20} style={{ color: 'var(--color-warning)' }} />
            <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>Leave by Type</div>
          </div>
          {Object.entries(leaveTypeMap).length === 0 ? (
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>No data available</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(leaveTypeMap).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{type}</span>
                    <span style={{ fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--color-border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--color-warning)', borderRadius: 'var(--radius-full)', width: `${Math.round((count / requests.length) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
