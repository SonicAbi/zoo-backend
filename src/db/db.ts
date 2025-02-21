import pg, { type Client, type Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: null | Client = null;
let pool: null | Pool = null;

export function getClient() {
  if (client) {
    return client;
  }
  client = new pg.Client({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return client;
}

export function getPool() {
  if (pool) {
    return pool;
  }
  pool = new pg.Pool({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return pool;
}
