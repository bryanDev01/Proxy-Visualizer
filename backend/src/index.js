import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dailyStats from "./routes/dailyStats.routes.js"
import topSitesStats from "./routes/topSites.routes.js"
import yearSitesStats from "./routes/yearStats.routes.js"
import usuarios from "./routes/usuarios.routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use(dailyStats)
app.use(yearSitesStats)
app.use(topSitesStats)
app.use(usuarios)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});