import express from "express";
import { submitJoinUsForm } from "../controller/joinUs.controller.js";

const router = express.Router();

router.post("/join-us", submitJoinUsForm);

export default router;