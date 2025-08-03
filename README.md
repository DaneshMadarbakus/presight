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
- Implement Feature 3: WebWorker/WebSocket

## Future Improvement

- To keep the scope tight, filter options are static. However, in a production app I’d consider dynamically updating and narrowing filters based on active selections to improve UX.
- I would pull all of the strings into a constants file on the front end.
- I interpreted the test saying "Display the list as individual cards using virtual scroll component..." as meaning that the list should render one card per row and utilise virtual scroll. In the future I would consider implementing multiple cards per row for better UI/UX.
