import express from 'express'
import { 
    addCompany, 
    getCompanies, 
    updateStatus, 
    getStudents, 
    updateStudentStatus, 
    getLectures, 
    updateLecturerStatus, 
    getApplications,
    updateApplicationStatus
} from '../controller/admin-controller.js'

const adminRouter = express.Router()

adminRouter.route('/add-company').post(addCompany)
adminRouter.route('/get-companies').get(getCompanies)
adminRouter.route('/updateStatus').post(updateStatus)
adminRouter.route('/get-students').get(getStudents)
adminRouter.route('/updateStudentStatus').post(updateStudentStatus)
adminRouter.route('/get-lectures').get(getLectures)
adminRouter.route('/updateLecturerStatus').post(updateLecturerStatus)
adminRouter.route('/get-applications').get(getApplications)
adminRouter.route('/updateApplicationStatus').post(updateApplicationStatus)


export default adminRouter