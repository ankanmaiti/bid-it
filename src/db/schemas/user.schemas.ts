import {
  date,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    name: varchar("name", { length: 30 }).notNull(),
    email: varchar("email", { length: 150 }).notNull().unique(),
    dob: date("dob", { mode: "date" }).notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIndex: index("emailIndex").on(table.email),
  }),
);

// Infer the types
export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
