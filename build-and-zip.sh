#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ZIP_NAME="nfx-reset.zip"

cd "$ROOT_DIR"

npm run build

rm -f "$ZIP_NAME"

python3 - <<'PY'
from pathlib import Path
import zipfile

root = Path.cwd()
zip_path = root / "nfx-reset.zip"
items = [root / "_locales", root / "dist", root / "icons", root / "manifest.json"]

with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for item in items:
        if not item.exists():
            raise SystemExit(f"Missing required path: {item.name}")
        if item.is_dir():
            for path in item.rglob("*"):
                if path.is_file() and path.name != ".DS_Store":
                    archive.write(path, path.relative_to(root).as_posix())
        else:
            archive.write(item, item.relative_to(root).as_posix())
PY

echo "Created $ZIP_NAME"

