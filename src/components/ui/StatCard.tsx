import Card from './Card';
import styles from './StatCard.module.css';

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger';
  sub?: string;
};

export default function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.row}>
        <div>
          <div className={styles.label}>{label}</div>
          <div className={styles.value}>{value}</div>
          {sub && <div className={styles.sub}>{sub}</div>}
        </div>
        <div className={[styles.iconWrap, styles[color]].join(' ')}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
