import { Router } from 'express';
<<<<<<< HEAD
import { 
    signup, 
    login, 
    getUserInfo, 
    updateProfile,
    addProfileImage,
    removeProfileImage
 } from '../controllers/AuthControllers.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

import multer from 'multer';

const authRoutes = Router(); 

const upload = multer({ dest: "uploads/profiles/"});

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyToken, getUserInfo);
authRoutes.post('/update-profile',verifyToken, updateProfile);
authRoutes.post(
    '/add-profile-image',
    verifyToken, 
    upload.single("profile-image"), addProfileImage
 );

 authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);
=======
import { signup } from '../controllers/AuthControllers.js';

const authRoutes = Router();
authRoutes.post('/signup', signup);
>>>>>>> parent of 20e151e (" day 3,4")

export default authRoutes;