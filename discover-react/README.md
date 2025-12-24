Discover - frontend-only Netflix clone feature

Setup

1. cd discover-react
2. npm install
3. npm run dev

Open http://localhost:5173/discover

What is implemented
- `src/pages/Discover.jsx`: Discover page layout and rows
- `src/components/MoodFilter.jsx`: mood buttons
- `src/components/CarouselRow.jsx`: horizontal carousel container
- `src/components/MovieCard.jsx`: cards with hover, Play button that records watch interaction
- `src/context/DiscoverContext.jsx`: Context with local dataset, scoring, and localStorage persistence
- `src/data/movies.json`: local JSON dataset (frontend-only)
- `src/components/Navbar.jsx`: navbar with Discover tab

Notes
- All discovery features are frontend-only and persist interactions in `localStorage` under key `discover_interactions`.
- Scoring logic is in `DiscoverContext.jsx` (simple additive score based on clicks/watch/search counts).
