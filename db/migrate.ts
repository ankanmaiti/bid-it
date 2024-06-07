import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres, { PostgresError } from "postgres";

// load env into the current dir
// since this dir called outside next environment
loadEnvConfig(cwd());

(async function () {
  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
  const migrationDB = drizzle(migrationClient);

  try {
    await migrate(migrationDB, {
      migrationsFolder: "./db/migrations",
    });

    console.log("Migrations applied successfully.");
  } catch (error) {
    if (error instanceof PostgresError) {
      console.log(`${error.name}: ${error.message}`);
    }
  } finally {
    await migrationClient.end();
  }
})();
