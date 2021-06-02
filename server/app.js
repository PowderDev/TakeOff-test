import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import cookieParser from 'cookie-parser'
import * as path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use('/api', userRoutes)
app.use('/api/contact', contactRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(path.dirname, '..', '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.dirname, '..', 'client', 'build', 'index.html'))
  )
}

export default app