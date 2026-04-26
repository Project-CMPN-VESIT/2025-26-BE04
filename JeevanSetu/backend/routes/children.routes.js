import { Router } from "express";
import { registerChild, updateChild, getChildDetails,getChildrenDetailsByCentre, getAllChildren, filterChildren } from "../controller/children.controller.js";

const router = Router();

router.post("/addchild", registerChild);
router.put("/updatechild/:id", updateChild);
router.get("/getchild/:id", getChildDetails);
router.get("/children/centre/:centreId", getChildrenDetailsByCentre);
router.get("/getchildren", getAllChildren);


router.get("/filterchildren/filter", filterChildren);
//possible ans
// /children/filter?gender=male
// /children/filter?minAge=6&maxAge=12
// /children/filter?centre=65af3c&minSSC=60
// /children/filter?standardofEducation=SSC&minSSC=75




export default router;