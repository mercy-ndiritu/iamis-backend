import express from 'express'
import { home } from '../controller/home-controller.js'

const homeRouter = express.Router()

homeRouter.route("/").get(home)

export default homeRouter