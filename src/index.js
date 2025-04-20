import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

import homeRouter from '../routes/home-route.js'
import studentRouter from '../routes/student-route.js'
import adminRouter from '../routes/admin-route.js'
import lecturerRouter from '../routes/lecturer-route.js'

config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(cors({
    origin: ['http://localhost:5173','https://iamis-app-new.vercel.app'],
}))
app.use(express.json())

app.use("/api/admin", adminRouter)
app.use("/api/student", studentRouter)
app.use("/api/lecturer", lecturerRouter)
app.use("/api", homeRouter)

app.listen(PORT, ()  => {
    console.log('server is listening from port ', PORT)
})