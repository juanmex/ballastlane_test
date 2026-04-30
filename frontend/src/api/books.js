const BASE = 'http://localhost:3000/api/v1/books';

async function handle(res) {
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors ? JSON.stringify(json.errors) : `HTTP ${res.status}`);
  return json;
}

export const getBooks = (page = 1, limit = 12) =>
  fetch(`${BASE}?page=${page}&limit=${limit}`).then(handle);

export const createBook = (attrs) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book: attrs }),
  }).then(handle);

export const updateBook = (id, attrs) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book: attrs }),
  }).then(handle);

export const deleteBook = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(handle);
