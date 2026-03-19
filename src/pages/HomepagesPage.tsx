import '../homepages.css'

const palettes = [
  {
    id: 'current',
    name: 'Current — Warm Stone',
    desc: 'The existing palette. Warm grays and cream with earthy mesh.',
    hero: 'background-color: #2d1f14; background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3));',
    light: 'background-color: #e8e4dc; background-image: radial-gradient(at 20% 30%, #ded8ce 0px, transparent 55%), radial-gradient(at 80% 50%, #d8d0c4 0px, transparent 50%);',
    dark: 'background-color: #555; background-image: radial-gradient(at 20% 35%, #6b5d4f 0px, transparent 55%), radial-gradient(at 80% 25%, #5c5248 0px, transparent 50%);',
    mid: 'background-color: #d1ccc6; background-image: radial-gradient(at 30% 40%, #c8c2ba 0px, transparent 55%), radial-gradient(at 70% 30%, #d8d2ca 0px, transparent 50%);',
    accent: '#888',
    textLight: 'white',
    textDark: '#1a1a1a',
  },
  {
    id: 'midnight-sand',
    name: 'Midnight & Sand',
    desc: 'Deep charcoal-navy with warm sand tones. Sophisticated and grounding.',
    hero: 'background-color: #1a1a2e; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f0ebe3; background-image: radial-gradient(at 25% 35%, #e6dfd5 0px, transparent 55%), radial-gradient(at 75% 50%, #ece5db 0px, transparent 50%);',
    dark: 'background-color: #2a2a3e; background-image: radial-gradient(at 20% 35%, #3a3850 0px, transparent 55%), radial-gradient(at 80% 25%, #332f48 0px, transparent 50%);',
    mid: 'background-color: #ddd6cb; background-image: radial-gradient(at 30% 40%, #d4ccc0 0px, transparent 55%), radial-gradient(at 70% 30%, #e2dbd0 0px, transparent 50%);',
    accent: '#7a6f5f',
    textLight: 'white',
    textDark: '#1a1a2e',
  },
  {
    id: 'sage-cream',
    name: 'Sage & Cream',
    desc: 'Muted sage green with warm cream. Natural and calming.',
    hero: 'background-color: #2d3a2d; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f2efe8; background-image: radial-gradient(at 25% 35%, #e8e5dc 0px, transparent 55%), radial-gradient(at 75% 50%, #edeae2 0px, transparent 50%);',
    dark: 'background-color: #3d4a3d; background-image: radial-gradient(at 20% 35%, #4d5c4d 0px, transparent 55%), radial-gradient(at 80% 25%, #455445 0px, transparent 50%);',
    mid: 'background-color: #dde0d5; background-image: radial-gradient(at 30% 40%, #d2d6cb 0px, transparent 55%), radial-gradient(at 70% 30%, #e2e5da 0px, transparent 50%);',
    accent: '#6b7d6b',
    textLight: 'white',
    textDark: '#2d3a2d',
  },
  {
    id: 'indigo-linen',
    name: 'Indigo & Linen',
    desc: 'Deep indigo blues with natural linen tones. Contemplative.',
    hero: 'background-color: #1e2a3a; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f0ece5; background-image: radial-gradient(at 25% 35%, #e6e0d8 0px, transparent 55%), radial-gradient(at 75% 50%, #ece7df 0px, transparent 50%);',
    dark: 'background-color: #2a3a50; background-image: radial-gradient(at 20% 35%, #354a62 0px, transparent 55%), radial-gradient(at 80% 25%, #2f4058 0px, transparent 50%);',
    mid: 'background-color: #ddd8cf; background-image: radial-gradient(at 30% 40%, #d3cdc3 0px, transparent 55%), radial-gradient(at 70% 30%, #e2dcd2 0px, transparent 50%);',
    accent: '#4a6a8a',
    textLight: 'white',
    textDark: '#1e2a3a',
  },
  {
    id: 'charcoal-gold',
    name: 'Charcoal & Gold',
    desc: 'Rich charcoal with warm gold accents. Luxe and modern.',
    hero: 'background-color: #1a1a1a; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f5f0e8; background-image: radial-gradient(at 25% 35%, #ede6dc 0px, transparent 55%), radial-gradient(at 75% 50%, #f0eae0 0px, transparent 50%);',
    dark: 'background-color: #2a2a2a; background-image: radial-gradient(at 20% 35%, #3a3530 0px, transparent 55%), radial-gradient(at 80% 25%, #333028 0px, transparent 50%);',
    mid: 'background-color: #e5ddd0; background-image: radial-gradient(at 30% 40%, #dcd3c5 0px, transparent 55%), radial-gradient(at 70% 30%, #eae2d5 0px, transparent 50%);',
    accent: '#b8960c',
    textLight: 'white',
    textDark: '#1a1a1a',
  },
  {
    id: 'plum-parchment',
    name: 'Plum & Parchment',
    desc: 'Deep muted plum with aged parchment. Rich and contemplative.',
    hero: 'background-color: #2a1f2e; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f0ebe5; background-image: radial-gradient(at 25% 35%, #e8e2da 0px, transparent 55%), radial-gradient(at 75% 50%, #ede7df 0px, transparent 50%);',
    dark: 'background-color: #3a2f40; background-image: radial-gradient(at 20% 35%, #4a3d52 0px, transparent 55%), radial-gradient(at 80% 25%, #42354a 0px, transparent 50%);',
    mid: 'background-color: #ddd6ce; background-image: radial-gradient(at 30% 40%, #d4ccc3 0px, transparent 55%), radial-gradient(at 70% 30%, #e2dad2 0px, transparent 50%);',
    accent: '#7a5a8a',
    textLight: 'white',
    textDark: '#2a1f2e',
  },
  {
    id: 'clay-ivory',
    name: 'Clay & Ivory',
    desc: 'Warm terracotta clay with soft ivory. Earthy and inviting.',
    hero: 'background-color: #3a2520; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #f5f0ea; background-image: radial-gradient(at 25% 35%, #ece5dc 0px, transparent 55%), radial-gradient(at 75% 50%, #f0ebe2 0px, transparent 50%);',
    dark: 'background-color: #4a3530; background-image: radial-gradient(at 20% 35%, #5c4540 0px, transparent 55%), radial-gradient(at 80% 25%, #523d38 0px, transparent 50%);',
    mid: 'background-color: #e0d5ca; background-image: radial-gradient(at 30% 40%, #d6cbbf 0px, transparent 55%), radial-gradient(at 70% 30%, #e5dad0 0px, transparent 50%);',
    accent: '#a06850',
    textLight: 'white',
    textDark: '#3a2520',
  },
  {
    id: 'ocean-mist',
    name: 'Ocean Mist',
    desc: 'Deep teal ocean with misty gray-blue. Serene and open.',
    hero: 'background-color: #1a2a2e; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));',
    light: 'background-color: #eef0ee; background-image: radial-gradient(at 25% 35%, #e4e8e5 0px, transparent 55%), radial-gradient(at 75% 50%, #eaedea 0px, transparent 50%);',
    dark: 'background-color: #2a3e42; background-image: radial-gradient(at 20% 35%, #354e54 0px, transparent 55%), radial-gradient(at 80% 25%, #2f454a 0px, transparent 50%);',
    mid: 'background-color: #d5dbd8; background-image: radial-gradient(at 30% 40%, #ccd2cf 0px, transparent 55%), radial-gradient(at 70% 30%, #dae0dc 0px, transparent 50%);',
    accent: '#4a8a8a',
    textLight: 'white',
    textDark: '#1a2a2e',
  },
]

function HomepagesPage() {
  return (
    <div className="hp-page">
      <header className="hp-header">
        <h1>Homepage Palette Options</h1>
        <p>Each mockup shows the full page color flow: hero, schedule section, about section, classes section, social, newsletter, and footer.</p>
      </header>
      <div className="hp-grid">
        {palettes.map((p) => (
          <div key={p.id} className="hp-card">
            <div className="hp-label">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
            <div className="hp-mockup">
              {/* Hero */}
              <div className="hp-section hp-hero-mock" style={{ cssText: p.hero } as React.CSSProperties}>
                <span style={{ color: p.textLight, fontSize: '11px', fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                  Change your mind, change your world.
                </span>
              </div>
              {/* Schedule (light) */}
              <div className="hp-section" style={{ cssText: p.light } as React.CSSProperties}>
                <span style={{ color: p.textDark, fontSize: '9px', fontWeight: 600, letterSpacing: '0.5px' }}>UPCOMING CLASSES</span>
                <div className="hp-mini-card" style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '3px', padding: '4px 8px', marginTop: '4px' }}>
                  <span style={{ color: p.textDark, fontSize: '7px' }}>Schedule Widget</span>
                </div>
              </div>
              {/* Dark section */}
              <div className="hp-section" style={{ cssText: p.dark } as React.CSSProperties}>
                <span style={{ color: p.textLight, fontSize: '9px', fontWeight: 500 }}>Discover inner peace</span>
                <div style={{ width: '40px', height: '24px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)', marginTop: '3px' }} />
              </div>
              {/* Mid section */}
              <div className="hp-section" style={{ cssText: p.mid } as React.CSSProperties}>
                <span style={{ color: p.textDark, fontSize: '9px', fontWeight: 500 }}>Weekly drop-in classes</span>
                <div style={{ width: '40px', height: '24px', borderRadius: '2px', background: 'rgba(0,0,0,0.08)', marginTop: '3px' }} />
              </div>
              {/* Social / dark */}
              <div className="hp-section" style={{ cssText: p.dark } as React.CSSProperties}>
                <span style={{ color: p.textLight, fontSize: '9px' }}>Connect With Us</span>
                <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ width: '14px', height: '14px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
                  ))}
                </div>
              </div>
              {/* Newsletter / mid */}
              <div className="hp-section" style={{ cssText: p.mid } as React.CSSProperties}>
                <span style={{ color: p.textDark, fontSize: '8px' }}>Newsletter</span>
                <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                  <div style={{ width: '30px', height: '10px', borderRadius: '2px', background: 'rgba(255,255,255,0.7)' }} />
                  <div style={{ width: '20px', height: '10px', borderRadius: '8px', background: p.accent }} />
                </div>
              </div>
              {/* Footer / dark */}
              <div className="hp-section" style={{ cssText: p.dark } as React.CSSProperties}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '7px' }}>KMC Williamsburg</span>
              </div>
            </div>
            {/* Color swatches */}
            <div className="hp-swatches">
              <div className="hp-swatch" style={{ cssText: p.hero } as React.CSSProperties} title="Hero" />
              <div className="hp-swatch" style={{ cssText: p.light } as React.CSSProperties} title="Light" />
              <div className="hp-swatch" style={{ cssText: p.dark } as React.CSSProperties} title="Dark" />
              <div className="hp-swatch" style={{ cssText: p.mid } as React.CSSProperties} title="Mid" />
              <div className="hp-swatch" style={{ background: p.accent }} title="Accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomepagesPage
