# Tarea-2

API REST creada con Node.js, Express, SQLite y Zod. Permite consultar informacion sobre varias ediciones de la Copa Mundial de la FIFA.

## Instalacion

```bash
npm install
```

## Poblar la base de datos

```bash
node database/seed.js
```

Este comando crea el archivo `database/database.sqlite` y carga los datos desde `src/data.sql`.

## Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

El servidor usa el puerto `4321`.

## Rutas

- `GET /`
- `GET /mundiales`
- `GET /mundiales?include=full`
- `GET /mundial/:slug`
- `GET /campeon/:pais`
- `GET /random`
- `GET /search/:text`
- `GET /imagenes/*`

## Pruebas con xh

```bash
xh GET :4321/mundiales
xh GET :4321/mundiales include==full
xh GET :4321/mundial/qatar-2022
xh GET :4321/mundial/inexistente
xh GET :4321/campeon/Argentina
xh GET :4321/random
xh GET :4321/search/final
xh GET :4321/search/ab
```

### Captura: GET /mundiales

Comando usado:

```bash
xh GET :4321/mundiales
```

![Captura de xh GET /mundiales](docs/capturas/xh-get-mundiales.png)

## Respuestas de error esperadas

Mundial inexistente:

```json
{
  "error": "Mundial no encontrado"
}
```

Parametro `include` invalido:

```json
{
  "error": "Parametro include invalido"
}
```

Busqueda con menos de 3 caracteres:

```json
{
  "error": "El texto debe tener al menos 3 caracteres"
}
```

Ruta inexistente:

```json
{
  "error": "Ruta no encontrada"
}
```
