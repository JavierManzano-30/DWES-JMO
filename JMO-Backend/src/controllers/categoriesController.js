import { findAllCategories } from '../models/categoriesModel.js';

export async function listCategories(_req, res) {
  const result = await findAllCategories();
  res.json({ data: result.rows });
}
