import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(createCategory).get(getCategories);

export default router;