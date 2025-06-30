import { Pool } from 'pg'
import { USER, HOST, DB_PORT, PASSWORD, DATABASE } from './config.js'

export const pool = new Pool({
    host: HOST,
    user: USER,
    port: DB_PORT,
    database: DATABASE,
    password: PASSWORD
  })