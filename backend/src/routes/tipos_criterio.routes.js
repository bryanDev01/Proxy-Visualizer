import { Router } from "express"
import { actualizarTipoCriterio, crearTipoCriterio, eliminarTipoCriterio, obtenerTiposCriterio, obtenerTipoCriterio } from "../controllers/tipos_criterio.controller.js"

const router = Router()

router.get("/tipoCriterios", obtenerTiposCriterio)
router.get("/tipoCriterios/:id", obtenerTipoCriterio)
router.post("/tipoCriterios", crearTipoCriterio)
router.patch("/tipoCriterios/:id", actualizarTipoCriterio)
router.delete("/tipoCriterios/:id", eliminarTipoCriterio)

export default router