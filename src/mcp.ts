import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "jokesMCP",
  description: "A server that provides jokes",
  version: "1.0.0",
  tools: [
    {
      name: "get-chuck-joke",
      description: "Get a random Chuck Norris joke",
      parameters: {},
    },
    {
      name: "process-batch",
      description: "Process orders in batch",
      parameters: {
        type: "object",
        properties: {},
      },
    }
  ],
}, {
  capabilities: {
    logging: {},
    tools: {},
  }
});

server.tool(
  "get-chuck-joke",
  "Get a random Chuck Norris joke",
  {},
  async () => {
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
);

server.tool(
  "process-batch",
  "Process orders in batch",
  async (x) => {
    const duration = 20; // seconds
    const steps = 4; // number of steps
    const stepDuration = duration / steps;

    for (let i = 1; i < steps + 1; i++) {
      console.log(x.sessionId, x.signal)
      await new Promise((resolve) =>
        setTimeout(resolve, stepDuration * 1000)
      );

      console.log("Sending progress notification", i, steps);
      try {
        await server.server.notification({
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
        console.warn("Error sending notification:", e);
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
)

server.server.oninitialized = () => {
  console.log("Server initialized");
}

server.server.onclose = () => {
  console.log("Server closed");
}

server.server.onerror = (error: Error) => {
  console.error("Server error:", error);
}

// server.server.

export default server;