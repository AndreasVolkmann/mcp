import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { capabilities, getJoke, processBatch, ToolName, toolSchema } from "./tools.js";
import { setupServerCommon } from "./common.js";

const server = new McpServer({
  name: "devMCP",
  description: "A dev server",
  version: "1.0.0",
  tools: toolSchema,
}, {
  capabilities
});

const mcpServer = server.server;

server.tool(
  ToolName.GET_JOKE,
  "Get a random Chuck Norris joke",
  {},
  async () => await getJoke()
);

server.tool(
  ToolName.PROCESS_BATCH,
  "Process orders in batch",
  async (x) => await processBatch(mcpServer, x)
)

setupServerCommon(mcpServer)

export default server;