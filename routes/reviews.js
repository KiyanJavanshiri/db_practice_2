import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").post(createReview).get(getReviews);

export default router;
