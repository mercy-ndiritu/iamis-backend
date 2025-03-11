import express from 'express'
import { uploadData } from '../controller/student-controller.js'

const studentRouter = express.Router()

studentRouter.route('/upload-data').post(uploadData)

export default studentRouter