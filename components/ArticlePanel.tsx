/**
 * ArticlePanel — the frosted backing for all /insights article bodies.
 *
 * A single large glass card sits behind the entire body section so long-form
 * prose is readable over the orb backdrop. The fill is kept light (0.5) so the
 * orb glow bleeds through; a strong backdrop-blur frosts it enough to keep the
 * prose legible.
 */

export default function ArticlePanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto max-w-[820px] rounded-[24px] p-8 sm:p-12 lg:p-16"
      style={{
        background: 'rgba(10,11,15,0.5)',
        backdropFilter: 'blur(30px) saturate(120%)',
        WebkitBackdropFilter: 'blur(30px) saturate(120%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 100px -32px rgba(0,0,0,0.55)',
      }}
    >
      <div className="mx-auto max-w-[640px]">
        {children}
      </div>
    </div>
  )
}
