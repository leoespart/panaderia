import { users, settings, logs, type User, type InsertUser, type Log, type InsertLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteSettings(): Promise<any>;
  updateSiteSettings(data: any): Promise<void>;
  logAccess(entry: InsertLog): Promise<void>;
  getAccessLogs(): Promise<Log[]>;
  getVisitCount(): Promise<number>;
}

export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSiteSettings(): Promise<any> {
    const [setting] = await db.select().from(settings).limit(1);
    if (setting) {
      return JSON.parse(setting.data);
    }
    return null;
  }

  async updateSiteSettings(data: any): Promise<void> {
    const [existing] = await db.select().from(settings).limit(1);
    if (existing) {
      await db.update(settings).set({ data: JSON.stringify(data) }).where(eq(settings.id, existing.id));
    } else {
      await db.insert(settings).values({ data: JSON.stringify(data) });
    }
  }

  async logAccess(entry: InsertLog): Promise<void> {
    await db.insert(logs).values(entry);
  }

  async getAccessLogs(): Promise<Log[]> {
    return await db.select().from(logs).orderBy(desc(logs.id)).limit(100);
  }

  async getVisitCount(): Promise<number> {
    // We count entries where action is 'Visitor Access'
    // In a real app we might want to group by unique IPs or sessions, 
    // but for now simple counting of filtered logs is a good start.
    // However, count() is clearer.
    const result = await db.select({ count: logs.id }).from(logs).where(eq(logs.action, "Visitor Access"));
    return result.length;
  }
}

export const storage = new DbStorage();
