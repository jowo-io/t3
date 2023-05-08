import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql, { type Pool } from "mysql2/promise";

import { env } from "@/env.mjs";

const globalForMySQL = globalThis as unknown as { poolConnection: Pool };

const poolConnection =
  globalForMySQL.poolConnection ||
  mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ...(env.NODE_ENV === "production" ? { ssl: {} } : {}),
  });

if (env.NODE_ENV !== "production")
  globalForMySQL.poolConnection = poolConnection;

export const db: MySql2Database = drizzle(poolConnection);
