import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface StreamingDisplayProps {
  displayText: string;
  fullText: string;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
}

export function StreamingDisplay({
  displayText,
  fullText,
  isStreaming,
  isComplete,
  error,
}: StreamingDisplayProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Stream</h3>
          <Badge
            variant={
              isStreaming ? "default" : isComplete ? "secondary" : "outline"
            }
            className={isStreaming ? "animate-pulse" : ""}
          >
            {isStreaming ? "Streaming..." : isComplete ? "Complete" : "Ready"}
          </Badge>
        </div>

        <ScrollArea className="h-64 w-full border rounded-md p-4 bg-gray-50">
          <div className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {error ? (
              <div className="text-red-600">Error: {error}</div>
            ) : (
              <>
                {displayText}
                {isStreaming && (
                  <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1" />
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <div className="mt-2 text-sm text-muted-foreground">
          Characters: {displayText.length}
          {isStreaming && " (streaming...)"}
        </div>
      </Card>

      {isComplete && (
        <>
          <Separator />
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Complete Response</h3>
              <Badge variant="outline">{fullText.length} characters</Badge>
            </div>

            <ScrollArea className="h-96 w-full border rounded-md p-4">
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {fullText}
              </div>
            </ScrollArea>
          </Card>
        </>
      )}
    </div>
  );
}
