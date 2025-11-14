import express from "express";
import billController from "../controller/bill.controller";

const router = express.Router();
router.get("/:id", billController.getBillById);
export default router;
