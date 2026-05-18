import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  Gift,
  BarChart3,
  Building2,
  Mail,
} from 'lucide-react';
import styles from './Sidebar.module.css';

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Employees', path: '/employees', icon: <Users size={20} /> },
  { label: 'Leave Management', path: '/leave', icon: <CalendarDays size={20} /> },
  { label: 'Room Bookings', path: '/bookings', icon: <BookOpen size={20} /> },
  { label: 'Benefits', path: '/benefits', icon: <Gift size={20} /> },
  { label: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
  { label: 'Contact Us', path: '/contact', icon: <Mail size={20} /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Building2 size={28} className={styles.brandIcon} />
        <div>
          <div className={styles.brandName}>HRConnect</div>
          <div className={styles.brandSub}>HR Management</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>MENU</div>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={[styles.navItem, location.pathname === item.path ? styles.navItemActive : ''].join(' ')}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.avatar}>AD</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Admin User</div>
          <div className={styles.userRole}>HR Administrator</div>
        </div>
      </div>
    </aside>
  );
}
