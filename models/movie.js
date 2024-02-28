import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils'

const movies = readJSON('../movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    return movies.find(movie => movie.id === id)
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID,
      ...input.data
    }

    movies.push(newMovie)

    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input.data
    }

    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    return movies.splice(movieIndex, 1)
  }
}
