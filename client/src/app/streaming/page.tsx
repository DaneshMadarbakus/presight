"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStreaming } from "@/hooks/useStreaming";
import { StreamingDisplay } from "@/components/streaming/StreamingDisplay";
import { StreamingControls } from "@/components/streaming/StreamingControls";

export default function StreamingPage() {
  const {
    displayText,
    fullText,
    isStreaming,
    isComplete,
    error,
    startStreaming,
    stopStreaming,
    resetStreaming,
  } = useStreaming();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              HTTP Streaming Demo
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              Character-by-character text streaming with real-time display
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>

        <div className="mb-6">
          <StreamingControls
            isStreaming={isStreaming}
            isComplete={isComplete}
            onStart={startStreaming}
            onStop={stopStreaming}
            onReset={resetStreaming}
          />
        </div>

        <StreamingDisplay
          displayText={displayText}
          fullText={fullText}
          isStreaming={isStreaming}
          isComplete={isComplete}
          error={error}
        />
      </div>
    </div>
  );
}
