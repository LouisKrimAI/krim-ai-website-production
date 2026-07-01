"""
Krim_Intro.pdf -- V7
5-page executive deck. Rebuilt: proper type scale, distinct layout per page.
MoE design synthesis: full canvas, no dead space, one mint use per page.
"""
import os
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen.canvas import Canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H = 1280, 720

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
BG     = HexColor('#09090C')
INK    = HexColor('#F6F6F4')
INK2   = HexColor('#B7BBC4')
INK3   = HexColor('#7A7E87')
MINT   = HexColor('#00FFB2')
DARK   = HexColor('#04130D')
MIDGRN = HexColor('#0D3D28')

DIMLINE   = Color(1, 1, 1, alpha=0.12)
MINTGHOST = Color(0, 1, 0.698, alpha=0.055)


# ── primitives ────────────────────────────────────────────────────────────────

def bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def page_label(c, text, x=80, y=697):
    c.setFillColor(INK3)
    c.setFont(SAB, 9)
    c.drawString(x, y, text)

def hr(c, x1, y, x2, color=None, lw=0.8):
    c.setStrokeColor(color or DIMLINE)
    c.setLineWidth(lw)
    c.line(x1, y, x2, y)

def vr(c, x, y1, y2, color=None, lw=0.8):
    c.setStrokeColor(color or DIMLINE)
    c.setLineWidth(lw)
    c.line(x, y1, x, y2)

def t(c, x, y, text, font, size, color, align='left'):
    c.setFont(font, size)
    c.setFillColor(color)
    if align == 'right':
        c.drawRightString(x, y, text)
    elif align == 'center':
        c.drawCentredString(x, y, text)
    else:
        c.drawString(x, y, text)

def wrap(c, text, x, y, font, size, max_w, color, leading=None):
    if leading is None:
        leading = size * 1.5
    c.setFont(font, size)
    c.setFillColor(color)
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


# ===========================================================================
# P1 -- COVER
# Mint spine left / ghost "K" lower-right / wordmark upper / tagline center
# ===========================================================================

def p1_cover(c):
    bg(c)

    # Ghost "K" -- 280pt dim mint fills lower-right, drawn first (behind all)
    c.setFont(SR, 280)
    c.setFillColor(Color(0, 1, 0.698, alpha=0.058))
    c.drawString(600, -28, 'K')

    # Mint spine (4pt, full height)
    c.setFillColor(MINT)
    c.rect(76, 0, 4, H, fill=1, stroke=0)

    # Concentric arcs -- subtle radar texture, right side
    k = 0.5523
    for r in [150, 250, 360, 470]:
        c.setStrokeColor(Color(1, 1, 1, alpha=0.09))
        c.setLineWidth(0.8)
        c.bezier(1280, 360 + r,  1280 - r*k, 360 + r,  1280 - r, 360 + r*k,  1280 - r, 360)
        c.bezier(1280 - r, 360,  1280 - r, 360 - r*k,  1280 - r*k, 360 - r,  1280, 360 - r)

    LX = 108

    # Wordmark -- 140pt, upper area; ghost K sits below creating visual balance
    t(c, LX, 488, 'Krim', SR, 140, INK)

    # Three descriptor lines below wordmark
    descs = [
        'Every AI action validated before it runs.',
        'An autonomous workforce across the full credit lifecycle.',
        'A record that learns and stays inside your walls.',
    ]
    for i, d in enumerate(descs):
        t(c, LX, 360 - i * 27, d, SA, 13, INK2)

    # Thin mint accent rule
    hr(c, LX, 285, LX + 200, MINT, 1.0)

    # Tagline
    t(c, LX, 262, 'The operating system for regulated banking.', SR, 20, INK)

    # Footer
    t(c, LX, 28, 'Confidential  2026', SA, 9, INK3)
    t(c, W - 80, 28, 'krim.ai', SA, 9, INK3, align='right')

    c.showPage()


# ===========================================================================
# P2 -- PROBLEMS
# Full-bleed 2x2 grid / no section headline / content centred in each cell
# ===========================================================================

_PROBLEMS = [
    ('01', "Volume scaled.\nThe operation didn't.",
     "The same workflows that processed a thousand loans now process ten thousand"
     "--with more headcount carrying the difference. The operation grew bigger. It did not grow smarter."),
    ('02', "In credit, a confident error\nis a regulatory event.",
     "A misquoted rate. An incorrect balance. A fabricated disclosure. "
     "General-purpose AI produces plausible output. Regulators require defensible output. "
     "That gap is the liability."),
    ('03', "The decision exists.\nThe reasoning doesn't.",
     "Adverse action requires specific explanation, traceable step by step. "
     "AI that cannot show its work is compliance-ineligible."),
    ('04', "The institution accumulates data.\nIt accumulates nothing else.",
     "Origination, servicing, collections, and compliance each run on separate systems. "
     "A decision made in one function is invisible to the next. "
     "The institution grows. Its intelligence does not."),
]

def p2_problems(c):
    bg(c)

    page_label(c, 'THE PROBLEM', 40, 697)

    CROSS_X, CROSS_Y = 640, 360
    vr(c, CROSS_X, 38, 678)
    hr(c, 38, CROSS_Y, 1242)

    PAD = 28
    # (cell_left, cell_right, cell_bot, cell_top, idx)
    CELLS = [
        (38,  632,  360, 678, 0),
        (648, 1242, 360, 678, 1),
        (38,  632,  38,  355, 2),
        (648, 1242, 38,  355, 3),
    ]

    for cl, cr, cbot, ctop, idx in CELLS:
        num, headline, body = _PROBLEMS[idx]
        cx  = cl + PAD
        cw  = cr - cl - PAD * 2

        # Ghost ordinal -- large, drawn first so content is on top
        c.setFont(SR, 96)
        c.setFillColor(MINTGHOST)
        c.drawRightString(cr - PAD, ctop - 118, num)

        # Vertically centre content block in the cell
        # Block height: label + gap + headline 2 lines + gap + body 2-3 lines
        BLOCK_H = 148  # estimated
        cell_h  = ctop - cbot
        start_y = ctop - (cell_h - BLOCK_H) // 2

        # Mint number label
        t(c, cx, start_y, num, SAB, 10, MINT)

        # Headline (pre-split)
        hl_lines = headline.split('\n')
        hy = start_y - 24
        for i, hl in enumerate(hl_lines):
            t(c, cx, hy - i * 28, hl, SR, 22, INK)

        # Body
        body_y = hy - len(hl_lines) * 28 - 16
        wrap(c, body, cx, body_y, SA, 12, cw, INK2, leading=18)

    c.showPage()


# ===========================================================================
# P3 -- SOLUTION
# Three horizontal tiers: VALIDATE (top) / ACT (mid) / COMPOUND (bottom)
# ===========================================================================

def p3_solution(c):
    bg(c)

    V_BOT = 550   # VALIDATE band: y=550-720 (170pt)
    C_TOP = 210   # COMPOUND band: y=0-210 (210pt); ACT: y=210-547 (337pt)

    # Slightly lighter fill for ACT band
    c.setFillColor(Color(0.055, 0.055, 0.07, alpha=1.0))
    c.rect(0, C_TOP, W, V_BOT - C_TOP, fill=1, stroke=0)

    hr(c, 0, V_BOT, W, DIMLINE, 1.0)
    hr(c, 0, C_TOP, W, DIMLINE, 1.0)

    ML, MR = 80, 1200

    # VALIDATE
    t(c, ML, 695, 'VALIDATE', SAB, 10, MINT)
    t(c, ML, 669, 'Every output checked before it acts.', SRI, 18, INK)
    t(c, ML, 644, '33-point pipeline    Regulatory    Policy    Operational', SA, 11, INK3)

    # ACT -- label + descriptor sit just above the boxes
    t(c, ML, 445, 'ACT', SAB, 11, INK)
    t(c, ML, 421, 'Five autonomous co-workers. Origination to compliance.', SRI, 17, INK)

    # Flow diagram -- 5 workflow boxes, taller and better centred in ACT band
    BOX_W, BOX_H, BOX_GAP = 200, 130, 16
    N = 5
    TOTAL_W = N * BOX_W + (N - 1) * BOX_GAP
    BOX_X0  = ML + ((MR - ML) - TOTAL_W) // 2
    BOX_YB  = 240
    BOX_YT  = BOX_YB + BOX_H

    WORKFLOWS = [
        ('Origination',          'KYC  docs  qualification'),
        ('Credit Analysis',      'Policy  pricing  risk'),
        ('Portfolio\nMonitoring','Early-warning signals'),
        ('Collections',          'Governed outreach'),
        ('Compliance',           'Audit  reporting'),
    ]

    for i, (label, sub) in enumerate(WORKFLOWS):
        bx = BOX_X0 + i * (BOX_W + BOX_GAP)

        c.setFillColor(Color(0, 0, 0, alpha=0.25))
        c.setStrokeColor(Color(1, 1, 1, alpha=0.15))
        c.setLineWidth(0.8)
        c.rect(bx, BOX_YB, BOX_W, BOX_H, stroke=1, fill=1)

        # Mint top accent
        c.setStrokeColor(Color(0, 1, 0.698, alpha=0.55))
        c.setLineWidth(1.5)
        c.line(bx, BOX_YT, bx + BOX_W, BOX_YT)

        # Label (centred, may be multi-line)
        llines = label.split('\n')
        ly = BOX_YT - 22
        for li, ll in enumerate(llines):
            c.setFont(SAB, 11)
            c.setFillColor(INK)
            lw = c.stringWidth(ll, SAB, 11)
            c.drawString(bx + (BOX_W - lw) / 2, ly - li * 14, ll)

        # Sub-label (centred)
        c.setFont(SA, 9.5)
        c.setFillColor(INK3)
        sw = c.stringWidth(sub, SA, 9.5)
        c.drawString(bx + (BOX_W - sw) / 2, BOX_YB + 14, sub)

        # Connector to next box
        if i < N - 1:
            ay = BOX_YB + BOX_H // 2
            c.setStrokeColor(Color(1, 1, 1, alpha=0.20))
            c.setLineWidth(0.8)
            c.line(bx + BOX_W, ay, bx + BOX_W + BOX_GAP, ay)

    # COMPOUND
    t(c, ML, 195, 'COMPOUND', SAB, 10, INK3)
    t(c, ML, 171, 'Every decision recorded. Intelligence stays inside your walls.', SRI, 17, INK)
    t(c, ML, 147, 'Immutable audit trail    Sovereign by construction    Compounds with every cycle', SA, 11, INK3)

    c.showPage()


# ===========================================================================
# P4 -- WHY KRIM
# Four full-width rows / mint top rule per row (signature element)
# Completely distinct from the 2x2 grid on P2
# ===========================================================================

_DIFFS = [
    ('01', 'VALIDATION',
     'The check runs before the action.',
     'Every Karta workflow runs through the 33-point validation engine before any output reaches '
     'a borrower, a regulator, or a system of record. The risk is contained before it exists.'),
    ('02', 'COVERAGE',
     'One runtime, one audit trail, one governance model.',
     'Origination to collections -- the same system, the same record. No handoff between tools. '
     'No gap between what happened and what was logged.'),
    ('03', 'SOVEREIGNTY',
     'Customer data never leaves.',
     "Model weights, transaction data, and telemetry stay inside the institution's infrastructure. "
     "A structural guarantee, not a contractual one."),
    ('04', 'INTELLIGENCE',
     'The record compounds inside your walls.',
     "Every decision feeds back under the institution's own governance. "
     "That learning cannot be extracted, replicated, or acquired by a competitor."),
]

def p4_why(c):
    bg(c)

    page_label(c, 'WHY KRIM', 80, 697)

    ML, MR = 80, 1200
    CW = MR - ML

    # Four rows anchored by full-width mint rules
    ROW_TOPS = [668, 508, 348, 188]

    for i, (num, label, headline, body) in enumerate(_DIFFS):
        rt = ROW_TOPS[i]

        # Mint top rule -- signature element of this page
        hr(c, ML, rt, MR, MINT, 1.5)

        t(c, ML,      rt - 18, num,   SAB, 9, INK3)
        t(c, ML + 24, rt - 18, label, SAB, 9, MINT)
        t(c, ML,      rt - 45, headline, SR, 22, INK)
        wrap(c, body, ML, rt - 80, SA, 12, CW, INK2, leading=18)

    c.showPage()


# ===========================================================================
# P5 -- OUTCOMES + CTA
# Three columns / full-bleed solid MINT bar at bottom
# ===========================================================================

_OUTCOMES = [
    ('01', 'Decisions your\nregulators can follow.',
     'Every output is documented, explainable, and audit-ready before it leaves the system. '
     'Adverse decisions can be explained, step by step.',
     '33-point pre-execution validation'),
    ('02', 'More volume.\nThe same headcount.',
     'Routine tasks across origination, servicing, and collections run without human initiation. '
     'Capacity scales with the portfolio, not with hiring.',
     'Five Karta co-workers, end-to-end'),
    ('03', 'An edge that\ncannot be bought.',
     'The intelligence built on your portfolio and outcomes lives inside your infrastructure. '
     'A competitor cannot acquire it. It compounds with every loan.',
     'Sovereign, self-hosted memory'),
]

def p5_outcomes(c):
    bg(c)

    CTA_H = 128

    # Solid MINT bar -- the only mint-as-fill in the entire deck
    c.setFillColor(MINT)
    c.rect(0, 0, W, CTA_H, fill=1, stroke=0)

    # CTA copy -- dark on mint
    t(c, 80,      90, 'Ready to see it working in your environment?', SR, 22, DARK)
    t(c, 80,      57, 'Every demo runs against a live scenario -- bring the use case you want answered.', SA, 12, MIDGRN)
    t(c, W - 80,  74, 'krim.ai/contact', SAB, 15, DARK, align='right')

    page_label(c, 'OUTCOMES', 80, 697)

    COL_GAP = 44
    COL_W   = (W - 160 - 2 * COL_GAP) // 3
    COL_XS  = [80, 80 + COL_W + COL_GAP, 80 + 2 * (COL_W + COL_GAP)]

    for div_x in [COL_XS[1] - COL_GAP // 2, COL_XS[2] - COL_GAP // 2]:
        vr(c, div_x, CTA_H + 22, H - 28)

    for i, (num, headline, body, detail) in enumerate(_OUTCOMES):
        ox = COL_XS[i]

        t(c, ox, 662, num, SAB, 10, INK3)

        hl_lines = headline.split('\n')
        hy = 638
        for li, hl in enumerate(hl_lines):
            t(c, ox, hy - li * 32, hl, SR, 28, INK)

        body_y = hy - len(hl_lines) * 32 - 18
        wrap(c, body, ox, body_y, SA, 12, COL_W, INK2, leading=18)

        hr(c, ox, CTA_H + 50, ox + COL_W, Color(1, 1, 1, alpha=0.09), 0.8)
        t(c, ox, CTA_H + 36, detail, SA, 10.5, INK3)

    c.showPage()


# ── Build ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    out = '/Users/louis/Documents/krim-website-clean/public/decks/Krim_Intro.pdf'
    os.makedirs(os.path.dirname(out), exist_ok=True)
    c = Canvas(out, pagesize=(W, H))
    c.setTitle('Krim -- The Operating System for Regulated Banking')
    c.setAuthor('Krim')
    p1_cover(c)
    p2_problems(c)
    p3_solution(c)
    p4_why(c)
    p5_outcomes(c)
    c.save()
    size = os.path.getsize(out)
    print(f'Built {out} ({size:,} bytes, 5 pages)')
