import express from "express";
import { getYearlyReport } from "../controller/report.controller.js";

const router = express.Router();

router.get("/yearly/:year", getYearlyReport);
// Example:
// /yearly/2026?type=donations
// /yearly/2026?type=donations&download=true

export default router;