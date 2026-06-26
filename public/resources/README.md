# Demo-booking resources

Files offered (and download-tracked) in the demo follow-up emails. See
`lib/booking-config.ts` → `RESOURCES`.

## Required before going live

- **`krim-deck.pdf`** — the sales deck / whitepaper linked in the day-2 email.
  Drop the real PDF here with exactly this filename. Until it exists the
  "Download the deck" link will 404, so add it before enabling the sequence.

To offer another file: drop it here, then add a key in `RESOURCES`
(e.g. `'krim-onepager': { url: '/resources/krim-onepager.pdf', title: '…' }`).
