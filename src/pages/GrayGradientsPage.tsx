import '../gray-gradients.css'

const grayGradients = [
  {
    id: 'current',
    name: 'Current (Flat Beige)',
    desc: 'What you have now — flat #d1ccc6 with subtle radial overlays',
    style: {
      backgroundColor: '#d1ccc6',
      backgroundImage: [
        'radial-gradient(at 30% 40%, #c8c2ba 0px, transparent 55%)',
        'radial-gradient(at 70% 30%, #d8d2ca 0px, transparent 50%)',
        'radial-gradient(at 50% 75%, #ccc6be 0px, transparent 60%)',
      ].join(', '),
    },
  },
  {
    id: 'warm-radial',
    name: 'Warm Radial Glow',
    desc: 'Centered warm glow like the dark sections, but in light tones',
    style: {
      background: 'radial-gradient(ellipse at 50% 50%, #e8e2d8 0%, #d1ccc6 55%, #c4bfb8 100%)',
    },
  },
  {
    id: 'soft-vignette',
    name: 'Soft Vignette',
    desc: 'Light center darkening to edges — subtle depth',
    style: {
      background: 'radial-gradient(ellipse at 50% 40%, #e0dbd3 0%, #d1ccc6 40%, #b8b3ab 100%)',
    },
  },
  {
    id: 'warm-spotlight',
    name: 'Warm Spotlight',
    desc: 'Off-center warm pool of light, more dramatic',
    style: {
      background: 'radial-gradient(ellipse at 30% 50%, #e8dfd2 0%, #d6d0c8 35%, #c4beb6 70%, #b5afa7 100%)',
    },
  },
  {
    id: 'taupe-depth',
    name: 'Taupe Depth',
    desc: 'Rich taupe tones — darker edges give natural framing',
    style: {
      background: 'radial-gradient(ellipse at 50% 50%, #ddd7cd 0%, #ccc6bc 45%, #b0a99f 100%)',
    },
  },
  {
    id: 'cream-wash',
    name: 'Cream Wash',
    desc: 'Lighter overall — cream center fading to warm stone',
    style: {
      background: 'radial-gradient(ellipse at 50% 45%, #efe9e0 0%, #ddd7cd 40%, #ccc6bc 100%)',
    },
  },
  {
    id: 'diagonal-light',
    name: 'Diagonal Light',
    desc: 'Linear gradient — light top-left to deeper bottom-right',
    style: {
      background: 'linear-gradient(135deg, #e4ded6 0%, #d1ccc6 50%, #b8b2aa 100%)',
    },
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    desc: 'Warm sandstone with golden undertone in the center',
    style: {
      background: 'radial-gradient(ellipse at 50% 50%, #e2d9ca 0%, #d4cdc2 40%, #c2bbb0 75%, #b5aea4 100%)',
    },
  },
  {
    id: 'fog',
    name: 'Morning Fog',
    desc: 'Cool-neutral — slightly cooler center with warm edges',
    style: {
      background: 'radial-gradient(ellipse at 50% 40%, #dcdad6 0%, #d1ccc6 50%, #c0b9b0 100%)',
    },
  },
  {
    id: 'double-glow',
    name: 'Double Glow',
    desc: 'Two warm pools of light — organic, asymmetric feel',
    style: {
      backgroundColor: '#c8c2ba',
      backgroundImage: [
        'radial-gradient(ellipse at 25% 40%, #e4ded4 0%, transparent 60%)',
        'radial-gradient(ellipse at 75% 60%, #ddd7cb 0%, transparent 55%)',
      ].join(', '),
    },
  },
  {
    id: 'parchment',
    name: 'Parchment',
    desc: 'Paper-like — warm golden center with subtle edge shadow',
    style: {
      background: 'radial-gradient(ellipse at 50% 50%, #ece5d8 0%, #ddd6ca 30%, #cbc4b8 60%, #b8b1a6 100%)',
    },
  },
  {
    id: 'earth-mesh',
    name: 'Earth Mesh',
    desc: 'Multi-point mesh gradient — organic and dimensional',
    style: {
      backgroundColor: '#c8c2ba',
      backgroundImage: [
        'radial-gradient(at 20% 30%, #e2dbd0 0%, transparent 50%)',
        'radial-gradient(at 80% 20%, #d8d0c4 0%, transparent 45%)',
        'radial-gradient(at 60% 80%, #e0d8cc 0%, transparent 50%)',
        'radial-gradient(at 10% 80%, #d0c8bc 0%, transparent 40%)',
      ].join(', '),
    },
  },
]

function GrayGradientsPage() {
  return (
    <div className="gg-page">
      <header className="gg-header">
        <h1>Gray Section Gradient Options</h1>
        <p>Each option shown with sample content matching the site layout. Click any to see full-width.</p>
      </header>
      <div className="gg-grid">
        {grayGradients.map((g) => (
          <div key={g.id} className="gg-card">
            <div
              className="gg-preview"
              style={g.style as React.CSSProperties}
              onClick={() => {
                const el = document.getElementById(`gg-fs-${g.id}`)
                if (el) {
                  el.style.display = 'flex'
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="gg-preview-content">
                <div className="gg-preview-text">
                  <h2 className="gg-preview-title">
                    Weekly drop-in<br />
                    <span className="gg-underline">meditation classes</span>
                  </h2>
                  <p className="gg-preview-desc">
                    We offer 10+ weekly meditation classes suitable for
                    beginners and experienced meditators alike.
                  </p>
                  <button className="gg-preview-btn">Class Info</button>
                </div>
                <div className="gg-preview-img-placeholder">
                  <span>Image</span>
                </div>
              </div>
            </div>
            <div className="gg-info">
              <h3>{g.name}</h3>
              <p>{g.desc}</p>
              {g.id === 'current' && <span className="gg-badge">Current</span>}
            </div>
            {/* Full-screen overlay */}
            <div
              id={`gg-fs-${g.id}`}
              className="gg-fullscreen"
              onClick={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none'
                document.body.style.overflow = ''
              }}
            >
              <div className="gg-fullscreen-inner" style={g.style as React.CSSProperties}>
                <div className="gg-fs-content">
                  <div className="gg-fs-text">
                    <h2 className="gg-fs-title">
                      Weekly drop-in<br />
                      <span className="gg-underline">meditation classes</span>
                    </h2>
                    <p className="gg-fs-desc">
                      We offer 10+ weekly meditation classes suitable for
                      beginners and experienced meditators alike. Join our
                      after-work sessions or General Program classes. Sunday's
                      11am class includes Coffee, Tea and Chat.
                    </p>
                    <button className="gg-fs-btn">Class Info</button>
                  </div>
                  <div className="gg-fs-img-placeholder">
                    <span>Image</span>
                  </div>
                </div>
                <span className="gg-fs-hint">Click anywhere to close</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GrayGradientsPage
