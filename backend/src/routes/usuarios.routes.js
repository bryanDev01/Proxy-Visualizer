import { Router } from "express"
import { actualizarUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios } from "../controllers/usuario.controller.js"

const router = Router()

router.get("/usuario", obtenerUsuarios)
router.post("/usuario/:id", obtenerUsuario)
router.patch("/usuario/:id", actualizarUsuario)
router.delete("/usuario/:id", eliminarUsuario)

export default router