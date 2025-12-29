import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  function getDeviceShort(ua: string) {
    if (/iPhone/i.test(ua)) {
      if (/OS 15_/i.test(ua)) return "iPhone (iOS 15)";
      if (/OS 16_/i.test(ua)) return "iPhone (iOS 16)";
      if (/OS 17_/i.test(ua)) return "iPhone (iOS 17)";
      if (/OS 18_/i.test(ua)) return "iPhone (iOS 18)";
      return "iPhone";
    }
    if (/Android/i.test(ua)) return "Android Device";
    if (/Macintosh/i.test(ua)) return "Mac Computer";
    if (/Windows/i.test(ua)) return "Windows PC";
    return "Unknown Device";
  }

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
      const { settings, username, action } = req.body;
      const updatedSettings = await storage.updateSiteSettings(settings);

      // Log the detail
      const userAgent = req.headers["user-agent"] || "";
      await storage.logAccess({
        timestamp: new Date().toISOString(),
        device: getDeviceShort(userAgent),
        action: `${username || "Admin"}: ${action || "Cambió configuraciones"}`
      });

      res.json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Admin & Logs Routes
  app.post("/api/login", async (req, res) => {
    const { username } = req.body;
    const userAgent = req.headers["user-agent"] || "";

    // Log the access
    await storage.logAccess({
      timestamp: new Date().toISOString(),
      device: getDeviceShort(userAgent),
      action: `${username || "Admin"} inició sesión`
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
