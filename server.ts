import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

const PORT = 3000;
const DEFAULT_PIXEL_ID = "1407604213914859";
const DEFAULT_CAPI_TOKEN = "EAAJhfGDZCD6IBR1SO3VZARPLqrVIZBRZBd2pjCaZCcNoqYnVbxiEIh5h3W4AgtmP8D5ZCcf5bGygBZCn3oHFijNZC2VQQjeh9BF6N1eav464Itgnw148oEAbTfme6UAymX34BB0XSA2UCePoDc3H2khLyrVDiZBnKO9WPJ7K0uJl4holjFmcDCWgnFLZBOQwZBCUVT2VgZDZD";

// Helper function to hash sensitive values in SHA-256 as required by Meta
function hashValue(value: string): string {
  const cleanValue = value.trim().toLowerCase();
  return crypto.createHash("sha256").update(cleanValue).digest("hex");
}

async function startServer() {
  const app = express();

  // Parse JSON requests
  app.use(express.json());

  // 1. API: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 2. API: Meta Conversions API (CAPI) Proxy
  app.post("/api/fb-capi", async (req, res) => {
    try {
      const { eventName, eventUrl, email, value, currency, contentName } = req.body;

      if (!eventName) {
        return res.status(400).json({ error: "Missing eventName parameter" });
      }

      // Read secrets from environment variables, with requested safe fallbacks
      const pixelId = process.env.VITE_FB_PIXEL_ID || DEFAULT_PIXEL_ID;
      const capiToken = process.env.FB_CAPI_TOKEN || DEFAULT_CAPI_TOKEN;

      // Prepare user data object
      const userData: Record<string, any> = {};

      // Capture client IP and User-Agent
      const clientIp = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "").split(",")[0].trim();
      const clientUserAgent = req.headers["user-agent"] || "";

      if (clientIp) {
        userData.client_ip_address = clientIp;
      }
      if (clientUserAgent) {
        userData.client_user_agent = clientUserAgent;
      }

      // Hash email if present (Advanced Matching)
      if (email && typeof email === "string" && email.includes("@")) {
        userData.em = [hashValue(email)];
      }

      // Build the event item structure
      const eventItem: Record<string, any> = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventUrl || "https://desafiobarrigazero.com.br/",
        user_data: userData,
      };

      // Optional custom data
      const customData: Record<string, any> = {};
      if (value !== undefined) {
        customData.value = Number(value);
      }
      if (currency) {
        customData.currency = currency;
      } else if (value !== undefined) {
        customData.currency = "BRL";
      }
      if (contentName) {
        customData.content_name = contentName;
      }

      if (Object.keys(customData).length > 0) {
        eventItem.custom_data = customData;
      }

      // Meta Conversions API URL
      const metaUrl = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${capiToken}`;

      // Send the request directly to Meta API
      const metaResponse = await fetch(metaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [eventItem],
        }),
      });

      const metaResult = await metaResponse.json();

      if (!metaResponse.ok) {
        console.error("[Meta CAPI Server Proxy Error]:", metaResult);
        return res.status(metaResponse.status).json({
          success: false,
          error: "Failed to send event to Meta CAPI",
          details: metaResult,
        });
      }

      return res.json({
        success: true,
        metaResult,
      });

    } catch (error: any) {
      console.error("[Meta CAPI Endpoint Crash]:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Internal Server Error",
      });
    }
  });

  // 3. Mount Vite Dev Middleware in Development, or Serve Built Assets in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Vite Developer Server Mode] Middleware mounted successfully");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`[Production Server Mode] Serving static resources from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer();
