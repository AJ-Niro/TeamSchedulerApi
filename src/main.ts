import 'reflect-metadata'
import 'dotenv/config' // Loads environment variables
import express from 'express'
import userRouter from './routes/user.router'
import { AppDataSource } from './config/typeorm.config'

const app = express()
const PORT = process.env.PORT ?? 3000

// Middleware to parse JSON bodies
app.use(express.json())

app.use('/user', userRouter)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established')

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.error('Database connection failed:', error))
