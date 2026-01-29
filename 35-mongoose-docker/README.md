# DWES - Tema 35 (Mongoose + Docker)

Práctica de consultas con Mongoose usando datasets de MongoDB en local con Docker.

## Requisitos
- Node.js instalado
- Docker Desktop en ejecución

## Estructura
```
35-mongoose-docker/
├─ bd/
│  ├─ sample_mflix/
│  ├─ sample_training/
│  └─ sample_weatherdata/
├─ models/
│  ├─ Comment.js
│  └─ Movie.js
├─ 01-weather-pagination-native.js
├─ 02-weather-pagination-plugin.js
├─ 03-mflix-populate-one-comment.js
├─ 04-mflix-aggregate-comments-by-movie.js
└─ package.json
```

## Instalación
```
npm install
```

## Importación de datos (Docker)
Los JSON de estos datasets **no** son arrays, por eso se importa **sin** `--jsonArray`.

```
docker start mongo

docker cp bd/sample_weatherdata/data.json mongo:/data.json
docker exec -it mongo mongoimport --db sample_weatherdata --collection data --file /data.json

docker cp bd/sample_mflix/movies.json mongo:/movies.json
docker exec -it mongo mongoimport --db sample_mflix --collection movies --file /movies.json

docker cp bd/sample_mflix/comments.json mongo:/comments.json
docker exec -it mongo mongoimport --db sample_mflix --collection comments --file /comments.json

docker cp bd/sample_training/grades.json mongo:/grades.json
docker exec -it mongo mongoimport --db sample_training --collection grades --file /grades.json
```

Comprobación rápida (opcional):
```
docker exec -it mongo mongosh
use sample_weatherdata
db.data.countDocuments()
use sample_mflix
db.movies.countDocuments()
db.comments.countDocuments()
use sample_training
db.grades.countDocuments()
```

## Ejercicios
### 1) Paginado nativo (skip/limit)
```
node 01-weather-pagination-native.js
```
BD: `sample_weatherdata` · Colección: `data`

### 2) Paginado con plugin (mongoose-paginate-v2)
```
node 02-weather-pagination-plugin.js
```
BD: `sample_weatherdata` · Colección: `data`

### 3) Populate (comment + movie)
```
node 03-mflix-populate-one-comment.js
```
BD: `sample_mflix` · Colecciones: `comments`, `movies`

Si no devuelve película, cambia el `_id` del comentario por otro que tenga `movie_id` válido.

### 4) Aggregate + $lookup (comments por película)
```
node 04-mflix-aggregate-comments-by-movie.js
```
BD: `sample_mflix` · Colecciones: `comments`, `movies`

Si no devuelve resultados, cambia el `_id` de la película por uno existente.

## Modelos usados
- `models/Movie.js` apunta a la colección real `movies`.
- `models/Comment.js` usa `ref: "Movie"` para el populate.
