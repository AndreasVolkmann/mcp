import { Express, Request, Response } from "express";
import server from "../mcp/mcp_server.js";
import { getFullUri } from "../util.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { connectorPath } from "./routing.js";

const messagePath = '/message';

// to support multiple simultaneous connections, we have a lookup object from sessionId to transport
const transports: { [sessionId: string]: SSEServerTransport } = {};

export const setupSseRouting = (app: Express) => {
  const sseHandler = async (req: Request, res: Response) => {
    const fullUri = getFullUri(req, messagePath);
    const transport = new SSEServerTransport(fullUri, res);

    transports[transport.sessionId] = transport;
    res.on("close", () => {
      console.log('close sessionId', transport.sessionId);
      delete transports[transport.sessionId];
    });
    await server.connect(transport);
  };

  app.post(connectorPath, sseHandler);
  app.get(connectorPath, sseHandler);
  app.post(messagePath, async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send("No transport found for sessionId");
    }
  });
}