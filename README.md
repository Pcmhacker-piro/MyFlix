<<<<<<< HEAD
# MyFlix
=======
# Netflix-Style Frontend — Discover & Player Enhancements

Author: Prakash Chand Meena

Overview
--------
This repository is a Netflix-style frontend (HTML/CSS/JS) with an integrated React-based Discover feature and an enhanced video player. All features are frontend-only and designed to run locally without any backend or paid APIs.
# MyFlix — Netflix-Style Frontend

Author: Prakash Chand Meena

Overview
--------
MyFlix is a Netflix-style frontend (HTML/CSS/JS) with a React Discover feature and an enhanced video player. It's frontend-only and runs locally without any backend or paid APIs.

Key Features
------------
- Discover React app in `discover-react/` with mood filters, carousels, and recommendation rows.
- Mood-Based Discovery (Chill, Action, Thriller, Emotional, Focus) using a local JSON dataset.
- Interaction tracking (clicks, watch duration, searches) persisted to `localStorage` for recommendation scoring.
- Video features: Skip Intro/Recap and an Idle Ringtone when paused/ended (after user interaction).
- UI polish: skeleton loaders, hover previews on cards, responsive design, Netflix-style theme.

Important files
---------------
- `discover-react/` — React app
  - `discover-react/src/main.jsx` — app entry
  - `discover-react/src/index.css` — global styles
  - `discover-react/src/context/DiscoverContext.jsx` — scoring & persistence
  - `discover-react/src/data/movies.json` — local dataset
  - `discover-react/src/pages/Discover.jsx` — discover page
  - `discover-react/src/components/*` — Navbar, MoodFilter, CarouselRow, MovieCard, Modal, VideoPlayer

Static assets
-------------
- Idle ringtone: `discover-react/public/assets/idle-tone.mp3` (also at `assets/idle-tone.mp3`)

How features work (brief)
------------------------
- Mood filtering: movies have a `moods` array; `Discover.jsx` filters by selected mood.
- Scoring: `DiscoverContext.scoreFor(movie)` combines rating and interaction scores (clicks, watch seconds, searches) stored under `discover_interactions` in `localStorage`.
- Skip Intro/Recap: timestamps in `movies.json`; `VideoPlayer.jsx` shows Skip buttons when `currentTime` is within those ranges.
- Idle Ringtone: `VideoPlayer.jsx` plays a low-volume looped ringtone on pause/ended (after user interaction) and mutes the video while the ringtone plays.

Run the Discover app (dev)
--------------------------
1. From the repo root:

```bash
cd discover-react
npm install
npm run dev
```

2. Open `http://localhost:5173/discover`.

Tools
-----
A small utility was added to help split large collections of static files into sized parts so they can be pushed to remotes that reject large files.

- `tools/split_images_by_size.py` — groups files from a source folder into numbered folders (`part_01`, `part_02`, ...) so each part's cumulative size does not exceed a provided maximum (default 25 MB). It supports a `--dry-run` mode and a `--move` flag.

Quick usage (from repo root):

```bash
python3 tools/split_images_by_size.py --source images --target images_split --max 25 --dry-run
python3 tools/split_images_by_size.py --source images --target images_split --max 25 --move
```

Notes on large files
--------------------
- Files larger than the chosen `--max` will be placed alone in their own part, but they will still exceed typical Git hosting limits (GitHub's limit is ~25 MB per file). For truly large media files consider:
  - compressing or re-encoding the files (e.g. with `ffmpeg`),
  - using `git lfs` for those files, or
  - hosting the media in a cloud bucket/CDN and keeping only references in the repo.

Repository / pushing
--------------------
- This repository already has a remote configured: https://github.com/Pcmhacker-piro/MyFlix.git
- To push a local branch with the README update, create a branch and push:

```bash
git switch -c update-readme-split-tool
git add README.md
git commit --only README.md -m "docs: document split_images_by_size tool and large-file guidance"
git push origin update-readme-split-tool
```

If you want these changes merged into `main` on the remote, open a PR from `update-readme-split-tool` on GitHub, or I can attempt to push directly to `main` if you confirm and have permissions.

Contact / Author
----------------
Author: Prakash Chand Meena
