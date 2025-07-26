import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import  isAuthenticated  from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
import multer from 'multer';

const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/logout', logoutUser);
router.route('/register').post(singleUpload,register);
router.route('/login').post(login);
router.route('/profile/update').post(isAuthenticated,singleUpload, updateProfile);
router.route('/logout').get(logout);

export default router;