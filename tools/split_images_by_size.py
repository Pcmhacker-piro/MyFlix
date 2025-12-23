#!/usr/bin/env python3
"""Split files from a source directory into numbered parts where each part's
total size does not exceed a specified max (MB). Supports dry-run and move.

Usage examples:
  python3 tools/split_images_by_size.py --source images --target images_split --max 25 --dry-run
  python3 tools/split_images_by_size.py --source images --target images_split --max 25 --move
"""
from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path
from typing import List, Tuple


def collect_files(src: Path) -> List[Path]:
    files: List[Path] = []
    for root, _, filenames in os.walk(src):
        for fn in sorted(filenames):
            p = Path(root) / fn
            if p.is_file():
                files.append(p)
    return files


def human_size(bytesize: int) -> str:
    for unit in ["B", "KB", "MB", "GB"]:
        if bytesize < 1024.0:
            return f"{bytesize:3.1f}{unit}"
        bytesize /= 1024.0
    return f"{bytesize:.1f}TB"


def plan_parts(files: List[Path], src: Path, max_mb: float) -> List[List[Path]]:
    max_bytes = int(max_mb * 1024 * 1024)
    parts: List[List[Path]] = []
    current: List[Path] = []
    current_size = 0

    for f in files:
        sz = f.stat().st_size
        if sz > max_bytes and not current:
            # single file larger than max: put it alone in its own part
            parts.append([f])
            continue

        if current_size + sz > max_bytes and current:
            parts.append(current)
            current = []
            current_size = 0

        current.append(f)
        current_size += sz

    if current:
        parts.append(current)

    return parts


def perform_copy(parts: List[List[Path]], src: Path, dst: Path, move: bool = False, dry_run: bool = False) -> None:
    dst.mkdir(parents=True, exist_ok=True)
    for idx, part in enumerate(parts, start=1):
        part_dir = dst / f"part_{idx:02d}"
        if not dry_run:
            part_dir.mkdir(parents=True, exist_ok=True)

        total = 0
        for f in part:
            rel = f.relative_to(src)
            target_path = part_dir / rel
            total += f.stat().st_size
            if dry_run:
                print(f"[DRY] -> {target_path}  ({human_size(f.stat().st_size)})")
            else:
                target_path.parent.mkdir(parents=True, exist_ok=True)
                if move:
                    shutil.move(str(f), str(target_path))
                else:
                    shutil.copy2(str(f), str(target_path))

        print(f"Part {idx:02d}: {len(part)} files, total {human_size(total)} -> {part_dir}")


def main() -> None:
    p = argparse.ArgumentParser(description="Split images/files into parts under given size")
    p.add_argument("--source", "-s", required=True, help="Source directory (relative or absolute)")
    p.add_argument("--target", "-t", required=True, help="Target directory to create part_* folders in")
    p.add_argument("--max", "-m", type=float, default=25.0, help="Max size per part in MB (default 25)")
    p.add_argument("--dry-run", action="store_true", help="Show planned grouping without copying/moving")
    p.add_argument("--move", action="store_true", help="Move files instead of copying")
    args = p.parse_args()

    src = Path(args.source)
    dst = Path(args.target)

    if not src.exists() or not src.is_dir():
        print(f"Source directory not found: {src}")
        raise SystemExit(1)

    files = collect_files(src)
    if not files:
        print("No files found in source directory.")
        raise SystemExit(0)

    parts = plan_parts(files, src, args.max)

    print(f"Planned {len(parts)} parts for {len(files)} files (max {args.max} MB per part)")
    for i, part in enumerate(parts, start=1):
        s = sum(f.stat().st_size for f in part)
        print(f" Part {i:02d}: {len(part)} files, total {human_size(s)}")

    if args.dry_run:
        print('\n--- Dry run details ---')
        perform_copy(parts, src, dst, move=args.move, dry_run=True)
        print('\nDry run complete. No files were copied or moved.')
    else:
        confirm = input("Proceed to copy/move files into parts? [y/N]: ")
        if confirm.lower() != "y":
            print("Aborted by user.")
            raise SystemExit(0)
        perform_copy(parts, src, dst, move=args.move, dry_run=False)
        print("Operation complete.")


if __name__ == "__main__":
    main()
