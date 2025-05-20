import { Server } from "@modelcontextprotocol/sdk/server/index.js";

export const setupServerCommon = (mcpServer: Server) => {
  mcpServer.oninitialized = () => {
    console.log("🎬 Server initialized");
  }

  mcpServer.onclose = () => {
    // console.log("🔚 Server closed");
  }

  mcpServer.onerror = (error: Error) => {
    console.error("❌ Server error:", error);
  }
}