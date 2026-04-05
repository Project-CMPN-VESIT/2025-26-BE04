// routes/contactUs.routes.js
import express from "express";
import { submitContactUsForm } from "../controller/contactUs.controller.js";

const router = express.Router();

router.post("/contact-us", submitContactUsForm);

export default router;