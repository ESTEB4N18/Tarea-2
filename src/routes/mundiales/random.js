import db from "../../db.js";

export const random = (req, res) => {
  const query = db.prepare("SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1");
  const result = query.get();
  res.json(result);
};
