import express from 'express'
import { register } from '../controller/student-controller.js'

const studentRouter = express.Router()

//studentRouter.route('/upload-data').post(uploadData)
studentRouter.route('/register').post(register)

export default studentRouter