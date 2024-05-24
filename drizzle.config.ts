import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { cwd } from "node:process";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/db/schemas/*",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true
});
