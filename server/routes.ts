import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Site Settings Routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings || {}); // Return empty object if null (frontend handles default)
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const settings = await storage.updateSiteSettings(req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Admin & Logs Routes
  app.post("/api/login", async (req, res) => {
    const userAgent = req.headers["user-agent"] || "Unknown Device";

    // Log the access
    await storage.logAccess({
      timestamp: new Date().toISOString(),
      device: userAgent,
      action: "Admin Login Success"
    });

    res.json({ success: true });
  });

  app.get("/api/logs", async (req, res) => {
    try {
      const logs = await storage.getAccessLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch logs" });
    }
  });

  return httpServer;
}
