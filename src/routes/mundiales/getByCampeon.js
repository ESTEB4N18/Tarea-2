import db from "../../db.js";

export const getByCampeon = (req, res) => {
  const { pais } = req.params;
  const query = db.prepare("SELECT slug FROM mundiales WHERE LOWER(campeon) = LOWER(?) ORDER BY anio DESC");
  const results = query.all(pais);
  res.json(results);
};
