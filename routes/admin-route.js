import express from 'express'
import { addCompany, getCompanies, updateStatus, getStudents, updateStudentStatus } from '../controller/admin-controller.js'

const adminRouter = express.Router()

adminRouter.route('/add-company').post(addCompany)
adminRouter.route('/get-companies').get(getCompanies)
adminRouter.route('/updateStatus').post(updateStatus)
adminRouter.route('/get-students').get(getStudents)
adminRouter.route('/updateStudentStatus').post(updateStudentStatus)

export default adminRouter