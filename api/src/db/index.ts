import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

import env from '../env.ts';

const db = drizzle({
  connection: { uri: env.DATABASE_URL },
});

export type DB = typeof db;

export async function ping(db: DB) {
  return await db.execute(sql`SELECT 1`);
}

export default db;
