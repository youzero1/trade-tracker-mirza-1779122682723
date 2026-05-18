import { useState, useMemo } from 'react';
import { Plus, Trash2, MapPin, Users, Clock } from 'lucide-react';
import { useBookings } from '@/hooks/useBookings';
import { useEmployees } from '@/hooks/useEmployees';
import { ROOMS } from '@/lib/data';
import { generateId } from '@/lib/utils';
import type { Booking } from '@/types';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import styles from './BookingsPage.module.css';

const TIMES = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

const EMPTY_FORM = {
  roomId: '',
  employeeId: '',
  date: '',
  startTime: '09:00',
  endTime: '10:00',
  title: '',
  attendees: 1,
};

export default function BookingsPage() {
  const { bookings, addBooking, deleteBooking } = useBookings();
  const { employees } = useEmployees();
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    if (!filterDate) return bookings;
    return bookings.filter(b => b.date === filterDate);
  }, [bookings, filterDate]);

  const selectedRoom = useMemo(() => ROOMS.find(r => r.id === form.roomId), [form.roomId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const room = ROOMS.find(r => r.id === form.roomId);
    const emp = employees.find(em => em.id === form.employeeId);
    if (!room || !emp) return;
    const newBooking: Booking = {
      id: generateId(),
      roomId: room.id,
      roomName: room.name,
      employeeId: emp.id,
      employeeName: emp.name,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      title: form.title,
      attendees: form.attendees,
    };
    addBooking(newBooking);
    setShowModal(false);
    setForm(EMPTY_FORM);
  }

  function handleDelete(id: string) {
    if (window.confirm('Cancel this booking?')) deleteBooking(id);
  }

  return (
    <div>
      <PageHeader
        title="Room Bookings"
        subtitle="Reserve meeting rooms and facilities."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} />
            Book a Room
          </Button>
        }
      />

      <div className={styles.roomsGrid}>
        {ROOMS.map(room => (
          <Card key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              <div className={styles.roomName}>{room.name}</div>
              <Badge variant="info">{room.floor}</Badge>
            </div>
            <div className={styles.roomMeta}>
              <span className={styles.roomMetaItem}><Users size={13} /> {room.capacity} people</span>
            </div>
            <div className={styles.amenities}>
              {room.amenities.map(a => (
                <span key={a} className={styles.amenity}>{a}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className={styles.filterCard}>
        <div className={styles.filterRow}>
          <h2 className={styles.sectionTitle}>All Bookings</h2>
          <div className={styles.filterWrap}>
            <label className={styles.filterLabel}>Filter by date:</label>
            <input
              type="date"
              className={styles.dateInput}
              value={filterDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button className={styles.clearBtn} onClick={() => setFilterDate('')}>Clear</button>
            )}
          </div>
        </div>
      </Card>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Room</th>
              <th>Meeting Title</th>
              <th>Booked By</th>
              <th>Date</th>
              <th>Time</th>
              <th>Attendees</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className={styles.empty}>No bookings found.</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className={styles.roomNameCell}>{b.roomName}</div>
                    <div className={styles.roomFloor}>
                      <MapPin size={11} />{' '}
                      {ROOMS.find(r => r.id === b.roomId)?.floor || ''}
                    </div>
                  </td>
                  <td className={styles.bookingTitle}>{b.title}</td>
                  <td>{b.employeeName}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={styles.time}><Clock size={12} /> {b.startTime} – {b.endTime}</span>
                  </td>
                  <td>{b.attendees}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(b.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book a Room" size="md">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Room *</label>
            <select
              className={styles.input}
              required
              value={form.roomId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, roomId: e.target.value }))}
            >
              <option value="">Select a room</option>
              {ROOMS.map(r => (
                <option key={r.id} value={r.id}>{r.name} — {r.floor} (cap. {r.capacity})</option>
              ))}
            </select>
            {selectedRoom && (
              <div className={styles.roomHint}>
                Amenities: {selectedRoom.amenities.join(', ')}
              </div>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Booked By *</label>
            <select
              className={styles.input}
              required
              value={form.employeeId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, employeeId: e.target.value }))}
            >
              <option value="">Select employee</option>
              {employees.filter(em => em.status === 'active').map(em => (
                <option key={em.id} value={em.id}>{em.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Meeting Title *</label>
            <input
              className={styles.input}
              required
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date *</label>
            <input
              type="date"
              className={styles.input}
              required
              value={form.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Time *</label>
              <select
                className={styles.input}
                required
                value={form.startTime}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, startTime: e.target.value }))}
              >
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>End Time *</label>
              <select
                className={styles.input}
                required
                value={form.endTime}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, endTime: e.target.value }))}
              >
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Number of Attendees</label>
            <input
              type="number"
              min={1}
              max={selectedRoom ? selectedRoom.capacity : 100}
              className={styles.input}
              value={form.attendees}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, attendees: parseInt(e.target.value) || 1 }))}
            />
          </div>
          <div className={styles.formActions}>
            <Button variant="ghost" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">Confirm Booking</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
