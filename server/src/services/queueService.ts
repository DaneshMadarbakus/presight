import { v4 as uuidv4 } from "uuid";

export interface QueueRequest {
  id: string;
  status: "pending" | "processing" | "completed" | "error";
  data?: any;
  result?: string;
  createdAt: Date;
  processedAt?: Date;
  error?: string;
}

// Functional queue service implementation
const queue = new Map<string, QueueRequest>();
const MAX_QUEUE_SIZE = 1000;
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
let cleanupInterval: NodeJS.Timeout | null = null;

function cleanupOldRequests(): void {
  const cutoffTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago

  for (const [id, request] of queue.entries()) {
    if (
      request.createdAt < cutoffTime &&
      (request.status === "completed" || request.status === "error")
    ) {
      queue.delete(id);
    }
  }
}

function startCleanup(): void {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    cleanupOldRequests();
  }, CLEANUP_INTERVAL);
}

function addRequest(data?: any): string {
  // Prevent memory overload
  if (queue.size >= MAX_QUEUE_SIZE) {
    cleanupOldRequests();
  }

  const id = uuidv4();
  const request: QueueRequest = {
    id,
    status: "pending",
    data,
    createdAt: new Date(),
  };

  queue.set(id, request);
  return id;
}

function updateRequest(id: string, updates: Partial<QueueRequest>): boolean {
  const request = queue.get(id);
  if (!request) return false;

  Object.assign(request, updates);
  return true;
}

function markAsProcessing(id: string): boolean {
  return updateRequest(id, { status: "processing" });
}

function markAsCompleted(id: string, result: string): boolean {
  return updateRequest(id, {
    status: "completed",
    result,
    processedAt: new Date(),
  });
}

function markAsError(id: string, error: string): boolean {
  return updateRequest(id, {
    status: "error",
    error,
    processedAt: new Date(),
  });
}

function getPendingRequests(): QueueRequest[] {
  return Array.from(queue.values()).filter((req) => req.status === "pending");
}

function destroy(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
  queue.clear();
}

// Initialize cleanup on module load
startCleanup();

export const queueService = {
  addRequest,
  markAsProcessing,
  markAsCompleted,
  markAsError,
  getPendingRequests,
  destroy,
};
