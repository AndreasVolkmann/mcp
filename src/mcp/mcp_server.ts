import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { setupServerCommon } from "./common.js";
import { getToolSet } from "./toolSet.js";

const toolSet = getToolSet()
const tools = toolSet.tools

const server = new Server(
  {
    name: "server/demo",
    version: "1.0.0",
  },
  {
    capabilities: toolSet.capabilities,
  }
);

setupServerCommon(server)

server.setRequestHandler(ListToolsRequestSchema, async (request, extra) => {
  console.log("🔍 List tools request:", request);
  return { tools }
})

server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
  console.log("🔧 Call tool request:", request);
  const { name, arguments: args } = request.params;
  const matchingTools = tools.filter(t => t.name === name);
  if (matchingTools.length === 0) {
    throw new Error(`Tool ${name} not found`);
  }

  const tool = matchingTools[0]
  return await tool.callback(server, args || {})
});

export default server;