import express from "express";
import cors from "cors";

import authorRouter from "./routes/author.router";
import bookRouter from "./routes/book.router";
import postRouter from "./routes/post.router";
import paymentRouter from "./routes/payment.router"
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/payment", paymentRouter);
app.use("/posts", postRouter); // Fixed "/post" -> "/posts" for consistency

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("❌ Server shutting down gracefully...");
  server.close(() => {
    console.log("🛑 Server closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("⚠️ Received termination signal. Closing server...");
  server.close(() => {
    console.log("✅ Cleanup complete. Server shutting down.");
    process.exit(0);
  });
});