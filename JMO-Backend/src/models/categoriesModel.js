import pool from '../db/pool.js';

export function findAllCategories() {
  return pool.query('SELECT id, slug, name FROM categories ORDER BY name ASC');
}
