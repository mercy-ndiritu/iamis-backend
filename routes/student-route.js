import express from 'express'
import { 
    register, 
    apply, 
    getApplications,
    logBook,
    getLogBook,
    assignedTo,
    placement,
    logbookApproval,
    uploadFile
} from '../controller/student-controller.js'

const studentRouter = express.Router()

//studentRouter.route('/upload-data').post(uploadData)
studentRouter.route('/register').post(register)
studentRouter.route('/apply').post(apply)
studentRouter.route('/get-my-applications').get(getApplications)
studentRouter.route('/logbook-entry').post(logBook)
studentRouter.route('/get-logbooks').get(getLogBook)
studentRouter.route('/assigned-to').get(assignedTo)
studentRouter.route('/fill-placement').post(placement)
studentRouter.route('/logbook-approval').post(logbookApproval)
studentRouter.route('/upload-file').post(uploadFile)

export default studentRouter