import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Gift, Heart, Bike, Coffee, BookOpen, Shield } from 'lucide-react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

type Benefit = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  enrolled: boolean;
};

const CATEGORY_COLORS: Record<string, BadgeVariant> = {
  Health: 'success',
  Wellness: 'info',
  Food: 'warning',
  Education: 'default',
  Insurance: 'danger',
};

const INITIAL_BENEFITS: Benefit[] = [
  {
    id: '1',
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family including dental and vision.',
    category: 'Health',
    icon: <Heart size={24} />,
    enrolled: true,
  },
  {
    id: '2',
    title: 'Gym Membership',
    description: 'Access to premium gym facilities and wellness programs.',
    category: 'Wellness',
    icon: <Bike size={24} />,
    enrolled: false,
  },
  {
    id: '3',
    title: 'Meal Allowance',
    description: 'Monthly meal allowance for office lunches and team events.',
    category: 'Food',
    icon: <Coffee size={24} />,
    enrolled: true,
  },
  {
    id: '4',
    title: 'Learning & Development',
    description: 'Annual budget for courses, books, and professional development.',
    category: 'Education',
    icon: <BookOpen size={24} />,
    enrolled: false,
  },
  {
    id: '5',
    title: 'Life Insurance',
    description: 'Life insurance policy to secure your family\'s future.',
    category: 'Insurance',
    icon: <Shield size={24} />,
    enrolled: true,
  },
  {
    id: '6',
    title: 'Employee Assistance',
    description: 'Confidential counseling and mental health support services.',
    category: 'Health',
    icon: <Gift size={24} />,
    enrolled: false,
  },
];

export default function BenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>(INITIAL_BENEFITS);
  const [selected, setSelected] = useState<Benefit | null>(null);

  const toggle = (id: string) => {
    setBenefits(prev =>
      prev.map(b => b.id === id ? { ...b, enrolled: !b.enrolled } : b)
    );
    if (selected?.id === id) {
      setSelected(prev => prev ? { ...prev, enrolled: !prev.enrolled } : null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Benefits"
        subtitle="Manage your employee benefits and enrollments"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {benefits.map(benefit => (
          <Card key={benefit.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-bg)', borderRadius: 'var(--radius-lg)', padding: '0.5rem', display: 'flex' }}>
                  {benefit.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: 'var(--text-base)' }}>{benefit.title}</div>
                  <Badge variant={CATEGORY_COLORS[benefit.category] || 'default'}>
                    {benefit.category}
                  </Badge>
                </div>
              </div>
              <Badge variant={benefit.enrolled ? 'success' : 'default'}>
                {benefit.enrolled ? 'Enrolled' : 'Not Enrolled'}
              </Badge>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              {benefit.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="ghost" size="sm" onClick={() => setSelected(benefit)}>View Details</Button>
              <Button variant={benefit.enrolled ? 'danger' : 'primary'} size="sm" onClick={() => toggle(benefit.id)}>
                {benefit.enrolled ? 'Unenroll' : 'Enroll'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.title}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Badge variant={CATEGORY_COLORS[selected.category] || 'default'}>
                {selected.category}
              </Badge>
              <Badge variant={selected.enrolled ? 'success' : 'default'}>
                {selected.enrolled ? 'Enrolled' : 'Not Enrolled'}
              </Badge>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              {selected.description}
            </p>
            <Button
              variant={selected.enrolled ? 'danger' : 'primary'}
              onClick={() => toggle(selected.id)}
            >
              {selected.enrolled ? 'Unenroll from this benefit' : 'Enroll in this benefit'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
