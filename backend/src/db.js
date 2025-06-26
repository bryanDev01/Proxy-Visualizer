import { Pool } from 'pg'

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'idsdb',
    password: '123qwe45rt'
  })