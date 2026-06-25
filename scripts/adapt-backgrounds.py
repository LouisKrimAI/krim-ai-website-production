#!/usr/bin/env python3
"""
Adapt the KrimOS layers background for full-widescreen, seamless use.

- Recolours the off-brand RAINBOW brain to an on-brand cyan->mint duotone
  (saturation-gated mask limited to the brain zone, so the cyan/amber beams are
  left alone).
- Bakes a 2400x1350 RGBA canvas with the stack centred and the bottom cut
  feathered to transparent, so the backdrop fills widescreen and its edges bleed
  seamlessly into the page's near-black canvas.

The original layers-clear.png is left untouched (rollback).
Output: public/images/krimos/layers-wide.png   (RGBA)
Pure Pillow, no numpy. Brain bbox verified against the source (x398-802, y90-214).
"""
from PIL import Image, ImageFilter, ImageDraw, ImageChops

ROOT = 'public/images/krimos'
LANCZOS = Image.Resampling.LANCZOS

ly = Image.open(f'{ROOT}/layers-clear.png').convert('RGBA')  # 1200x1615
rgb = ly.convert('RGB')
alpha = ly.getchannel('A')

# Duotone lookup: shadows deep cyan -> mids cyan #39D6FF -> highlights mint #00FFB2
def luts():
    dark, mid, light = (14, 85, 102), (57, 214, 255), (0, 255, 178)
    R, G, B = [], [], []
    for i in range(256):
        t = i / 255.0
        if t < 0.5:
            u = t / 0.5; c = [round(dark[k] + (mid[k] - dark[k]) * u) for k in range(3)]
        else:
            u = (t - 0.5) / 0.5; c = [round(mid[k] + (light[k] - mid[k]) * u) for k in range(3)]
        R.append(c[0]); G.append(c[1]); B.append(c[2])
    return R, G, B
LR, LG, LB = luts()

# Brain mask = a feathered ellipse over the brain's exact bbox (x398-802, y90-214),
# gated by alpha so ONLY the opaque brain recolours — including its low-saturation
# bright highlights (S~4-24), which a saturation threshold would miss and leave tinted.
em = Image.new('L', rgb.size, 0)
ImageDraw.Draw(em).ellipse([380, 65, 815, 220], fill=255)
em = em.filter(ImageFilter.GaussianBlur(28))
amask = alpha.point(lambda v: 255 if v > 20 else 0)
mask = ImageChops.multiply(em, amask).filter(ImageFilter.GaussianBlur(8))
lum = rgb.convert('L')
duo = Image.merge('RGB', (lum.point(LR), lum.point(LG), lum.point(LB)))
rgb = Image.composite(duo, rgb, mask)
recol = Image.merge('RGBA', (*rgb.split(), alpha))

# Widescreen bake: stack centred on a transparent canvas, bottom feathered to alpha.
# Held at 0.32 opacity as a faded cover, so a viewport-scale canvas is plenty — kept
# small to keep the asset light on the critical path.
LW, LH = 1800, 1013
sh = round(LH * 0.92)                       # 1242
sw = round(recol.width * sh / recol.height)  # 923
stack = recol.resize((sw, sh), LANCZOS)
canvas = Image.new('RGBA', (LW, LH), (0, 0, 0, 0))
ox, oy = (LW - sw) // 2, (LH - sh) // 2
canvas.paste(stack, (ox, oy), stack)
a = canvas.getchannel('A')
ramp = Image.new('L', (LW, LH), 255)
dr = ImageDraw.Draw(ramp)
base = oy + sh - 90
for y in range(base, LH):
    dr.line([(0, y), (LW, y)], fill=max(0, round(255 * (1 - (y - base) / (LH - base)))))
canvas.putalpha(ImageChops.multiply(a, ramp))
canvas.save(f'{ROOT}/layers-wide.png')
print('wrote layers-wide.png', canvas.size)
