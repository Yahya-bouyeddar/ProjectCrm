import express from "express";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";
import { createLead, updateLead, deleteLead, getDashboardStats,listManagers ,createManager,deleteManager,updateManager} from "../controllers/employer.controller.js";  // Ajout de getDashboardStats
const router = express.Router();

// Protège les routes de l'employeur avec authMiddleware et roleMiddleware
router.use(authMiddleware);
router.use(roleMiddleware('employer'));


// Récupère les statistiques du tableau de bord (statistiques sur les leads)
router.get("/dashboard-stats", getDashboardStats);  // Ajoute cette route pour les stats du tableau de bord

// L'employeur peut créer, mettre à jour, supprimer des leads
router.post("/leads", createLead);
router.put("/leads/:id", updateLead);
router.delete("/leads/:id", deleteLead);

router.get("/managers", listManagers);
router.post("/managers", createManager);
router.delete("/managers/:id", deleteManager);
router.put("/managers/:id", updateManager);

export default router;
