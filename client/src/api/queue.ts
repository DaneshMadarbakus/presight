const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

interface QueueRequestData {
  timestamp: number;
}

interface QueueResponse {
  success: boolean;
  data: {
    status: string;
    requestId: string;
  };
  error?: {
    message: string;
  };
}

export async function makeQueueRequest(data: QueueRequestData = { timestamp: Date.now() }): Promise<string> {
  const response = await fetch(`${API_BASE}/api/queue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const responseData: QueueResponse = await response.json();
  
  if (responseData.success === false) {
    throw new Error(responseData.error?.message || 'Request failed');
  }

  return responseData.data.requestId;
}