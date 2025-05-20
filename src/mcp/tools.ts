import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export enum ToolName {
  ECHO = "echo",
  GET_JOKE = "get-chuck-joke",
  PROCESS_BATCH = "process-batch",
}

export const capabilities = {
  logging: {},
  tools: {},
}

export const toolSchema: Tool[] = [
  {
    name: ToolName.GET_JOKE,
    description: "Get a random Chuck Norris joke",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: ToolName.PROCESS_BATCH,
    description: "Process orders in batch",
    inputSchema: {
      type: "object",
      properties: {},
    },
  }
]

export const processBatch = async (mcpServer: Server, x: RequestHandlerExtra): Promise<CallToolResult> => {
  const duration = 20; // seconds
  const steps = 4; // number of steps
  const stepDuration = duration / steps;

  for (let i = 1; i < steps + 1; i++) {
    await new Promise((resolve) =>
      setTimeout(resolve, stepDuration * 1000)
    );

    console.log("↖️ Sending progress notification", i, steps);
    try {
      await mcpServer.notification({
        method: "notifications/message",
        params: {
          progress: i,
          total: steps,
          data: {
            type: 'activity',
            content: {
              type: "message",
              text: `Processing step ${i} of ${steps}`,
            }
          },
        },
      });
    } catch (e) {
      console.warn("⚠️ Error sending notification:", e);
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `Batch processing completed. Duration: ${duration} seconds, Steps: ${steps}.`,
      },
    ],
  }
}

export const getJoke = async (): Promise<CallToolResult> => {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await response.json();
  return {
    content: [
      {
        type: "text",
        text: data.value,
      },
    ],
  };
}