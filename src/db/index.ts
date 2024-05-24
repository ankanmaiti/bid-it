import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from './schemas'

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, {
  schema
});

export { db };
