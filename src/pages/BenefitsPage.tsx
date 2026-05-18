import { useState } from 'react';
import { Heart, Calendar, Laptop, Book, Activity, Users, Award, Shield } from 'lucide-react';
import { BENEFITS } from '@/lib/data';
import type { Benefit } from '@/types';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import styles from './BenefitsPage.module.css';

function BenefitIcon({ icon }: { icon: string }) {
  const props = { size: 24 };
  switch (icon) {
    case 'heart': return <Heart {...props} />;
    case 'calendar': return <Calendar {...props} />;
    case 'laptop': return <Laptop {...props} />;
    case 'book': return <Book {...props} />;
    case 'activity': return <Activity {...props} />;
    case 'users': return <Users {...props} />;
    case 'award': return <Award {...props} />;
    case 'shield': return <Shield {...props} />;
    default: return <Heart {...props} />;
  }
}

const CATEGORY_COLORS: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
  'Health & Wellness': 'success',
  'Time Off': 'info',
  'Work Flexibility': 'primary',
  'Growth': 'warning',
  'Family': 'danger',
  'Compensation': 'primary',
};

export default function BenefitsPage() {
  const [selected, setSelected] = useState<Benefit | null>(null);
  const [filterCat, setFilterCat] = useState('');

  const categories = Array.from(new Set(BENEFITS.map(b => b.category)));

  const filtered = filterCat ? BENEFITS.filter(b => b.category === filterCat) : BENEFITS;

  return (
    <div>
      <PageHeader
        title="Benefits Catalog"
        subtitle="Browse all available employee benefits and perks."
      />

      <div className={styles.filterRow}>
        <button
          className={[styles.catBtn, !filterCat ? styles.catBtnActive : ''].join(' ')}
          onClick={() => setFilterCat('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={[styles.catBtn, filterCat === cat ? styles.catBtnActive : ''].join(' ')}
            onClick={() => setFilterCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(benefit => (
          <Card
            key={benefit.id}
            className={styles.benefitCard}
          >
            <div
              className={[styles.iconWrap, styles[`icon_${benefit.icon}`]].join(' ')}
            >
              <BenefitIcon icon={benefit.icon} />
            </div>
            <div className={styles.benefitMeta}>
              <Badge variant={CATEGORY_COLORS[benefit.category] || 'default'}>
                {benefit.category}
              </Badge>
            </div>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDesc}>{benefit.description.substring(0, 100)}…</p>
            <button className={styles.learnMore} onClick={() => setSelected(benefit)}>
              Learn more →
            </button>
          </Card>
        ))}
      </div>

      {selected && (
        <Modal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          title={selected.title}
          size="sm"
        >
          <div className={styles.detailModal}>
            <div className={[styles.iconWrapLg, styles[`icon_${selected.icon}`]].join(' ')}>
              <BenefitIcon icon={selected.icon} />
            </div>
            <Badge variant={CATEGORY_COLORS[selected.category] || 'default'}>
              {selected.category}
            </Badge>
            <p className={styles.detailDesc}>{selected.description}</p>
            <div className={styles.eligibilityBox}>
              <div className={styles.eligibilityLabel}>Eligibility</div>
              <div className={styles.eligibilityText}>{selected.eligibility}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
