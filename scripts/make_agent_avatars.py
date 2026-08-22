#!/usr/bin/env python3
"""Slice the two 6x6 agent headshot sheets into square avatar crops.

Input:  Agent_icons.png, agent_icon2.png (repo root, 1254x1254, 6x6 grids)
Output: public/images/agents/{a,b}{row}{col}.webp  (192x192, q85)

Crop is inset from each cell (trims grid gutters) and biased slightly upward
so the head sits centered when the avatar is rendered as a circle
(CSS rounded-full — no alpha masking needed).
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "agents"
SHEETS = {"a": ROOT / "Agent_icons.png", "b": ROOT / "agent_icon2.png"}

GRID = 6
INSET_SIDE = 8   # trim the white gutters
INSET_TOP = 12   # clear the gutter + the row above; heads still keep headroom
INSET_BOTTOM = 16
SIZE = 192       # rendered at <=96px, so 2x for retina

def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for prefix, path in SHEETS.items():
        im = Image.open(path).convert("RGB")
        cw, ch = im.width / GRID, im.height / GRID
        for row in range(GRID):
            for col in range(GRID):
                x0, y0 = col * cw, row * ch
                box = (
                    round(x0 + INSET_SIDE),
                    round(y0 + INSET_TOP),
                    round(x0 + cw - INSET_SIDE),
                    round(y0 + ch - INSET_BOTTOM),
                )
                crop = im.crop(box)
                side = min(crop.size)
                crop = crop.crop((0, 0, side, side)).resize((SIZE, SIZE), Image.LANCZOS)
                name = f"{prefix}{row + 1}{col + 1}.webp"
                crop.save(OUT / name, "WEBP", quality=85)
                total += 1
    print(f"wrote {total} avatars -> {OUT}")

if __name__ == "__main__":
    main()
