import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 3000

export const DB_PORT = process.env.DB_PORT || 5432
export const DATABASE = process.env.DATABASE || 'idsdb'
export const PASSWORD = process.env.PASSWORD || '123qwe45rt'
export const USER = process.env.USER || 'postgres'
export const HOST = process.env.HOST || 'localhost'