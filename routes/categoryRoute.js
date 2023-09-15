import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//routes
//create-category
router.post('/create-category', requireSignin, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController)

//get all category
router.get('/get-category', categoryController)

//get single category
router.get('/single-category/:slug', singleCategoryController)

//delete
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController)

export default router