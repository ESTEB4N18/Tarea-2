const express = require('express');
const path = require('path');
const { ZodError } = require('zod');
const db = require('./db');
const { includeSchema, searchSchema } = require('./validation');

const app = express();
const PORT = 4321;

app.use(express.json());
app.use('/imagenes', express.static(path.join(__dirname, '..', 'imagenes')));

function ejecutarConsulta(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, filas) => {
      if (error) {
        reject(error);
      } else {
        resolve(filas);
      }
    });
  });
}

function ejecutarConsultaUno(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, fila) => {
      if (error) {
        reject(error);
      } else {
        resolve(fila);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.json({
    nombre: 'API Copa Mundial FIFA',
    version: '1.0.0',
    rutas: [
      '/mundiales',
      '/mundial/:slug',
      '/campeon/:pais',
      '/random',
      '/search/:text',
      '/imagenes/*'
    ]
  });
});

app.get('/mundiales', async (req, res, next) => {
  try {
    const include = includeSchema.parse(req.query.include);

    let sql = `
      SELECT nombre, anio, sede, campeon, slug
      FROM mundiales
      ORDER BY anio DESC
    `;

    if (include === 'full') {
      sql = 'SELECT * FROM mundiales ORDER BY anio DESC';
    }

    const mundiales = await ejecutarConsulta(sql);
    res.json(mundiales);
  } catch (error) {
    next(error);
  }
});

app.get('/mundial/:slug', async (req, res, next) => {
  try {
    const mundial = await ejecutarConsultaUno(
      'SELECT * FROM mundiales WHERE slug = ?',
      [req.params.slug]
    );

    if (!mundial) {
      return res.status(404).json({ error: 'Mundial no encontrado' });
    }

    res.json(mundial);
  } catch (error) {
    next(error);
  }
});

app.get('/campeon/:pais', async (req, res, next) => {
  try {
    const mundiales = await ejecutarConsulta(
      'SELECT slug FROM mundiales WHERE LOWER(campeon) = LOWER(?) ORDER BY anio DESC',
      [req.params.pais]
    );

    res.json(mundiales);
  } catch (error) {
    next(error);
  }
});

app.get('/random', async (req, res, next) => {
  try {
    const mundial = await ejecutarConsultaUno(
      'SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1'
    );

    res.json(mundial);
  } catch (error) {
    next(error);
  }
});

app.get('/search/:text', async (req, res, next) => {
  try {
    const text = searchSchema.parse(req.params.text);
    const buscar = `%${text.toLowerCase()}%`;

    const mundiales = await ejecutarConsulta(
      `
      SELECT * FROM mundiales
      WHERE LOWER(nombre) LIKE ?
         OR LOWER(resumen) LIKE ?
         OR LOWER(descripcion) LIKE ?
      ORDER BY anio DESC
      `,
      [buscar, buscar, buscar]
    );

    res.json(mundiales);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.errors[0].message });
  }

  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
