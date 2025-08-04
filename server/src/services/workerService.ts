// src/services/workerService.ts
import { Worker } from "worker_threads";
import { queueService } from "./queueService";
import { broadcastToClients } from "./websocketService";
import path from "path";

interface WorkerResponse {
  type: "REQUEST_COMPLETED" | "REQUEST_ERROR";
  requestId: string;
  result?: string;
  error?: string;
}

// State for the service
let isShuttingDown = false;
const processingRequestIds = new Set<string>();
let processingInterval: NodeJS.Timeout | null = null;

async function processRequestInWorker(
  requestId: string,
  data?: any
): Promise<void> {
  queueService.markAsProcessing(requestId);
  processingRequestIds.add(requestId);

  broadcastToClients({
    type: "QUEUE_RESULT",
    requestId,
    status: "processing",
  });

  // Workers can't execute TypeScript directly, so we use the compiled JS file
  const workerScript = path.resolve(__dirname, "../workers/queueWorker.js");
  
  // Verify worker script exists
  if (!require('fs').existsSync(workerScript)) {
    const error = `Worker script not found: ${workerScript}`;
    console.error(error);
    queueService.markAsError(requestId, error);
    broadcastToClients({
      type: "QUEUE_RESULT",
      requestId,
      error,
      status: "error",
    });
    processingRequestIds.delete(requestId);
    return;
  }

  try {
    const worker = new Worker(workerScript);
    worker.postMessage({ type: "PROCESS_REQUEST", requestId, data });

    worker.on("message", (message: WorkerResponse) => {
      if (message.type === "REQUEST_COMPLETED") {
        queueService.markAsCompleted(requestId, message.result || "");
        broadcastToClients({
          type: "QUEUE_RESULT",
          requestId,
          result: message.result,
          status: "completed",
        });
      } else if (message.type === "REQUEST_ERROR") {
        queueService.markAsError(requestId, message.error || "Unknown error");
        broadcastToClients({
          type: "QUEUE_RESULT",
          requestId,
          error: message.error,
          status: "error",
        });
      }
      processingRequestIds.delete(requestId);
      worker.terminate();
    });

    worker.on("error", (error) => {
      console.error(`Worker error: ${error.message}`);
      queueService.markAsError(requestId, error.message);
      broadcastToClients({
        type: "QUEUE_RESULT",
        requestId,
        error: error.message,
        status: "error",
      });
      processingRequestIds.delete(requestId);
      worker.terminate();
    });
  } catch (error) {
    console.error(`Failed to create worker: ${error}`);
    queueService.markAsError(requestId, `Failed to create worker: ${error}`);
    broadcastToClients({
      type: "QUEUE_RESULT",
      requestId,
      error: `Failed to create worker: ${error}`,
      status: "error",
    });
    processingRequestIds.delete(requestId);
  }
}

function startProcessing(): void {
  if (processingInterval) return; // Prevent multiple intervals

  processingInterval = setInterval(() => {
    if (isShuttingDown) return;
    const pending = queueService.getPendingRequests();

    for (const req of pending) {
      if (!processingRequestIds.has(req.id)) {
        processRequestInWorker(req.id, req.data);
      }
    }
  }, 100);
}

async function shutdown(): Promise<void> {
  isShuttingDown = true;

  if (processingInterval) {
    clearInterval(processingInterval);
    processingInterval = null;
  }

  while (processingRequestIds.size > 0) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export const workerService = {
  startProcessing,
  shutdown,
};
