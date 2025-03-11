import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

import homeRouter from './routes/home-route.js'
import studentRouter from './routes/student-route.js'

config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json())

app.use("/api/student", studentRouter)
app.use("/api", homeRouter)

app.listen(PORT, ()  => {
    console.log('server is listening from port ', PORT)
})