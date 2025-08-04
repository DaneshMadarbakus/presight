const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function streamingClient(): Promise<
  ReadableStreamDefaultReader<Uint8Array>
> {
  const response = await fetch(`${API_BASE}/api/streaming/text`);

  if (!response.ok) {
    throw new Error(`Streaming request failed: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("No response body available for streaming");
  }

  return response.body.getReader();
}
