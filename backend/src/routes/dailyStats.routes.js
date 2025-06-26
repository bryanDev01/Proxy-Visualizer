import { Router } from "express"
import { dailyStats } from "../controllers/dailyStats.controller.js";

const router = Router()

router.get('/api/stats', dailyStats);

export default router