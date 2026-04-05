import {Router} from 'express';
import { registerCentre, updateCentre, getCentreDetails, deleteCentre, addInventory, increaseInventory,consumeInventory, getInventoryAnalysis, getInventory, deleteInventory } from '../controller/centre.controller.js';

const router = Router();

router.post("/centrename", registerCentre);
router.put("/updatecentre/:id", updateCentre);
router.get("/allcentre", getCentreDetails);
router.delete("/deletecentre/:id", deleteCentre);

router.post("/add", addInventory);
router.put("/increase/:id", increaseInventory);
router.put("/consume/:id", consumeInventory);
router.get("/getinventory/:centreId", getInventory);
router.delete("/deleteinventory/:id", deleteInventory);
router.get("/analysis/:centreId", getInventoryAnalysis);

export default router;
