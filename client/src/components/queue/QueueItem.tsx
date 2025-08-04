"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

interface QueueItemProps {
  id: string;
  status: "pending" | "processing" | "completed" | "error";
  result?: string;
  error?: string;
  index: number;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "processing":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "error":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    processing: "default",
    completed: "outline",
    error: "destructive",
  } as const;

  return (
    <Badge
      variant={variants[status as keyof typeof variants] || "secondary"}
      className={`capitalize ${
        status === "completed" ? "border-green-500 text-green-700" : ""
      }`}
    >
      {status}
    </Badge>
  );
};

const getStatusContent = (status: string, result?: string, error?: string) => {
  switch (status) {
    case "pending":
      return <p className="text-sm text-muted-foreground">Waiting...</p>;
    case "processing":
      return <p className="text-sm text-muted-foreground">Processing...</p>;
    case "completed":
      return result ? (
        <p className="text-xs text-green-700 break-words">{result}</p>
      ) : null;
    case "error":
      return error ? (
        <p className="text-xs text-red-700 break-words">Error: {error}</p>
      ) : null;
    default:
      return null;
  }
};

export function QueueItem({
  id,
  status,
  result,
  error,
  index,
}: QueueItemProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">Request {index + 1}</span>
          {getStatusIcon(status)}
        </div>

        <div className="flex justify-center">{getStatusBadge(status)}</div>

        <div className="min-h-[60px] text-center">
          {getStatusContent(status, result, error)}
        </div>

        {id && id !== `error-${index}` && (
          <div className="text-xs text-muted-foreground font-mono truncate">
            ID: {id.slice(0, 8)}...
          </div>
        )}
      </div>
    </Card>
  );
}
