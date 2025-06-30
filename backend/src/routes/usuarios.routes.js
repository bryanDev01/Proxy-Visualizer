import { Router } from "express"
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarios, obtenerUsuario } from "../controllers/usuario.controller.js"

const router = Router()

router.get("/usuarios", obtenerUsuarios)
router.get("/usuarios/:id", obtenerUsuario)
router.post("/usuarios", crearUsuario)
router.patch("/usuarios/:id", actualizarUsuario)
router.delete("/usuarios/:id", eliminarUsuario)

export default router