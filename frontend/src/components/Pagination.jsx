import styles from './Pagination.module.css';

export function Pagination({ meta, page, onPage }) {
  if (!meta || meta.total_pages <= 1) return null;

  const pages = Array.from({ length: meta.total_pages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === meta.total_pages || Math.abs(p - page) <= 1);

  const items = [];
  visible.forEach((p, i) => {
    if (i > 0 && p - visible[i - 1] > 1) items.push('…');
    items.push(p);
  });

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <button
        className={styles.arrow}
        onClick={() => onPage(page - 1)}
        disabled={!meta.prev_page}
        aria-label="Previous page"
      >
        ←
      </button>

      <div className={styles.pages}>
        {items.map((item, i) =>
          item === '…' ? (
            <span key={`gap-${i}`} className={styles.gap}>…</span>
          ) : (
            <button
              key={item}
              className={`${styles.page} ${item === page ? styles.active : ''}`}
              onClick={() => item !== page && onPage(item)}
              aria-current={item === page ? 'page' : undefined}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        className={styles.arrow}
        onClick={() => onPage(page + 1)}
        disabled={!meta.next_page}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
