import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from 'dotenv'
import { animalRouter } from './routes/animalRouter.js'
import { enclosureRouter } from './routes/enclosureRouter.js'

config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/animal', animalRouter)
app.route('/enclosure', enclosureRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://${info.address}:${info.port}`)
})
