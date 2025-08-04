import { parentPort } from "worker_threads";
import { faker } from "@faker-js/faker";

interface WorkerMessage {
  type: "PROCESS_REQUEST";
  requestId: string;
  data?: any;
}

interface WorkerResponse {
  type: "REQUEST_COMPLETED" | "REQUEST_ERROR";
  requestId: string;
  result?: string;
  error?: string;
}

// Process incoming messages from main thread
parentPort?.on("message", async (message: WorkerMessage) => {
  if (message.type === "PROCESS_REQUEST") {
    try {
      // Simulate processing with 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a fake result (could be based on message.data)
      const result = `Processed: ${faker.lorem.sentence()}`;

      const response: WorkerResponse = {
        type: "REQUEST_COMPLETED",
        requestId: message.requestId,
        result,
      };

      parentPort?.postMessage(response);
    } catch (error) {
      const response: WorkerResponse = {
        type: "REQUEST_ERROR",
        requestId: message.requestId,
        error: error instanceof Error ? error.message : "Unknown error",
      };

      parentPort?.postMessage(response);
    }
  }
});

// Handle worker shutdown gracefully
process.on("SIGTERM", () => {
  process.exit(0);
});

process.on("SIGINT", () => {
  process.exit(0);
});
