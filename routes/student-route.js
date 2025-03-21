import express from 'express'
import { register, apply, getApplications } from '../controller/student-controller.js'

const studentRouter = express.Router()

//studentRouter.route('/upload-data').post(uploadData)
studentRouter.route('/register').post(register)
studentRouter.route('/apply').post(apply)
studentRouter.route('/get-my-applications').get(getApplications)

export default studentRouter