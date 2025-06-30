import { createClient } from "@supabase/supabase-js"
import { SUPABASE_API_KEY, SUPABASE_URL } from "./config.js"
// Local con DOCKER 
// import { Pool } from 'pg'
// import { USER, HOST, DB_PORT, PASSWORD, DATABASE } from './config.js'

// // export const pool = new Pool({
// //     host: HOST,
// //     user: USER,
// //     port: DB_PORT,
// //     database: DATABASE,
// //     password: PASSWORD
// //   })

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY)