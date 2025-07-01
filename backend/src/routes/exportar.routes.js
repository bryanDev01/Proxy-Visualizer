import { Router } from "express";
import { exportarDatos } from "../controllers/exportar.controller.js";

const router = Router();

router.get("/exportar-datos", exportarDatos);

export default router; 