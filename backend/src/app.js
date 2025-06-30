import express from 'express';
import cors from 'cors';
import mainRoute from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', mainRoute)

export default app