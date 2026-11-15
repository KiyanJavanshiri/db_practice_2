import express from "express";
import { createUser, getUsers } from "../controllers/usersController.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

export default router;
