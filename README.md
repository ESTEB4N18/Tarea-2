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

## Propuesta de commits incrementales

1. Inicializar proyecto Node
2. Configurar Express
3. Crear base SQLite
4. Insertar datos de mundiales
5. Endpoint GET /
6. Endpoint GET /mundiales
7. Endpoint GET /mundial/:slug
8. Endpoint GET /campeon/:pais
9. Endpoint GET /random
10. Endpoint GET /search/:text
11. Validaciones con Zod
12. Middleware 404
13. Imagenes estaticas
14. README y referencias
