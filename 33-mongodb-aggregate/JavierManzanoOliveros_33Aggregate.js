// Enunciado: Devolver la cuenta de cuantas peliculas y series hay en espanol.

use sample_mflix

db.movies.aggregate([
  {
    $match: {
      languages: "Spanish"
    }
  },
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 }
    }
  }
])

// Enunciado: Con la misma busqueda, anadir los nombres de cada pelicula en un array.

use sample_mflix

db.movies.aggregate([
  {
    $match: {
      languages: "Spanish"
    }
  },
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 },
      movieNames: { $push: "$title" }
    }
  }
])

// Enunciado: Con la misma busqueda, devolver objetos con nombre, anio, valoracion imdb y generos.

use sample_mflix

db.movies.aggregate([
  {
    $match: {
      languages: "Spanish"
    }
  },
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 },
      movieDetails: {
        $push: {
          name: "$title",
          year: "$year",
          imdbRating: "$imdb.rating",
          genres: "$genres"
        }
      }
    }
  }
])

// Enunciado: Agrupar las peliculas por categorias y coger solo nombre, anio y valoracion media.

use sample_mflix

db.movies.aggregate([
  {
    $unwind: "$genres"
  },
  {
    $group: {
      _id: "$genres",
      movieDetails: {
        $push: {
          name: "$title",
          year: "$year"
        }
      },
      averageImdbRating: {
        $avg: "$imdb.rating"
      }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      movieDetails: 1,
      averageImdbRating: 1
    }
  }
])

// Enunciado: Agrupar las peliculas por valoracion (por enteros: [7, 8), [8, 9), etc.).

use sample_mflix

db.movies.aggregate([
  {
    $match: { "imdb.rating": { $type: "number" } }
  },
  {
    $group: {
      _id: { $floor: "$imdb.rating" },
      totalPeliculas: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      rango: {
        $concat: [
          "[",
          { $toString: "$_id" },
          ", ",
          { $toString: { $add: ["$_id", 1] } },
          ")"
        ]
      },
      totalPeliculas: 1
    }
  },
  { $sort: { categoria: 1 } }
])

// Enunciado: Devolver las peliculas agrupadas por genero (primer nivel) y por anio (segundo nivel).

use sample_mflix

db.movies.aggregate([
  {
    $match: {
      genres: { $exists: true, $ne: [] },
      year: { $type: "number" }
    }
  },
  {
    $unwind: "$genres"
  },
  {
    $group: {
      _id: {
        genre: "$genres",
        year: "$year"
      },
      movies: { $push: "$title" }
    }
  },
  {
    $group: {
      _id: "$_id.genre",
      years: {
        $push: {
          year: "$_id.year",
          movies: "$movies"
        }
      }
    }
  },
  {
    $sort: { _id: 1 }
  }
])
