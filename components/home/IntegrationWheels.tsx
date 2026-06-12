/**
 * IntegrationWheels — homepage §7: the three categorised integration
 * wheels as slow, glassy orbital rings. Names from krim-content.md
 * ("works with," not endorsements). CSS-only orbit; each tag
 * counter-rotates to stay upright; reduced-motion renders static.
 */

const WHEELS: Array<{ name: string; tags: string[] }> = [
  {
    name: 'Core systems',
    tags: ['Finacle', 'Flexcube', 'BaNCS', 'Lentra', 'Tavant', 'Newgen', 'Nucleus', 'In-house'],
  },
  {
    name: 'Channels & voice',
    tags: ['Genesys', 'NICE CXone', 'Avaya', 'Cisco', 'Exotel', 'WhatsApp', 'IVR', 'SMS'],
  },
  {
    name: 'Data & security',
    tags: ['Snowflake', 'BigQuery', 'Hadoop', 'On-prem DWH', 'OAuth 2.0', 'SAML', 'RBAC', 'Customer keys'],
  },
]

function Wheel({ name, tags, phase, period }: { name: string; tags: string[]; phase: number; period: number }) {
  return (
    <div className="relative mx-auto h-[280px] w-[280px]">
      {/* the ring lines — the orbit made visible */}
      <div className="absolute inset-[24px] rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.14)' }} />
      <div className="absolute inset-[34px] rounded-full border border-soft" />
      {/* the orbit */}
      <div className="orbit absolute inset-0" style={{ animationDuration: `${period}s` }}>
        {tags.map((t, i) => {
          const angle = phase + (i * 360) / tags.length
          return (
            <div
              key={t}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-116px)` }}
            >
              <div style={{ transform: `rotate(${-angle}deg)` }}>
                <div className="orbit-tag" style={{ animationDuration: `${period}s` }}>
                  <span className="whitespace-nowrap rounded border border-soft bg-bg/85 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 backdrop-blur-sm">
                    {t}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* the hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="max-w-[120px] text-center font-serif text-[1.05rem] leading-snug text-ink">{name}</p>
      </div>
    </div>
  )
}

export default function IntegrationWheels() {
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {WHEELS.map((w, i) => (
          <Wheel key={w.name} {...w} phase={i * 25} period={84 + i * 14} />
        ))}
      </div>
      <p className="mt-6 text-center font-mono text-[11px] tracking-[0.08em] text-ink-3">
        REPRESENTATIVE SYSTEMS — WORKS WITH, NOT ENDORSEMENTS · 40+ CONNECTORS
      </p>
    </div>
  )
}
