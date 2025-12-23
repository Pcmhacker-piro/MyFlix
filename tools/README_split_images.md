Split Images Utility
=====================

This small script groups files from a source directory into numbered
folders (`part_01`, `part_02`, ...) so each folder's cumulative size does not
exceed a specified maximum (default 25 MB). Useful to break up large image
collections before pushing to a remote that rejects large pushes.

Quick examples (run from workspace root):

```bash
python3 tools/split_images_by_size.py --source images --target images_split --max 25 --dry-run
python3 tools/split_images_by_size.py --source images --target images_split --max 25 --move
```

Options:
- `--dry-run`: print planned grouping without copying/moving
- `--move`: move files instead of copying
- `--max`: maximum size per part in megabytes (default 25)

The script preserves relative paths inside each `part_XX` folder.
