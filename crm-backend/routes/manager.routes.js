import express from "express";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";  
import { updateLeadStatus,getAssignedLeads } from "../controllers/manager.controller.js";  
const router = express.Router();


router.use(authMiddleware);
router.use(roleMiddleware('manager'));  

router.get("/leads",getAssignedLeads)


router.patch("/leads/:id", updateLeadStatus); 

export default router;
