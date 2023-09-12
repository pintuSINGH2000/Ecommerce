import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';

//router object
const router = express.Router();

//Reqister || Post
router.post('/register',registerController);

//login || Post
router.post('/login',loginController);

//protected user route auth
router.get("/user-auth", requireSignin, (req,res) => {
    res.status(200).send({ ok: true });
})

//protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req,res) => {
    res.status(200).send({ ok: true });
})

export default router;