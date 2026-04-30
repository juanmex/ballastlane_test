import { useState } from 'react';
import { useBooks } from './hooks/useBooks';
import { BookCard } from './components/BookCard';
import { BookForm } from './components/BookForm';
import { Modal } from './components/Modal';
import { Pagination } from './components/Pagination';
import styles from './App.module.css';

export default function App() {
  const { books, meta, page, setPage, loading, error, create, update, remove } = useBooks();
  const [modal, setModal]       = useState(null); // null | 'create' | book object
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState(null);

  const openCreate = () => { setFormError(null); setModal('create'); };
  const openEdit   = (book) => { setFormError(null); setModal(book); };
  const closeModal = () => setModal(null);

  const handleSubmit = async (attrs) => {
    setSubmitting(true);
    setFormError(null);
    try {
      if (modal === 'create') await create(attrs);
      else await update(modal.id, attrs);
      closeModal();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try { await remove(id); }
    catch (err) { alert(err.message); }
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.brand}>Library</h1>
            <p className={styles.subtitle}>
              {meta ? `${meta.total_count} books in collection` : 'Book Management'}
            </p>
          </div>
          <button className={styles.btnAdd} onClick={openCreate}>
            <span>+</span> Add Book
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {loading && (
          <div className={styles.center}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading books…</p>
          </div>
        )}

        {error && !loading && (
          <div className={styles.errorBanner}>
            <strong>Could not load books.</strong> {error}
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>📚</p>
            <p className={styles.emptyTitle}>No books yet</p>
            <p className={styles.emptyDesc}>Add your first book to get started.</p>
            <button className={styles.btnAdd} onClick={openCreate}>Add Book</button>
          </div>
        )}

        {!loading && books.length > 0 && (
          <>
            <div className={styles.grid}>
              {books.map((book) => (
                <BookCard key={book.id} book={book} onEdit={openEdit} onDelete={handleDelete} />
              ))}
            </div>
            <Pagination meta={meta} page={page} onPage={setPage} />
          </>
        )}
      </main>

      {modal && (
        <Modal
          title={modal === 'create' ? 'Add New Book' : 'Edit Book'}
          onClose={closeModal}
        >
          {formError && <p className={styles.formError}>{formError}</p>}
          <BookForm
            initial={modal !== 'create' ? modal : undefined}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitting={submitting}
          />
        </Modal>
      )}
    </div>
  );
}
