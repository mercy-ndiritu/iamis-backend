import express from 'express'
import { addCompany } from '../controller/admin-controller.js'

const adminRouter = express.Router()

adminRouter.route('/add-company').post(addCompany)

export default adminRouter