import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { WebSocketMessage } from "@shared/types/websocket";

let wss: WebSocketServer | null = null;
const clients = new Set<WebSocket>();


function sendToClient(ws: WebSocket, message: WebSocketMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
      clients.delete(ws);
    }
  }
}

function initialize(server: Server): void {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");
    clients.add(ws);

    sendToClient(ws, {
      type: "CONNECTION_ESTABLISHED",
      message: "WebSocket connection established",
    });

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Received WebSocket message:", message.type);
      } catch (error) {
        console.error("Invalid WebSocket message:", error);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clients.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clients.delete(ws);
    });
  });

}

function broadcast(message: WebSocketMessage): void {
  const messageStr = JSON.stringify(message);

  // Remove dead connections and send to live ones
  const deadConnections: WebSocket[] = [];

  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(messageStr);
      } catch (error) {
        console.error("Error broadcasting message:", error);
        deadConnections.push(ws);
      }
    } else {
      deadConnections.push(ws);
    }
  });

  // Clean up dead connections
  deadConnections.forEach((ws) => {
    clients.delete(ws);
  });
}

function close(): void {
  if (wss) {
    wss.clients.forEach((ws) => {
      ws.terminate();
    });
    wss.close();
    wss = null;
  }
  clients.clear();
}

export const websocketService = {
  initialize,
  broadcast,
  close,
};

// Helper function for broadcasting
export function broadcastToClients(message: WebSocketMessage): void {
  websocketService.broadcast(message);
}
