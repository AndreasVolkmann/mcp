import express from "express";
import { requestLogger } from "./util.js";
import { setupRouting } from "./routing.js";

const app = express();
app.use(requestLogger);
// app.use(express.json());
setupRouting(app)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
