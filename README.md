# Presight Frontend Exercise

## Setup

- Monorepo with client/server/shared structure
- Next.js + Express + TypeScript + Tailwind + shadcn

## Features to Build

1. Virtual scrolling user list with infinite scroll
2. Character-by-character HTTP streaming
3. WebWorker + WebSocket queue system

## Development Steps

- Setup workspace structure
- Create Next.js client
- Create Express server
- Define shared types in shared folder
- Implement Feature 1: Virtual scrolling
  - **Backend:**
    - Created paginated `/api/people` endpoint with `page`, `limit`, `search`, `hobbies`, and `nationality` support
    - Built `/api/filter-options` endpoint to return top 20 hobbies and nationalities
    - Added dummy data generator and shared typing via `shared` package
  - **Frontend:**
    - Integrated infinite data fetching with `useInfiniteQuery` from React Query
    - Implemented performant virtual scrolling using `@tanstack/react-virtual`
    - Displayed people as individual cards (1 per row) with infinite scroll
    - Applied background decorations to each card based on person data
    - Added hobby and nationality filters, synced with URL query params
    - Made filters mobile responsive using modal sidebar
    - Added debounced search box with real-time filtering
    - Used Suspense + loading skeletons for better UX
    - Memoized values from query string to reduce unnecessary fetches
- Implement Feature 2: Streaming
  - **Backend:**
  - Added GET /api/streaming/text endpoint to stream long text character by character
  - Implemented controller to generate text and stream each character using res.write in a timed loop (setTimeout)
  - Set required headers: Content-Type, Transfer-Encoding: chunked for proper streaming behavior
    - Added error handling and client disconnect detection
  - **Frontend:**
    - Built streaming API client using `fetch()` and `ReadableStreamDefaultReader`
    - Created `useStreaming` hook to manage stream state and character-by-character consumption
    - Implemented real-time text display with typewriter effect and blinking cursor
    - Added Start/Stop/Reset controls with proper stream cancellation
    - Built responsive UI with `ScrollArea` for large text display
    - Added character count tracking and streaming status indicators
    - Used modular component architecture with `StreamingDisplay` and `StreamingControls`
- Implement Feature 3: WebWorker/WebSocket
  - **Backend:**
    - Built in-memory queue service with functional approach (no classes per user preference)
    - Created worker service that processes requests in Node.js worker threads with 2-second delays
    - Implemented WebSocket service for real-time communication between server and clients
    - Added queue controller with endpoints for adding requests and checking status
    - Created JavaScript worker file for compatibility (workers can't execute TypeScript directly)
    - Added comprehensive error handling and graceful shutdown procedures
  - **Frontend:**
    - Built useWebSocket hook with reconnection logic and memory leak prevention
    - Created useQueue hook that manages 20 simultaneous requests with WebSocket updates
    - Implemented modular UI components (QueueStats, QueueItem) for clean code organization
    - Added real-time status updates: pending → processing → completed/error
    - Built responsive queue display with connection status and reset functionality
    - Added proper TypeScript interfaces and error boundary handling

## Future Improvements

- Error handling: A minimal structured error system is in place for backend responses (VALIDATION_ERROR, NOT_FOUND, etc.). For the sake of test scope, more advanced error types (UNAUTHORIZED, FORBIDDEN, RATE_LIMIT, etc.) were omitted. Future versions should extend this and introduce a consistent client-side handler.
- For the sake of the test controller functions use async/await to reflect real-world patterns where service functions are typically asynchronous (e.g. database calls). While current services are synchronous, this ensures compatibility with error-handling middleware and can be adapted later without structural changes.
- Implement a fetch wrapper for client and server fetches to centralize and standardise fetching and error handling
- To keep the scope tight, filter options are static. However, in a production app I’d consider dynamically updating and narrowing filters based on active selections to improve UX.
- I would pull all of the strings into a constants file on the front end.
- I interpreted the test saying "Display the list as individual cards using virtual scroll component..." as meaning that the list should render one card per row and utilise virtual scroll. In the future I would consider implementing multiple cards per row for better UI/UX.
- Stream improvement - Auto-scroll behavior - Smart scrolling to follow the streaming cursor
- Worker Pool - Replace per-request worker creation with reusable worker pool for better performance and resource management
- Testing Implementation - Currently lacks comprehensive test coverage. Future versions should implement:
  - Unit tests (Jest/Vitest) for queue service, worker service, WebSocket handlers, and React hooks
  - Component tests (React Testing Library) for user interactions and component behavior
  - Integration tests for API endpoints and WebSocket connection flows
  - End-to-end tests (Playwright/Cypress) for complete user workflows
  - Load tests for WebSocket performance and queue processing under concurrent usage
