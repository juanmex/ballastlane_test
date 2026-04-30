import { useState } from 'react';
import styles from './BookForm.module.css';

const EMPTY = { title: '', author: '', genre: '', isbn: '', total_copies: '' };

function validate(fields) {
  const errors = {};
  if (!fields.title.trim()) errors.title = 'Title is required.';
  if (!fields.isbn.trim()) errors.isbn = 'ISBN is required.';
  if (fields.total_copies === '' || fields.total_copies < 0)
    errors.total_copies = 'Enter a valid number of copies (≥ 0).';
  return errors;
}

export function BookForm({ initial, onSubmit, onCancel, submitting }) {
  const [fields, setFields] = useState(
    initial
      ? { title: initial.title, author: initial.author || '', genre: initial.genre || '', isbn: initial.isbn, total_copies: initial.total_copies }
      : EMPTY
  );
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit({ ...fields, total_copies: Number(fields.total_copies) });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <label className={styles.label}>Title <span className={styles.req}>*</span></label>
        <input className={`${styles.input} ${errors.title ? styles.invalid : ''}`} value={fields.title} onChange={set('title')} placeholder="e.g. The Great Gatsby" />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Author</label>
        <input className={styles.input} value={fields.author} onChange={set('author')} placeholder="e.g. F. Scott Fitzgerald" />
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>Genre</label>
          <input className={styles.input} value={fields.genre} onChange={set('genre')} placeholder="e.g. Literary" />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Total Copies <span className={styles.req}>*</span></label>
          <input className={`${styles.input} ${errors.total_copies ? styles.invalid : ''}`} type="number" min="0" value={fields.total_copies} onChange={set('total_copies')} placeholder="0" />
          {errors.total_copies && <p className={styles.error}>{errors.total_copies}</p>}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>ISBN <span className={styles.req}>*</span></label>
        <input className={`${styles.input} ${errors.isbn ? styles.invalid : ''}`} value={fields.isbn} onChange={set('isbn')} placeholder="e.g. 978-0-7432-7356-5" />
        {errors.isbn && <p className={styles.error}>{errors.isbn}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnCancel} onClick={onCancel} disabled={submitting}>Cancel</button>
        <button type="submit" className={styles.btnSubmit} disabled={submitting}>
          {submitting ? 'Saving…' : initial ? 'Save Changes' : 'Add Book'}
        </button>
      </div>
    </form>
  );
}
