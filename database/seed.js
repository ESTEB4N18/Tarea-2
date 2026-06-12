import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "database.sqlite");
const sqlPath = path.join(__dirname, "..", "src", "data.sql");

const sql = fs.readFileSync(sqlPath, "utf8");
const db = new DatabaseSync(dbPath);

try {
  db.exec(sql);
  console.log("Base de datos creada y poblada correctamente");
} catch (error) {
  console.error("Error al poblar la base de datos:", error.message);
}
