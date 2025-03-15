import express from 'express'
import { addCompany, getCompanies, updateStatus } from '../controller/admin-controller.js'

const adminRouter = express.Router()

adminRouter.route('/add-company').post(addCompany)
adminRouter.route('/get-companies').get(getCompanies)
adminRouter.route('/updateStatus').post(updateStatus)

export default adminRouter