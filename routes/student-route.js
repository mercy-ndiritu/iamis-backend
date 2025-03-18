import express from 'express'
import { register, apply } from '../controller/student-controller.js'

const studentRouter = express.Router()

//studentRouter.route('/upload-data').post(uploadData)
studentRouter.route('/register').post(register)
studentRouter.route('/apply').post(apply)

export default studentRouter