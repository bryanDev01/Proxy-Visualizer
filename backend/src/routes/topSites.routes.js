import { Router } from "express";
import { topSitesStats } from "../controllers/topSitesStats.controller.js";

const router = Router()

router.get('/api/top-sites/:mode', topSitesStats);

export default router