import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { MCPInstrumentation } from "@arizeai/openinference-instrumentation-mcp";
import * as MCPServerStdioModule from "@modelcontextprotocol/sdk/server/stdio.js";
import * as MCPClientStdioModule from "@modelcontextprotocol/sdk/client/stdio.js";
import * as MCPServerSSEModule from "@modelcontextprotocol/sdk/server/sse.js";
import * as MCPClientSSEModule from "@modelcontextprotocol/sdk/client/sse.js";

/**
 * Sets up OpenInference instrumentation for the MCP server.
 * Must be called before importing/using MCP modules.
 */
export function setupInstrumentation() {
  const provider = new NodeTracerProvider();
  provider.register();

  const mcpInstrumentation = new MCPInstrumentation();
  // MCP must be manually instrumented as it doesn't have a traditional module structure
  mcpInstrumentation.manuallyInstrument({
    serverStdioModule: MCPServerStdioModule,
    clientStdioModule: MCPClientStdioModule,
    serverSSEModule: MCPServerSSEModule,
    clientSSEModule: MCPClientSSEModule,
  });

  console.log("🔍 OpenInference instrumentation setup complete");
}