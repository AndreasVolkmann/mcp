import { Express, Request, Response } from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import server from "./mcp/mcp_server.js";
import { getFullUri } from "./util.js";

const path = '/message';

// to support multiple simultaneous connections, we have a lookup object from sessionId to transport
const transports: { [sessionId: string]: SSEServerTransport } = {};

export const setupRouting = (app: Express) => {
  const sseHandler = async (req: Request, res: Response) => {
    const fullUri = getFullUri(req, path);
    const transport = new SSEServerTransport(fullUri, res);

    transports[transport.sessionId] = transport;
    res.on("close", () => {
      console.log('close sessionId', transport.sessionId);
      delete transports[transport.sessionId];
    });
    await server.connect(transport);
  };

  app.post("/sse", sseHandler);
  app.get("/sse", sseHandler);
  app.post(path, async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send("No transport found for sessionId");
    }
  });

  app.get("/", (_req, res) => {
    res.send("✅ The MCP server is running!");
  });
}