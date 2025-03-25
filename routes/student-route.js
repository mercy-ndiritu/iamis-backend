import express from 'express'
import { 
    register, 
    apply, 
    getApplications,
    logBook,
    getLogBook
} from '../controller/student-controller.js'

const studentRouter = express.Router()

//studentRouter.route('/upload-data').post(uploadData)
studentRouter.route('/register').post(register)
studentRouter.route('/apply').post(apply)
studentRouter.route('/get-my-applications').get(getApplications)
studentRouter.route('/logbook-entry').post(logBook)
studentRouter.route('/get-logbooks').get(getLogBook)

export default studentRouter