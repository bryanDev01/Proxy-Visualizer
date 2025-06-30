import { Router } from "express";
import { actualizarValorCriterio, crearValorCriterio, eliminarValorCriterio, obtenerValorCriterios, obtenerValorCriterio } from "../controllers/valores_criterio.controller.js";

const router = Router()

router.get("/valorCriterios", obtenerValorCriterios)
router.get("/valorCriterios/:id", obtenerValorCriterio)
router.post("/valorCriterios", crearValorCriterio)
router.patch("/valorCriterios/:id", actualizarValorCriterio)
router.delete("/valorCriterios/:id", eliminarValorCriterio)

export default router