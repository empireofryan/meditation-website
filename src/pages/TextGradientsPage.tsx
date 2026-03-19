import '../text-gradients.css'

const logoOptions = [
  {
    id: 'gold-warm',
    name: 'Warm Gold',
    desc: 'Antique gold shimmer — luxe and refined',
    gradient: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 35%, #b8860b 65%, #d4a843 100%)',
  },
  {
    id: 'silver-mist',
    name: 'Silver Mist',
    desc: 'Cool platinum to warm silver — modern elegance',
    gradient: 'linear-gradient(135deg, #a8a8a8 0%, #e8e8e8 40%, #b8b0a0 70%, #d0c8b8 100%)',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    desc: 'Warm pink-gold tones — soft luxury',
    gradient: 'linear-gradient(135deg, #b88a7a 0%, #d4a898 35%, #a07060 65%, #c49888 100%)',
  },
  {
    id: 'amber-sand',
    name: 'Amber & Sand',
    desc: 'Deep amber fading to warm sand',
    gradient: 'linear-gradient(135deg, #8b5e3c 0%, #c4956a 35%, #6b4423 65%, #a07848 100%)',
  },
  {
    id: 'sage-stone',
    name: 'Sage & Stone',
    desc: 'Muted sage into warm gray stone',
    gradient: 'linear-gradient(135deg, #6b7d6b 0%, #9aaa9a 35%, #5c5248 65%, #8a8278 100%)',
  },
  {
    id: 'indigo-pearl',
    name: 'Indigo Pearl',
    desc: 'Deep indigo to soft pearl — contemplative',
    gradient: 'linear-gradient(135deg, #354a62 0%, #6a88a8 35%, #2a3a50 65%, #8098b8 100%)',
  },
  {
    id: 'cream-linen',
    name: 'Cream & Linen',
    desc: 'Soft cream into warm linen — clean, pure',
    gradient: 'linear-gradient(135deg, #d4cfc8 0%, #f0ece5 40%, #c8c0b0 70%, #e8e2d8 100%)',
  },
  {
    id: 'bronze-obsidian',
    name: 'Bronze & Obsidian',
    desc: 'Rich bronze glowing out of deep dark',
    gradient: 'linear-gradient(135deg, #1a1410 0%, #6b4a2a 35%, #0d0a07 60%, #a07040 100%)',
  },
]

const sectionOptions = [
  {
    id: 'mesh-warm',
    name: 'Warm Mesh',
    desc: 'Organic earthy blobs — the current hero style',
    bg: {
      backgroundColor: '#555',
      backgroundImage: `radial-gradient(at 20% 35%, #6b5d4f 0px, transparent 55%),
        radial-gradient(at 80% 25%, #5c5248 0px, transparent 50%),
        radial-gradient(at 55% 75%, #4a4540 0px, transparent 60%)`,
    },
    textColor: '#fff',
  },
  {
    id: 'sand-horizontal',
    name: 'Sand Drift',
    desc: 'Soft horizontal wash — light stone to warm cream',
    bg: {
      background: 'linear-gradient(160deg, #c8c0b0 0%, #e8e2d8 40%, #d4ccc0 70%, #f0ece5 100%)',
    },
    textColor: '#2a2a2a',
  },
  {
    id: 'midnight-radial',
    name: 'Midnight Glow',
    desc: 'Deep dark with warm center radial — dramatic',
    bg: {
      background: 'radial-gradient(ellipse at 50% 60%, #4a3828 0%, #2a2520 50%, #1a1410 100%)',
    },
    textColor: '#fff',
  },
  {
    id: 'sage-wash',
    name: 'Sage Wash',
    desc: 'Muted sage gradient — natural, calming',
    bg: {
      background: 'linear-gradient(150deg, #3d4a3d 0%, #5a6a58 35%, #4a584a 65%, #6a7a68 100%)',
    },
    textColor: '#fff',
  },
  {
    id: 'linen-diagonal',
    name: 'Linen Diagonal',
    desc: 'Warm diagonal wash — ivory to stone',
    bg: {
      background: 'linear-gradient(135deg, #f5f0e8 0%, #e8e2d8 35%, #d4ccc0 65%, #ede7df 100%)',
    },
    textColor: '#2a2a2a',
  },
  {
    id: 'indigo-depth',
    name: 'Indigo Depth',
    desc: 'Rich layered indigo blues — contemplative',
    bg: {
      backgroundColor: '#1e2a3a',
      backgroundImage: `radial-gradient(at 30% 40%, #2a3a52 0px, transparent 55%),
        radial-gradient(at 70% 30%, #354a62 0px, transparent 50%),
        radial-gradient(at 50% 80%, #1a2a3a 0px, transparent 60%)`,
    },
    textColor: '#fff',
  },
  {
    id: 'plum-mesh',
    name: 'Plum Mesh',
    desc: 'Deep plum with organic gradient blobs',
    bg: {
      backgroundColor: '#2a1f2e',
      backgroundImage: `radial-gradient(at 25% 35%, #3a2f40 0px, transparent 55%),
        radial-gradient(at 75% 25%, #4a3d52 0px, transparent 50%),
        radial-gradient(at 50% 70%, #221830 0px, transparent 60%)`,
    },
    textColor: '#fff',
  },
  {
    id: 'charcoal-vignette',
    name: 'Charcoal Vignette',
    desc: 'Centered warm light on charcoal — cinematic',
    bg: {
      background: 'radial-gradient(ellipse at 50% 50%, #4a4540 0%, #2a2a2a 55%, #1a1a1a 100%)',
    },
    textColor: '#fff',
  },
]

function TextGradientsPage() {
  return (
    <div className="tg-page">
      <header className="tg-header">
        <h1>Gradient Options</h1>
        <p>Logo text gradients (top) and section background gradients (bottom). Mix and match.</p>
      </header>

      {/* Logo / Title Text Gradients */}
      <section className="tg-section">
        <h2 className="tg-section-title">Logo & Title Text</h2>
        <div className="tg-logo-grid">
          {logoOptions.map((opt) => (
            <div key={opt.id} className="tg-logo-card">
              <div className="tg-logo-preview">
                <span
                  className="tg-logo-main"
                  style={{ backgroundImage: opt.gradient }}
                >
                  KADAMPA MEDITATION CENTER
                </span>
                <span
                  className="tg-logo-sub"
                  style={{ backgroundImage: opt.gradient }}
                >
                  Williamsburg
                </span>
              </div>
              <div className="tg-logo-section-preview">
                <span
                  className="tg-section-heading"
                  style={{ backgroundImage: opt.gradient }}
                >
                  Members Login
                </span>
              </div>
              <div className="tg-card-info">
                <strong>{opt.name}</strong>
                <span>{opt.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Background Gradients */}
      <section className="tg-section">
        <h2 className="tg-section-title">Section Backgrounds</h2>
        <div className="tg-bg-grid">
          {sectionOptions.map((opt) => (
            <div key={opt.id} className="tg-bg-card" style={opt.bg as React.CSSProperties}>
              <span className="tg-bg-label" style={{ color: opt.textColor }}>Members Login</span>
              <span className="tg-bg-desc" style={{ color: opt.textColor, opacity: 0.7 }}>
                {opt.name} — {opt.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TextGradientsPage
