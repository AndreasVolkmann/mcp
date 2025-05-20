import { CallToolResult, ServerCapabilities, Tool } from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { toolSet as demoToolSet } from "./demoToolSet.js"
import { toolSet as authToolSet } from "./authToolSet.js"


export type McpTool = Tool & {
  callback: (mcpServer: Server, args: Record<string, unknown>) => Promise<CallToolResult>;
}


export type ToolSet = {
  capabilities: ServerCapabilities;
  tools: McpTool[];
}


export const getToolSet = (): ToolSet => {
  const toolSetName = process.env.TOOL_SET || "demo";

  if (toolSetName === "demo") {
    return demoToolSet;
  } else if (toolSetName === "auth") {
    return authToolSet;
  } else {
    throw new Error(`Unknown tool set name "${toolSetName}"`);
  }
}