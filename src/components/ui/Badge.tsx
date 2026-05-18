import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}
