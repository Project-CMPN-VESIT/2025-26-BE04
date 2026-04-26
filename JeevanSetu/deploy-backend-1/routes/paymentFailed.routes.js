import express from "express";
import { notifyPaymentFailed } from "../controller/paymentFailed.controller.js";

const router = express.Router();

router.post("/payment-failed", notifyPaymentFailed);

export default router;