import { Express } from "express";

export const connectorPath = '/sse'


export const setupCommonRouting = (app: Express) => {
  app.get("/", (_req, res) => {
    res.send("✅ The MCP server is running!");
  });

}