import { randomUUID } from "node:crypto";
import { Express } from "express";
import { connectorPath } from "./routing.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

export const setupHttpRouting = (app: Express) => {
  app.post(connectorPath, (req, res) => {
    console.log(req.body);

    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      id: 1,
      params: {},
      result: {},
      method: ""
    }

    res.status(200).send(message);
  })
}