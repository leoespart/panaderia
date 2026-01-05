import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import express from "express";
import fs from "fs";

// Configure multer for disk storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
});

const requireAuth = (req: any, res: any, next: any) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Serve uploaded files statically
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // File Upload Endpoint
  app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // Return the full URL or relative path accessible via the static route
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "File upload failed" });
    }
  });

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

  app.post("/api/settings", requireAuth, async (req, res) => {
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

  // Visit Counting Routes
  app.post("/api/visit", async (req, res) => {
    // Determine if we should count this visit
    // Use session to avoid duplicates on refresh
    if (req.session && req.session.visited) {
      return res.json({ message: "Already visited" });
    }

    req.session.visited = true;
    const userAgent = req.headers["user-agent"] || "";

    try {
      await storage.logAccess({
        timestamp: new Date().toISOString(),
        device: getDeviceShort(userAgent),
        action: "Visitor Access"
      });
      res.json({ success: true });
    } catch (e) {
      console.error("Visit log error", e);
      res.status(500).json({ message: "Error logging visit" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const visits = await storage.getVisitCount();
      res.json({ visits });
    } catch (e) {
      res.status(500).json({ message: "Error fetching stats" });
    }
  });

  // Admin & Logs Routes
  app.post("/api/login", async (req: any, res) => {
    const { password } = req.body;
    const userAgent = req.headers["user-agent"] || "";

    let username = null;
    if (password === "Rodriguez11") username = "Yadiel";
    if (password === "Alexi1976") username = "Alex";

    if (username) {
      req.session.user = { username };

      // Log the access
      await storage.logAccess({
        timestamp: new Date().toISOString(),
        device: getDeviceShort(userAgent),
        action: `${username} inició sesión`
      });

      res.json({ success: true, username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  app.get("/api/logs", requireAuth, async (req, res) => {
    try {
      const logs = await storage.getAccessLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch logs" });
    }
  });

  return httpServer;
}
