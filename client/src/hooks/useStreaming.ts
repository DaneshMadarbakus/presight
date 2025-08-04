import { useState, useCallback, useRef, useEffect } from "react";
import { streamingClient } from "@/api/streaming";

interface StreamingState {
  displayText: string;
  fullText: string;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
}

export function useStreaming() {
  const [state, setState] = useState<StreamingState>({
    displayText: "",
    fullText: "",
    isStreaming: false,
    isComplete: false,
    error: null,
  });

  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null
  );
  const decoderRef = useRef(new TextDecoder());
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (readerRef.current) {
        readerRef.current
          .cancel()
          .catch((err) =>
            console.error("Error cancelling stream on unmount:", err)
          );
      }
    };
  }, []);

  const startStreaming = useCallback(async () => {
    try {
      setState((prev) => ({
        ...prev,
        isStreaming: true,
        isComplete: false,
        displayText: "",
        fullText: "",
        error: null,
      }));

      const reader = await streamingClient();
      readerRef.current = reader;

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              isStreaming: false,
              isComplete: true,
              fullText: accumulatedText,
            }));
          }
          break;
        }

        try {
          const chunk = decoderRef.current.decode(value, { stream: true });
          accumulatedText += chunk;
        } catch (decodeError) {
          console.error("TextDecoder error:", decodeError);
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              isStreaming: false,
              error: "Failed to decode stream data",
            }));
          }
          break;
        }

        if (isMountedRef.current) {
          setState((prev) => ({
            ...prev,
            displayText: accumulatedText,
          }));
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState((prev) => ({
          ...prev,
          isStreaming: false,
          error: error instanceof Error ? error.message : "Streaming failed",
        }));
      }
    }
  }, []);

  const stopStreaming = useCallback(async () => {
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
        readerRef.current = null;
      } catch (error) {
        console.error("Error stopping stream:", error);
      }
    }

    if (isMountedRef.current) {
      setState((prev) => ({
        ...prev,
        isStreaming: false,
      }));
    }
  }, []);

  const resetStreaming = useCallback(async () => {
    await stopStreaming();
    if (isMountedRef.current) {
      setState({
        displayText: "",
        fullText: "",
        isStreaming: false,
        isComplete: false,
        error: null,
      });
    }
  }, [stopStreaming]);

  return {
    ...state,
    startStreaming,
    stopStreaming,
    resetStreaming,
  };
}
