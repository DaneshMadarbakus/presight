import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import peopleRoutes from "./routes/people";
import streamingRoutes from "./routes/streaming";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 4000;

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
        ? ["http://localhost:3000"] // For prod domains
        : true, // Allow origins in dev
    credentials: true,
  })
);

// size limit on body parsing
app.use(express.json({ limit: "10mb" }));

app.use("/api", peopleRoutes);
app.use("/api/streaming", streamingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
