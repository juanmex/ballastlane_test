import { useState } from 'react';
import styles from './BookCard.module.css';

const GENRE_PALETTE = {
  Fantasy:          { bg: '#F3F0FF', color: '#7C3AED' },
  Dystopian:        { bg: '#FEF2F2', color: '#DC2626' },
  Literary:         { bg: '#EFF6FF', color: '#1D4ED8' },
  Historical:       { bg: '#FFFBEB', color: '#B45309' },
  Mystery:          { bg: '#EEF2FF', color: '#4338CA' },
  Romance:          { bg: '#FDF2F8', color: '#BE185D' },
  Thriller:         { bg: '#FFFBEB', color: '#D97706' },
  Adventure:        { bg: '#ECFDF5', color: '#065F46' },
  Gothic:           { bg: '#F8FAFC', color: '#475569' },
  Satire:           { bg: '#F7FEE7', color: '#4D7C0F' },
  'Science Fiction':{ bg: '#EFF6FF', color: '#1E40AF' },
  Drama:            { bg: '#FFF7ED', color: '#C2410C' },
  Philosophical:    { bg: '#FDF4FF', color: '#86198F' },
  Modernist:        { bg: '#F0F9FF', color: '#0369A1' },
  Fable:            { bg: '#ECFDF5', color: '#047857' },
  'Magical Realism':{ bg: '#FFF0F3', color: '#BE123C' },
  'Epic Poetry':    { bg: '#FEFCE8', color: '#92400E' },
  'Gothic Romance': { bg: '#FDF2F8', color: '#9D174D' },
};

const fallback = { bg: '#F1F5F9', color: '#475569' };
const palette = (genre) => GENRE_PALETTE[genre] || fallback;

export function BookCard({ book, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const colors = palette(book.genre);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        {book.genre && (
          <span className={styles.genre} style={{ background: colors.bg, color: colors.color }}>
            {book.genre}
          </span>
        )}
        <span className={styles.copies}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          {book.total_copies}
        </span>
      </div>

      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author || <span className={styles.na}>Unknown author</span>}</p>
      <p className={styles.isbn}>{book.isbn}</p>

      <div className={styles.footer}>
        {confirming ? (
          <div className={styles.confirm}>
            <span className={styles.confirmText}>Delete this book?</span>
            <div className={styles.confirmActions}>
              <button className={styles.btnNo} onClick={() => setConfirming(false)}>Cancel</button>
              <button className={styles.btnYes} onClick={() => onDelete(book.id)}>Delete</button>
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            <button className={styles.btnEdit} onClick={() => onEdit(book)}>Edit</button>
            <button className={styles.btnDelete} onClick={() => setConfirming(true)}>Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}
