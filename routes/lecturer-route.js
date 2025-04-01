import express from 'express';
import { 
    assignedStudents,
    getPlacements
 } from '../controller/lecturer-controller.js';

const lecturerRouter = express.Router();

lecturerRouter.route('/assigned-students').get(assignedStudents);
lecturerRouter.route('/get-placements').get(getPlacements);

export default lecturerRouter;