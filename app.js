import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import movies from './movies.json' with { type: 'json' }

/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

// read a json file with ESModules
/* import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./movies.json') */

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3077

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
