import db from "../../db.js";

export const getBySlug = (req, res) => {
  const { slug } = req.params;
  const query = db.prepare("SELECT * FROM mundiales WHERE slug = ?");
  const result = query.get(slug);

  if (!result) {
    return res.status(404).json({ error: "Mundial no encontrado" });
  }

  res.json(result);
};
