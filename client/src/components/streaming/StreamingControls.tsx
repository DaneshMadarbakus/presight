import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Square, RotateCcw } from "lucide-react";

interface StreamingControlsProps {
  isStreaming: boolean;
  isComplete: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function StreamingControls({
  isStreaming,
  isComplete,
  onStart,
  onStop,
  onReset,
}: StreamingControlsProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onStart}
          disabled={isStreaming}
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Start Stream
        </Button>

        <Button
          onClick={onStop}
          disabled={!isStreaming}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Square className="h-4 w-4" />
          Stop Stream
        </Button>

        <Button
          onClick={onReset}
          disabled={isStreaming}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        {isStreaming &&
          "Stream is active - text will appear character by character"}
        {isComplete &&
          !isStreaming &&
          "Stream completed - full text is displayed below"}
        {!isStreaming &&
          !isComplete &&
          "Click 'Start Stream' to begin the character-by-character display"}
      </div>
    </Card>
  );
}
