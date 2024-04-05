import express from "express";
import { addCategory, getAllCategories, deleteCategory } from "../controllers/videoCategoryController.js";

const router = express.Router();

router.post("/category", addCategory);
router.get("/category", getAllCategories);
router.delete("/category/:categoryID", deleteCategory)

export default router;