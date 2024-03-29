import express from "express";

import {getAllUsers,getUser,deleteUser,updateUser} from '../controllers/user.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"


const router = express.Router();

router.route('/getUsers').get(isLoggedIn,getAllUsers);
router.route('/getUser/:id').get(isLoggedIn,isOwner,getUser);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/updateUser/:id').patch(updateUser);

export default router;
