import { Express, Request, Response } from "express";
import server from "../mcp/mcp_server.js";
import { getFullUri } from "../util.js";
import { connectorPath } from "./routing.js";
import { CustomSseServerTransport } from "../transport/customSseTransport.js";

const messagePath = '/message';
const transports: { [sessionId: string]: CustomSseServerTransport } = {};

const constructTransport = (req: Request, res: Response) => {
  const fullUri = getFullUri(req, messagePath);
  const useAbsoluteUri = process.env.USE_ABSOLUTE_URI === "true";
  return new CustomSseServerTransport(fullUri, res, useAbsoluteUri);
}

export const setupSseRouting = (app: Express) => {
  const sseHandler = async (req: Request, res: Response) => {
    const transport = constructTransport(req, res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
      console.log('🔚 close sessionId', transport.sessionId);
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