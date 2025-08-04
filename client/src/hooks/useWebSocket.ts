import { useEffect, useRef, useState, useCallback } from "react";
import { WebSocketMessage } from "@shared/types/websocket";

interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (message: WebSocketMessage) => void;
  lastMessage: WebSocketMessage | null;
  error: string | null;
}

export function useWebSocket({
  url,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
}: UseWebSocketOptions): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messageQueue] = useState<WebSocketMessage[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onclose = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;

      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close();
      }

      wsRef.current = null;
    }

    // Clear message queue to prevent memory leak
    messageQueue.length = 0;
  }, [messageQueue]);

  const connect = useCallback(() => {
    if (!isMountedRef.current) return;

    // Validate WebSocket URL
    if (!url.startsWith("ws://") && !url.startsWith("wss://")) {
      setError("Invalid WebSocket URL format");
      return;
    }

    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    cleanup();

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMountedRef.current) return;
        setIsConnected(true);
        setError(null);
        reconnectCountRef.current = 0;

        // Send queued messages
        while (messageQueue.length > 0) {
          const queuedMessage = messageQueue.shift();
          if (queuedMessage) {
            ws.send(JSON.stringify(queuedMessage));
          }
        }

        onConnect?.();
      };

      ws.onclose = (event) => {
        if (!isMountedRef.current) return;
        setIsConnected(false);
        onDisconnect?.();

        if (
          event.code !== 1000 &&
          reconnectCountRef.current < reconnectAttempts
        ) {
          reconnectCountRef.current++;
          setError(
            `Connection lost. Reconnecting... (${reconnectCountRef.current}/${reconnectAttempts})`
          );

          // Exponential backoff: base interval * 2^attempt
          const backoffDelay =
            reconnectInterval * Math.pow(2, reconnectCountRef.current - 1);
          const maxDelay = 30000; // Cap at 30 seconds
          const delay = Math.min(backoffDelay, maxDelay);

          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              connect();
            }
          }, delay);
        } else {
          setError(
            reconnectCountRef.current >= reconnectAttempts
              ? "Failed to reconnect after maximum attempts"
              : "WebSocket connection closed"
          );
        }
      };

      ws.onmessage = (event) => {
        if (!isMountedRef.current) return;
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          onMessage?.(message);
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
          setError("Received invalid message format");
        }
      };

      ws.onerror = (event) => {
        if (!isMountedRef.current) return;
        setError("WebSocket connection error");
        onError?.(event);
      };
    } catch (err) {
      console.error("WebSocket init error:", err);
      setError("Failed to create WebSocket connection");
    }
  }, [
    url,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    reconnectAttempts,
    reconnectInterval,
    cleanup,
    messageQueue,
  ]);

  const sendMessage = useCallback(
    (message: WebSocketMessage) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify(message));
        } catch (err) {
          console.error("WebSocket send error:", err);
          setError("Failed to send message");
        }
      } else {
        // Queue message for when connection is restored
        messageQueue.push(message);
      }
    },
    [messageQueue]
  );

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    isConnected,
    sendMessage,
    lastMessage,
    error,
  };
}
