import dotenv from "dotenv";
import express from "express";

import documents from "./routes/documents.js";
import authenticate from "./routes/authenticate.js";
import Task from "./routes/task.js";

(async function () {
  dotenv.config();

  const { PORT } = process.env;
  const app = express();
  const server = app.listen(PORT, () =>
    console.log(`Backend started on port ${PORT}`)
  );

  app.use("/documents", authenticate, documents);
  app.use("/task", authenticate, Task);
})();