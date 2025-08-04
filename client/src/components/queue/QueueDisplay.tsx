"use client";

import { useQueue } from "@/hooks/useQueue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, XCircle } from "lucide-react";
import { QueueStats } from "./QueueStats";
import { QueueItem } from "./QueueItem";

export function QueueDisplay() {
  const { items, isConnected, connectionError, reset } = useQueue();

  const stats = items.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    { pending: 0, processing: 0, completed: 0, error: 0 }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <Button onClick={reset} variant="outline" disabled={!isConnected}>
          Reset Queue
        </Button>
      </div>

      {connectionError && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-red-700">
            <XCircle className="w-4 h-4" />
            <span className="font-medium">Connection Error:</span>
            <span>{connectionError}</span>
          </div>
        </Card>
      )}

      <QueueStats
        pendingCount={stats.pending}
        processingCount={stats.processing}
        completedCount={stats.completed}
        errorCount={stats.error}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <QueueItem
            key={`${item.id}-${index}`}
            id={item.id}
            status={item.status}
            result={item.result}
            error={item.error}
            index={index}
          />
        ))}
      </div>

      {items.length === 0 && (
        <Card className="p-8">
          <div className="text-center space-y-2">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-medium">Queue Ready</h3>
            <p className="text-muted-foreground">
              {isConnected
                ? "Queue will start automatically when WebSocket is connected"
                : "Waiting for WebSocket connection..."}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
