"""
Krim_Intro.pdf — V6
5-page executive deck. Dark canvas, mint accent.
MoE-synthesised copy + layout.
"""

import os
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen.canvas import Canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H = 1280, 720
M = 80

_TTFS = {
    'SR':  '/System/Library/Fonts/Supplemental/Times New Roman.ttf',
    'SRI': '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf',
    'SA':  '/System/Library/Fonts/Supplemental/Arial.ttf',
    'SAB': '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
}
for name, path in _TTFS.items():
    if os.path.exists(path):
        pdfmetrics.registerFont(TTFont(name, path))

SR = 'SR'; SRI = 'SRI'; SA = 'SA'; SAB = 'SAB'

BG   = HexColor('#09090C')
INK  = HexColor('#F6F6F4')
INK2 = HexColor('#B7BBC4')
INK3 = HexColor('#7A7E87')
MINT = HexColor('#00FFB2')


# ── primitives ─────────────────────────────────────────────────────────────────

def bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def eyebrow(c, text, x, y):
    c.setFillColor(MINT)
    c.setFont(SAB, 9)
    c.drawString(x, y, text.upper())

def folio(c, n):
    c.setFillColor(INK3)
    c.setFont(SA, 10)
    c.drawString(M, 28, 'Krim  ·  Confidential')
    c.drawRightString(W - M, 28, f'{n} / 5')

def h_rule(c, x, y, w, alpha=0.09):
    c.setStrokeColor(Color(1, 1, 1, alpha=alpha))
    c.setLineWidth(0.75)
    c.line(x, y, x + w, y)

def v_rule(c, x, y1, y2, alpha=0.09):
    c.setStrokeColor(Color(1, 1, 1, alpha=alpha))
    c.setLineWidth(0.75)
    c.line(x, y1, x, y2)

def wrap(c, text, x, y, font, size, max_w, leading=None):
    """Word-wrap and draw. Returns y below the last baseline."""
    if leading is None:
        leading = size * 1.5
    c.setFont(font, size)
    words = text.split()
    line = ''
    cy = y
    for word in words:
        test = (line + ' ' + word).strip()
        if c.stringWidth(test, font, size) <= max_w:
            line = test
        else:
            if line:
                c.drawString(x, cy, line)
                cy -= leading
            line = word
    if line:
        c.drawString(x, cy, line)
        cy -= leading
    return cy


# ── Page 1 — Cover ─────────────────────────────────────────────────────────────

def p1_cover(c):
    bg(c)

    # Full-width mint rule at very top
    c.setFillColor(MINT)
    c.rect(0, H - 2, W, 2, fill=1, stroke=0)

    # Wordmark
    c.setFillColor(INK)
    c.setFont(SR, 80)
    c.drawString(M, 308, 'Krim')

    # Tagline
    c.setFillColor(INK2)
    c.setFont(SR, 22)
    c.drawString(M, 250, 'The OS for safe agentic banking')

    # 1pt mint hairline left of descriptor
    c.setFillColor(MINT)
    c.rect(M, 176, 1, 60, fill=1, stroke=0)

    # Descriptor — three beats
    c.setFillColor(INK2)
    c.setFont(SA, 11)
    wrap(c,
         'Every AI action validated before it runs. '
         'An autonomous workforce across the full credit lifecycle. '
         'An institutional record that compounds.',
         M + 12, 224, SA, 11, 860, leading=18)

    # Footer
    h_rule(c, M, 52, W - 2 * M, alpha=0.1)
    c.setFillColor(INK3)
    c.setFont(SA, 9)
    c.drawString(M, 36, 'Confidential · 2026')
    c.drawRightString(W - M, 36, 'krim.ai')

    c.showPage()


# ── Page 2 — Four Problems ─────────────────────────────────────────────────────

_PROBLEMS = [
    ('01',
     "Lending operations weren't built to scale",
     "The same workflows that processed a thousand loans now handle ten thousand "
     "with more headcount, not more leverage. There is no force multiplier because "
     "the operation itself has never changed shape."),
    ('02',
     "In credit, a hallucination is a compliance event",
     "General-purpose AI produces confident output without guaranteed accuracy. "
     "A misquoted rate, an incorrect balance, a fabricated disclosure: each is a liability. "
     "The regulator's test is not whether the output was plausible. It is whether it was defensible."),
    ('03',
     "The decision was made. The reasoning is gone.",
     "Regulators require that adverse decisions be explained with specificity. "
     "Any AI that cannot show its reasoning, step by step, "
     "is effectively unusable in regulated credit."),
    ('04',
     "Every team runs on different data. The operation learns nothing.",
     "Origination, servicing, collections, and compliance each operate in separate systems. "
     "Decisions made in one function are invisible to the next. "
     "The institution accumulates data. It does not accumulate intelligence."),
]

def p2_problems(c):
    bg(c)

    TOP = H - M  # 640

    eyebrow(c, 'The Problem', M, TOP - 4)
    c.setFillColor(INK)
    c.setFont(SR, 26)
    c.drawString(M, TOP - 44, 'Four reasons banking AI stalls at the pilot stage')
    h_rule(c, M, TOP - 68, W - 2 * M)

    GTOP = TOP - 80
    GBOT = 52
    ROW_H = (GTOP - GBOT) / 2
    COL_W = (W - 2 * M) / 2
    DIVX  = M + COL_W
    MIDY  = GBOT + ROW_H

    v_rule(c, DIVX, GBOT, GTOP)
    h_rule(c, M, MIDY, W - 2 * M)

    cells = [
        (M,    MIDY, 0),   # top-left
        (DIVX, MIDY, 1),   # top-right
        (M,    GBOT, 2),   # bottom-left
        (DIVX, GBOT, 3),   # bottom-right
    ]

    PAD = 26
    CW  = COL_W - PAD * 2 - 6

    for cx, cy, idx in cells:
        num, title, body = _PROBLEMS[idx]

        # Ghost ordinal — large, dim mint
        c.setFillColor(Color(0, 1, 0.698, alpha=0.14))
        c.setFont(SR, 36)
        c.drawString(cx + PAD, cy + ROW_H - 46, num)

        # Headline
        c.setFillColor(INK)
        hy = cy + ROW_H - 78
        hy = wrap(c, title, cx + PAD, hy, SR, 15, CW, leading=21)

        # Body
        c.setFillColor(INK2)
        wrap(c, body, cx + PAD, hy - 4, SA, 10.5, CW, leading=15.5)

    folio(c, 2)
    c.showPage()


# ── Page 3 — Solution ──────────────────────────────────────────────────────────

def p3_solution(c):
    bg(c)

    TOP   = H - M
    BANDY = 490   # header / columns divide

    # Header
    eyebrow(c, 'The Solution', M, TOP - 4)
    c.setFillColor(INK)
    c.setFont(SR, 30)
    c.drawString(M, TOP - 46, 'One operating system.')
    c.drawString(M, TOP - 82, 'Every part of the credit lifecycle.')
    c.setFillColor(INK2)
    c.setFont(SA, 11)
    c.drawString(M, TOP - 118,
                 'Not a workflow tool. Not a chatbot layer. The OS the operation runs on.')

    # Mint boundary rule
    c.setStrokeColor(Color(0, 1, 0.698, alpha=0.28))
    c.setLineWidth(0.75)
    c.line(M, BANDY, W - M, BANDY)

    GAP    = 22
    CW     = (W - 2 * M - 2 * GAP) / 3
    CTOP   = BANDY - 18
    CBOT   = 52

    CX = [M, M + CW + GAP, M + 2 * (CW + GAP)]

    v_rule(c, CX[1] - GAP / 2, CBOT, CTOP)
    v_rule(c, CX[2] - GAP / 2, CBOT, CTOP)

    _COLS = [
        {
            'label': 'VALIDATE', 'sub': 'Krim-Nyāya',
            'hl': 'Every action validated before it executes.',
            'body': ("A 33-point pipeline runs before every action fires. "
                     "Regulatory, policy, and operational checks in sequence. "
                     "Rejected actions go to an exception queue with the blocking rule attached."),
            'items': None,
        },
        {
            'label': 'ACT', 'sub': 'Karta Co-Workers',
            'hl': 'Autonomous co-workers across the full lifecycle.',
            'body': None,
            'items': [
                'Origination — KYC, document processing, qualification',
                'Credit analysis — policy checks, structured analysis',
                'Portfolio monitoring — early-warning, account surveillance',
                'Collections — governed outbound, payment negotiation',
                'Compliance — reporting, audit pack generation',
            ],
        },
        {
            'label': 'COMPOUND', 'sub': 'Kira + Krimkar',
            'hl': 'An institutional record that compounds.',
            'body': ("Every action logged to an immutable record. "
                     "Audit trails complete by construction. "
                     "Intelligence stays inside the institution's perimeter "
                     "and grows with every decision."),
            'items': None,
        },
    ]

    for i, col in enumerate(_COLS):
        cx = CX[i]
        cw = CW - 6
        cy = CTOP

        eyebrow(c, col['label'], cx, cy)
        cy -= 20

        c.setFillColor(INK3)
        c.setFont(SRI, 11)
        c.drawString(cx, cy, col['sub'])
        cy -= 28

        c.setFillColor(INK)
        cy = wrap(c, col['hl'], cx, cy, SR, 14, cw, leading=20)
        cy -= 10

        if col['body']:
            c.setFillColor(INK2)
            wrap(c, col['body'], cx, cy, SA, 10.5, cw, leading=16)
        else:
            for item in col['items']:
                c.setFillColor(MINT)
                c.setFont(SAB, 9)
                c.drawString(cx, cy, '—')
                c.setFillColor(INK2)
                cy = wrap(c, item, cx + 14, cy, SA, 10, cw - 14, leading=15)
                cy -= 4

    folio(c, 3)
    c.showPage()


# ── Page 4 — Why Krim ──────────────────────────────────────────────────────────

_DIFFS = [
    ('01 — VALIDATION',
     'Pre-execution, not post-hoc',
     ("KrimOS validates before the action fires. Policy, regulatory, and operational "
      "constraints are encoded in the validation layer. "
      "A compliance violation is not reduced. It is made structurally impossible.")),
    ('02 — COVERAGE',
     'End-to-end, from origination to collections',
     ("One runtime, one audit trail, one governance model across the full credit lifecycle. "
      "Not separate tools for each function with separate compliance reviews for each vendor.")),
    ('03 — SOVEREIGNTY',
     'Sovereign by construction',
     ("Customer data, model weights, and telemetry remain inside the institution's infrastructure. "
      "There is no mode that requires data to leave. "
      "Sovereignty is a structural guarantee, not a contractual one.")),
    ('04 — INTELLIGENCE',
     'The institutional record compounds',
     ("Every decision feeds back into the institution's intelligence. "
      "The system learns from the institution's own outcomes under its own governance. "
      "It cannot be replicated externally.")),
]

def p4_why(c):
    bg(c)

    # Signature: mint vertical bar, left edge
    c.setFillColor(MINT)
    c.rect(0, 0, 3, H, fill=1, stroke=0)

    TOP = H - M

    eyebrow(c, 'Why Krim', M, TOP - 4)
    c.setFillColor(INK)
    c.setFont(SR, 26)
    c.drawString(M, TOP - 44, "Four things that don't exist elsewhere in this category")
    h_rule(c, M, TOP - 66, W - 2 * M)

    GTOP  = TOP - 78
    GBOT  = 52
    ROW_H = (GTOP - GBOT) / 2
    COL_W = (W - 2 * M) / 2
    DIVX  = M + COL_W
    MIDY  = GBOT + ROW_H

    v_rule(c, DIVX, GBOT, GTOP)
    h_rule(c, M, MIDY, W - 2 * M)

    cells = [
        (M,    MIDY, 0),
        (DIVX, MIDY, 1),
        (M,    GBOT, 2),
        (DIVX, GBOT, 3),
    ]

    PAD = 26
    CW  = COL_W - PAD * 2 - 6

    for cx, cy, idx in cells:
        tag, title, body = _DIFFS[idx]

        c.setFillColor(MINT)
        c.setFont(SAB, 8)
        c.drawString(cx + PAD, cy + ROW_H - 24, tag)

        c.setFillColor(INK)
        hy = cy + ROW_H - 50
        hy = wrap(c, title, cx + PAD, hy, SR, 16, CW, leading=22)

        c.setFillColor(INK2)
        wrap(c, body, cx + PAD, hy - 6, SA, 10.5, CW, leading=16)

    folio(c, 4)
    c.showPage()


# ── Page 5 — Outcomes ──────────────────────────────────────────────────────────

_OUTCOMES = [
    ("More volume. The same team.",
     ("The structured work in origination, analysis, and compliance runs autonomously. "
      "Analysts work from complete, validated files. "
      "The operation scales with the book without a proportional headcount response.")),
    ("Risk visible when it is still actionable.",
     ("Continuous portfolio monitoring means early-warning patterns surface as patterns, "
      "not as losses. Collections works from live risk signals, "
      "not a queue worked in arrival order.")),
    ("An edge that compounds and cannot be bought.",
     ("Every validated action enriches the institutional record. The system improves with use. "
      "This record is built from the institution's own decisions under its own governance. "
      "Competitors cannot replicate it.")),
]

def p5_outcomes(c):
    bg(c)

    CTA_H = 96

    # CTA strip — the only filled surface in the deck
    c.setFillColor(Color(0, 1, 0.698, alpha=0.07))
    c.rect(0, 0, W, CTA_H, fill=1, stroke=0)
    c.setStrokeColor(Color(0, 1, 0.698, alpha=0.22))
    c.setLineWidth(0.75)
    c.line(0, CTA_H, W, CTA_H)

    # CTA — left
    c.setFillColor(INK)
    c.setFont(SR, 17)
    c.drawString(M, CTA_H - 30, 'See KrimOS working in your workflow.')
    c.setFillColor(INK2)
    c.setFont(SA, 11)
    c.drawString(M, CTA_H - 50, 'Book a demo at krim.ai/contact')

    # CTA — right
    c.setFillColor(MINT)
    c.setFont(SAB, 10)
    c.drawRightString(W - M, CTA_H - 28, 'BOOK A DEMO')
    c.setFillColor(INK3)
    c.setFont(SA, 10)
    c.drawRightString(W - M, CTA_H - 48, 'krim.ai/contact')

    TOP = H - M
    eyebrow(c, 'What This Delivers', M, TOP - 4)
    c.setFillColor(INK)
    c.setFont(SR, 26)
    c.drawString(M, TOP - 44, 'Three outcomes a CRO or CLO can take to the board')

    CTOP = TOP - 74
    CBOT = CTA_H + 14
    GAP  = 24
    CW   = (W - 2 * M - 2 * GAP) / 3

    for i, (title, body) in enumerate(_OUTCOMES):
        cx = M + i * (CW + GAP)

        if i > 0:
            v_rule(c, cx - GAP / 2, CBOT, CTOP)

        c.setFillColor(MINT)
        c.setFont(SAB, 9)
        c.drawString(cx, CTOP, f'0{i + 1}')

        c.setFillColor(INK)
        ty = CTOP - 20
        ty = wrap(c, title, cx, ty, SR, 15, CW, leading=21)

        # Short mint rule beneath title
        c.setStrokeColor(MINT)
        c.setLineWidth(1.5)
        c.line(cx, ty - 2, cx + 40, ty - 2)

        c.setFillColor(INK2)
        wrap(c, body, cx, ty - 18, SA, 10.5, CW, leading=16)

    folio(c, 5)
    c.showPage()


# ── Build ──────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    out = 'public/decks/Krim_Intro.pdf'
    os.makedirs(os.path.dirname(out), exist_ok=True)
    c = Canvas(out, pagesize=(W, H))
    c.setTitle('Krim')
    c.setAuthor('Krim')
    p1_cover(c)
    p2_problems(c)
    p3_solution(c)
    p4_why(c)
    p5_outcomes(c)
    c.save()
    size = os.path.getsize(out)
    print(f'Built {out} ({size:,} bytes, 5 pages)')
