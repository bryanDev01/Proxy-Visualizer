import { Router } from "express";
import dailyStats from "./dailyStats.routes.js"
import topSitesStats from "./topSites.routes.js"
import yearSitesStats from "./yearStats.routes.js"
import usuarios from "./usuarios.routes.js"
import valor_criterio from "./valores_criterio.routes.js"
import tipo_criterio from "./tipos_criterio.routes.js"

const mainRoute = Router()

mainRoute.use(usuarios)
mainRoute.use(valor_criterio)
mainRoute.use(tipo_criterio)
mainRoute.use(dailyStats)
mainRoute.use(yearSitesStats)
mainRoute.use(topSitesStats)

export default mainRoute