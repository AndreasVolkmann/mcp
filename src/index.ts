import express from "express";
import { requestLogger } from "./util.js";
import { setupCommonRouting } from "./routing/routing.js";
import { setupSseRouting } from "./routing/sse_routing.js";
import { setupHttpRouting } from "./routing/http_routing.js";

const app = express();
app.use(requestLogger);
const transport = process.env.transport || 'sse'

if (transport === "sse") {
  setupSseRouting(app)
} else if (transport === "http") {
  app.use(express.json());
  setupHttpRouting(app)
} else {
  throw new Error(`Unsupported transport: ${transport}`);
}

setupCommonRouting(app)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
