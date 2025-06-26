import { Router } from "express";
import { yearStats } from "../controllers/yearStats.controller.js";

const router = Router()

router.get('/api/day/:year/:month/:day', yearStats);

export default router