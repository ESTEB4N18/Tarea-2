DROP TABLE IF EXISTS mundiales;

CREATE TABLE mundiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  anio INTEGER,
  sede TEXT,
  campeon TEXT,
  subcampeon TEXT,
  goleador TEXT,
  equipos INTEGER,
  imagen TEXT,
  slug TEXT UNIQUE,
  resumen TEXT,
  descripcion TEXT
);

INSERT INTO mundiales (
  nombre,
  anio,
  sede,
  campeon,
  subcampeon,
  goleador,
  equipos,
  imagen,
  slug,
  resumen,
  descripcion
) VALUES
(
  'Copa Mundial Corea/Japon 2002',
  2002,
  'Corea del Sur y Japon',
  'Brasil',
  'Alemania',
  'Ronaldo',
  32,
  'corea-japon-2002.avif',
  'corea-japon-2002',
  'Brasil gano su quinto titulo mundial con Ronaldo como figura.',
  'Primer Mundial organizado por dos paises; Brasil vencio a Alemania en la final.'
),
(
  'Copa Mundial Alemania 2006',
  2006,
  'Alemania',
  'Italia',
  'Francia',
  'Miroslav Klose',
  32,
  'alemania-2006.avif',
  'alemania-2006',
  'Italia campeon tras una final definida por penales ante Francia.',
  'Alemania fue sede de un torneo recordado por la organizacion y por el cuarto titulo de Italia.'
),
(
  'Copa Mundial Sudafrica 2010',
  2010,
  'Sudafrica',
  'Espana',
  'Paises Bajos',
  'Thomas Muller',
  32,
  'sudafrica-2010.avif',
  'sudafrica-2010',
  'Espana gano su primer Mundial con gol de Andres Iniesta en la final.',
  'Primer Mundial en Africa; Espana derroto a Paises Bajos en tiempo extra.'
),
(
  'Copa Mundial Brasil 2014',
  2014,
  'Brasil',
  'Alemania',
  'Argentina',
  'James Rodriguez',
  32,
  'brasil-2014.avif',
  'brasil-2014',
  'Alemania campeon tras vencer a Argentina en una final cerrada.',
  'Brasil organizo el torneo y Alemania gano su cuarto titulo con gol de Mario Gotze.'
),
(
  'Copa Mundial Rusia 2018',
  2018,
  'Rusia',
  'Francia',
  'Croacia',
  'Harry Kane',
  32,
  'rusia-2018.avif',
  'rusia-2018',
  'Francia gano su segundo titulo mundial derrotando a Croacia.',
  'Rusia fue sede de un torneo con muchas sorpresas y una final de seis goles.'
),
(
  'Copa Mundial Qatar 2022',
  2022,
  'Qatar',
  'Argentina',
  'Francia',
  'Kylian Mbappe',
  32,
  'qatar-2022.avif',
  'qatar-2022',
  'Argentina campeon tras una final epica ante Francia.',
  'Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo.'
);
