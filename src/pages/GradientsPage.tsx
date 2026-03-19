import '../gradients.css'

const gradients = [
  {
    id: 'warm-earth',
    name: 'Warm Earth',
    desc: 'Earthy tones inspired by the meditation room palette',
    className: 'grad-warm-earth',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    desc: 'Sunset warmth fading to deep charcoal',
    className: 'grad-golden-hour',
  },
  {
    id: 'sand-dune',
    name: 'Sand Dune',
    desc: 'Subtle beige-to-stone with grain texture',
    className: 'grad-sand-dune',
  },
  {
    id: 'midnight-amber',
    name: 'Midnight Amber',
    desc: 'Deep dark base with warm amber glow',
    className: 'grad-midnight-amber',
  },
  {
    id: 'mesh-warm',
    name: 'Warm Mesh',
    desc: 'Organic multi-color mesh gradient',
    className: 'grad-mesh-warm',
  },
  {
    id: 'mesh-minimal',
    name: 'Minimal Mesh',
    desc: 'Soft, barely-there mesh with cream and stone',
    className: 'grad-mesh-minimal',
  },
  {
    id: 'aurora-earth',
    name: 'Aurora Earth',
    desc: 'Slow animated gradient shift',
    className: 'grad-aurora-earth',
  },
  {
    id: 'noir-grain',
    name: 'Noir Grain',
    desc: 'Dark charcoal with fine noise texture',
    className: 'grad-noir-grain',
  },
  {
    id: 'silk',
    name: 'Silk',
    desc: 'Ultra-soft cream to warm gray',
    className: 'grad-silk',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    desc: 'Muted clay tones with depth',
    className: 'grad-terracotta',
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    desc: 'Dark teal to midnight — contemplative',
    className: 'grad-deep-ocean',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    desc: 'Luxe warm pink-gold to charcoal',
    className: 'grad-rose-gold',
  },
]

function GradientsPage() {
  return (
    <div className="gradients-page">
      <header className="gradients-header">
        <h1>Hero Gradient Options</h1>
        <p>Each gradient shown at the same dimensions as the interior page hero banner. Click any to see it full-screen.</p>
      </header>
      <div className="gradients-grid">
        {gradients.map((g) => (
          <div key={g.id} className="gradient-card">
            <div
              className={`gradient-preview ${g.className}`}
              onClick={() => {
                const el = document.getElementById(`fullscreen-${g.id}`)
                if (el) {
                  el.style.display = 'flex'
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <span className="gradient-preview-title">About Us</span>
              <span className="gradient-preview-subtitle">Kadampa Meditation Center Williamsburg</span>
            </div>
            <div className="gradient-info">
              <h3>{g.name}</h3>
              <p>{g.desc}</p>
            </div>
            {/* Full-screen overlay */}
            <div
              id={`fullscreen-${g.id}`}
              className="gradient-fullscreen"
              onClick={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none'
                document.body.style.overflow = ''
              }}
            >
              <div className={`gradient-fullscreen-inner ${g.className}`}>
                <span className="gradient-fs-title">About Us</span>
                <span className="gradient-fs-subtitle">Kadampa Meditation Center Williamsburg</span>
                <span className="gradient-fs-hint">Click anywhere to close</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GradientsPage
