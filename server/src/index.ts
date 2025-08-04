import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createServer } from "http";
import peopleRoutes from "./routes/people";
import streamingRoutes from "./routes/streaming";
import queueRoutes from "./routes/queue";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { websocketService } from "./services/websocketService";
import { workerService } from "./services/workerService";
import { queueService } from "./services/queueService";

const app = express();
const PORT = 4000;
const server = createServer(app);

// security middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["http://localhost:3000"] // replace with prod domains
        : true, // Allow origins in dev
    credentials: true,
  })
);

// size limit on body parsing
app.use(express.json({ limit: "10mb" }));

app.use("/api", peopleRoutes);
app.use("/api", streamingRoutes);
app.use("/api", queueRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

websocketService.initialize(server);
workerService.startProcessing();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server ready on ws://localhost:${PORT}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);

  try {
    await workerService.shutdown();
    websocketService.close();
    queueService.destroy();

    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

export default app;
