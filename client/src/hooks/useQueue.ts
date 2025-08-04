import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "./useWebSocket";
import { makeQueueRequest } from "../api/queue";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000";

interface QueueItem {
  id: string;
  status: "pending" | "processing" | "completed" | "error";
  result?: string;
  error?: string;
  index: number;
  createdAt: number;
}

interface WebSocketQueueMessage {
  type: string;
  requestId?: string;
  result?: string;
  error?: string;
  status?: "pending" | "processing" | "completed" | "error";
  [key: string]: unknown;
}

export function useQueue() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cleanup old items every 5 minutes
  useEffect(() => {
    const cleanup = setInterval(() => {
      setItems((currentItems) => {
        const cutoff = Date.now() - 5 * 60 * 1000; // 5 minutes ago
        return currentItems.filter(
          (item) =>
            item.status === "pending" ||
            item.status === "processing" ||
            item.createdAt > cutoff
        );
      });
    }, 5 * 60 * 1000); // Run every 5 minutes

    return () => clearInterval(cleanup);
  }, []);

  const handleWebSocketMessage = useCallback(
    (message: WebSocketQueueMessage) => {
      if (
        message.type === "QUEUE_RESULT" &&
        message.requestId &&
        message.status
      ) {
        const { requestId, result, error, status } = message;

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === requestId ? { ...item, status, result, error } : item
          )
        );
      }
    },
    []
  );

  const { isConnected, error: connectionError } = useWebSocket({
    url: WS_URL,
    onMessage: handleWebSocketMessage,
    onConnect: () => console.log("Queue WebSocket connected"),
    onDisconnect: () => console.log("Queue WebSocket disconnected"),
  });

  const startQueue = useCallback(async () => {
    if (isInitialized) return;
    setIsInitialized(true);

    const now = Date.now();
    const newItems: QueueItem[] = Array.from({ length: 20 }, (_, index) => ({
      id: "",
      status: "pending",
      index,
      createdAt: now,
    }));

    setItems(newItems);

    // Process all requests and collect results
    const requests = newItems.map(async (item, index) => {
      try {
        const requestId = await makeQueueRequest();
        return { index, requestId, error: null };
      } catch (err) {
        return {
          index,
          requestId: `error-${index}`,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    });

    // Wait for all requests to complete and update items in one go
    const results = await Promise.allSettled(requests);

    setItems((prevItems) =>
      prevItems.map((item, index) => {
        const result = results[index];
        if (result.status === "fulfilled") {
          const { requestId, error } = result.value;
          return error
            ? { ...item, id: requestId, status: "error" as const, error }
            : { ...item, id: requestId };
        }
        return {
          ...item,
          id: `error-${index}`,
          status: "error" as const,
          error: "Request failed",
        };
      })
    );
  }, [isInitialized]);

  const reset = useCallback(() => {
    setIsInitialized(false);
    setItems([]);
  }, []);

  useEffect(() => {
    if (isConnected && !isInitialized) {
      startQueue();
    }
  }, [isConnected, isInitialized]);

  return {
    items,
    isConnected,
    connectionError,
    startQueue,
    reset,
  };
}
