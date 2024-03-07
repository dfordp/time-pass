import express from "express";

import { getAllTasks, getTask, createNewTask, deleteTask, updateTask, getTasksByUser } from "../controllers/task.controller.js";
import { isLoggedIn ,isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/createTask').post(isLoggedIn ,createNewTask);
router.route('/getTasks').get(isLoggedIn, getAllTasks);
router.route('/getTask/:id').get(isLoggedIn, getTask);
router.route('/deleteTask/:id').delete(isLoggedIn, deleteTask);
router.route('/updateTask/:id').patch(isLoggedIn, updateTask);
router.route('/getTasksByUser/:userId').get(isLoggedIn, getTasksByUser);

export default router;
