import { z } from "zod";
import db from "../../db.js";

const searchSchema = z.string().min(3, {
  message: "El texto debe tener al menos 3 caracteres"
});

export const search = (req, res) => {
  const { text } = req.params;
  const parsed = searchSchema.safeParse(text);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const queryText = `%${parsed.data.toLowerCase()}%`;
  const query = db.prepare(`
    SELECT * FROM mundiales 
    WHERE LOWER(nombre) LIKE ? 
       OR LOWER(resumen) LIKE ? 
       OR LOWER(descripcion) LIKE ?
    ORDER BY anio DESC
  `);

  const results = query.all(queryText, queryText, queryText);
  res.json(results);
};
