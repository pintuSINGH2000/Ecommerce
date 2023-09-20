import express from 'express';
import { getAllOrderController, getAllUserController, getOrderController, loginController, registerController, updateOrderStatusController, updateProfileController } from '../controllers/authController.js';
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

//update Profile route
router.put("/profile", requireSignin,updateProfileController);

//order
router.get("/orders",requireSignin,getOrderController);

//all order
router.get("/all-orders",requireSignin,isAdmin,getAllOrderController);

//order status update
router.put("/order-status/:orderId",requireSignin,isAdmin,updateOrderStatusController);

//get all users
router.get("/all-users",requireSignin,isAdmin,getAllUserController);

export default router;