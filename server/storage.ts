import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Site Settings
  getSiteSettings(): Promise<any>;
  updateSiteSettings(settings: any): Promise<any>;

  // Access Logs
  logAccess(entry: { timestamp: string, device: string, action: string }): Promise<void>;
  getAccessLogs(): Promise<{ timestamp: string, device: string, action: string }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteSettings: any | null;
  private accessLogs: { timestamp: string, device: string, action: string }[];

  constructor() {
    this.users = new Map();
    this.siteSettings = null; // Will start null, backend route will serve default if null
    this.accessLogs = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSiteSettings(): Promise<any> {
    return this.siteSettings;
  }

  async updateSiteSettings(settings: any): Promise<any> {
    this.siteSettings = settings;
    return this.siteSettings;
  }

  async logAccess(entry: { timestamp: string, device: string, action: string }): Promise<void> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Add new log
    this.accessLogs.unshift(entry);

    // Filter out logs older than 1 week
    this.accessLogs = this.accessLogs.filter(log => new Date(log.timestamp) > oneWeekAgo);
  }

  async getAccessLogs(): Promise<{ timestamp: string, device: string, action: string }[]> {
    return this.accessLogs;
  }
}

export const storage = new MemStorage();
