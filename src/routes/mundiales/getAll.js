import { z } from "zod";
import db from "../../db.js";

const includeSchema = z.enum(["summary", "full"], {
  errorMap: () => ({ message: "Parametro include invalido" })
}).optional();

export const getAll = (req, res) => {
  const parsed = includeSchema.safeParse(req.query.include);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const include = parsed.data;

  let queryStr;
  if (include === "full") {
    queryStr = "SELECT * FROM mundiales ORDER BY anio DESC";
  } else {
    queryStr = "SELECT nombre, anio, sede, campeon, slug FROM mundiales ORDER BY anio DESC";
  }

  const query = db.prepare(queryStr);
  const results = query.all();
  res.json(results);
};
