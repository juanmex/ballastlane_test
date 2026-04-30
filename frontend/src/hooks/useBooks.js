import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/books';

export function useBooks() {
  const [books, setBooks]   = useState([]);
  const [meta, setMeta]     = useState(null);
  const [page, setPage]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const fetchBooks = useCallback(async (targetPage) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getBooks(targetPage);
      setBooks(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(page); }, [page, fetchBooks]);

  const create = async (attrs) => {
    const res = await api.createBook(attrs);
    setPage(1);
    await fetchBooks(1);
    return res.data;
  };

  const update = async (id, attrs) => {
    const res = await api.updateBook(id, attrs);
    await fetchBooks(page);
    return res.data;
  };

  const remove = async (id) => {
    await api.deleteBook(id);
    const targetPage = books.length === 1 && page > 1 ? page - 1 : page;
    setPage(targetPage);
    await fetchBooks(targetPage);
  };

  return { books, meta, page, setPage, loading, error, create, update, remove };
}
