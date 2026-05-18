import styles from './ContactPage.module.css';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Get in touch with the HR team for any questions or support.</p>
      </div>

      <div className={styles.grid}>
        {/* Contact Info */}
        <div className={styles.infoCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>HR Department</h2>
            <p className={styles.cardDesc}>Our team is here to help. Reach out through any of the channels below or fill in the form.</p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><Mail size={18} /></span>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>hr@hrconnect.com</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><Phone size={18} /></span>
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoValue}>+1 (555) 000-1234</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><MapPin size={18} /></span>
                <div>
                  <div className={styles.infoLabel}>Office</div>
                  <div className={styles.infoValue}>3rd Floor, HQ Building<br />123 Corporate Ave, New York, NY 10001</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><Clock size={18} /></span>
                <div>
                  <div className={styles.infoLabel}>Office Hours</div>
                  <div className={styles.infoValue}>Mon – Fri: 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Quick Links</h2>
            <div className={styles.quickLinks}>
              <div className={styles.quickLink}>📋 Submit a Leave Request</div>
              <div className={styles.quickLink}>📅 Book a Meeting Room</div>
              <div className={styles.quickLink}>🎁 View Benefits Catalog</div>
              <div className={styles.quickLink}>📊 Download HR Reports</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Send a Message</h2>
            <p className={styles.cardDesc}>Fill out the form below and we'll get back to you within one business day.</p>

            {submitted && (
              <div className={styles.successBanner}>
                ✅ Your message has been sent! We'll be in touch shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address *</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subject *</label>
                <select
                  className={styles.input}
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject…</option>
                  <option value="leave">Leave Request Query</option>
                  <option value="payroll">Payroll Issue</option>
                  <option value="benefits">Benefits & Perks</option>
                  <option value="booking">Room Booking</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message *</label>
                <textarea
                  className={styles.textarea}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your query in detail…"
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
