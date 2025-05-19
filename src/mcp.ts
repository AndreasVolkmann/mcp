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
});

// Get Chuck Norris joke tool
server.tool(
  "get-chuck-joke",
  "Get a random Chuck Norris joke",
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
    const steps = 5; // number of steps
    const stepDuration = duration / steps;
    
    for (let i = 1; i < steps + 1; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, stepDuration * 1000)
      );
      console.log(x.sessionId, x.signal)

      // if (progressToken !== undefined) {
      //   await server.server.notification({
      //     method: "notifications/progress",
      //     params: {
      //       progress: i,
      //       total: steps,
      //       progressToken,
      //     },
      //   });
      // }
    }

    return {
      content: [
        {
          type: "text",
          text: `Batch processing completed. Duration: ${duration} seconds, Steps: ${steps}.`,
        },
      ]
    }
  }
)


export default server;