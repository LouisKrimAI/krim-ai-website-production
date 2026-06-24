KRIM — LOGO PACK
================
All artwork is vector-built and exported on transparent backgrounds.
SVG = master (infinitely scalable). PNG = high-resolution raster fallback.

CONTENTS
--------
01-icon/        Icon (broken triangle + circle) on its own
02-stacked/     Icon above the KRIM wordmark  (vertical lockup)
03-horizontal/  Icon to the left of the KRIM wordmark  (horizontal lockup)

Each lockup ships in three colourways:
  -mint   #00FFB2   PRIMARY. Use on dark / black backgrounds.
  -white  #FFFFFF   Reverse mono. Use on dark, busy, or photographic backgrounds.
  -black  #0A0A0C   Use on light / white backgrounds.

  ("Dark-background option" = mint or white.  "Light-background option" = black.)

BRAND COLOURS
-------------
  Mint    #00FFB2   (Pantone 802 C for print)
  Black   #0A0A0C

ICON GEOMETRY SPEC (locked — all future logos inherit this)
-----------------------------------------------------------
  Inverted "broken" triangle, symmetric. Width : Height = 1.20 : 1.
  Inner circle: solid, centred horizontally, radius = 10.4% of triangle width,
    centre sitting 36% down from the triangle's top edge.
  Stroke: uniform, ~1.7% of triangle width (slightly heavier than the original draft).
  Three breaks: a centred gap in the top edge, and one shared horizontal band
    that cuts both side edges. All three corners are true, sharp points.

CLEAR SPACE & MINIMUM SIZE
--------------------------
  Keep clear space around the logo equal to the height of the inner circle.
  Minimum legible size: icon 24 px tall; full lockups 120 px wide.
  Prefer the SVG at any size. Never stretch, recolour outside the three
  approved inks, add effects, or fill the triangle interior.

FILE SIZES
----------
  icon  PNG: 512 / 1024 / 2048 px wide
  stacked  PNG: 1200 / 2400 px wide
  horizontal  PNG: 1600 / 3200 px wide

ANIMATED MARK (05-animated/)
----------------------------
The broken triangle comes alive: a coloured dot emerges from each of the three
gaps, glides in toward the central core, then back out — staggered, looping.
Reads as claims flowing into the validating core ("compliance as physics").

  Dot positions / colours:
    Top gap          GREEN   dark #2BE84F   light #138A43
    Left (bottom-L)  RED     dark #FF453A   light #D32018
    Right (bottom-R) BLUE    dark #0A84FF   light #0A5FCF

  Loop length ~2.54s (continuous).

  Files (each animates on its own — self-contained SVG, CSS-driven):
    KRIM-icon-animated-dark.svg / -light.svg
    KRIM-stacked-animated-dark.svg / -light.svg
    KRIM-horizontal-animated-dark.svg / -light.svg
    KRIM-animated-demo.html   (open in a browser to preview all six live)

  Usage: drop in as <img src="KRIM-icon-animated-dark.svg"> or paste the SVG
  inline. GPU-only (transform/opacity); resolves to the clean static mark under
  prefers-reduced-motion. "-dark" = mint outline for dark backgrounds;
  "-light" = black outline for light backgrounds.
