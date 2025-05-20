import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from "@modelcontextprotocol/sdk/types.js";
import { capabilities, getJoke, processBatch, ToolName, toolSchema } from "./tools.js";
import { setupServerCommon } from "./common.js";

const server = new Server(
  {
    name: "example-servers/everything",
    version: "1.0.0",
  },
  {
    capabilities,
  }
);

setupServerCommon(server)

server.setRequestHandler(ListToolsRequestSchema, async (request, extra) => {
  console.log("🔍 List tools request:", request);
  const tools: Tool[] = toolSchema
  return { tools }
})

server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
  const { name, arguments: args } = request.params;

  if (name === ToolName.ECHO) {
    // const validatedArgs = EchoSchema.parse(args);
    return {
      content: [{ type: "text", text: `Echo: ${args}` }],
    };
  }

  if (name === ToolName.GET_JOKE) {
    return await getJoke()
  }

  if (name === ToolName.PROCESS_BATCH) {
    return await processBatch(server, extra)
  }

  throw new Error(`Unknown tool: ${name}`);
});

export default server;