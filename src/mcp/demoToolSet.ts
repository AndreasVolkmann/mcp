import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ToolSet } from "./toolSet.js";

const processBatch = async (mcpServer: Server): Promise<CallToolResult> => {
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

export const toolSet: ToolSet = {
  capabilities: {
    logging: {},
    tools: {},
  },
  tools: [
    {
      name: "get-chuck-joke",
      description: "Get a random Chuck Norris joke",
      inputSchema: {
        type: "object",
        properties: {},
      },
      callback: async (): Promise<CallToolResult> => {
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
    },
    {
      name: "process-batch",
      description: "Process orders in batch",
      inputSchema: {
        type: "object",
        properties: {},
      },
      callback: processBatch
    }
  ],
}