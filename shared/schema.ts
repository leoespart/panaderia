import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(), // JSON string
});

export const logs = sqliteTable("logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  timestamp: text("timestamp").notNull(),
  device: text("device").notNull(),
  action: text("action").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLogSchema = createInsertSchema(logs).pick({
  timestamp: true,
  device: true,
  action: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLog = z.infer<typeof insertLogSchema>;
export type Log = typeof logs.$inferSelect;
