import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZodError } from "zod";

import { getAll } from "./routes/mundiales/getAll.js";
import { getBySlug } from "./routes/mundiales/getBySlug.js";
import { getByCampeon } from "./routes/mundiales/getByCampeon.js";
import { random } from "./routes/mundiales/random.js";
import { search } from "./routes/mundiales/search.js";

const app = express();
const PORT = 4321;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "..", "imagenes")));

app.get("/", (req, res) => {
  res.json({
    nombre: "API Copa Mundial FIFA",
    version: "1.0.0",
    rutas: [
      "/mundiales",
      "/mundial/:slug",
      "/campeon/:pais",
      "/random",
      "/search/:text",
      "/imagenes/*"
    ]
  });
});

app.get("/mundiales", getAll);
app.get("/mundial/:slug", getBySlug);
app.get("/campeon/:pais", getByCampeon);
app.get("/random", random);
app.get("/search/:text", search);

// Middleware de ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo de errores global
app.use((error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.errors[0].message });
  }

  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
