const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'database.sqlite');
const sqlPath = path.join(__dirname, '..', 'src', 'data.sql');

const sql = fs.readFileSync(sqlPath, 'utf8');
const db = new sqlite3.Database(dbPath);

db.exec(sql, (error) => {
  if (error) {
    console.error('Error al poblar la base de datos:', error.message);
  } else {
    console.log('Base de datos creada y poblada correctamente');
  }

  db.close();
});
