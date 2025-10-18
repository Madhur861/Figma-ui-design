import { useMemo, useState } from 'react'
import './App.css'

type Swatch = {
  id: string
  label: string
  color: string
  priceDelta?: number
}

type Section = {
  id: string
  title: string
  swatches: Swatch[]
}

const sectionsData: Section[] = [
  {
    id: 'leather',
    title: 'Leather',
    swatches: [
      { id: 'leather-brown', label: 'Leather Brown', color: '#6b4f3a' },
      { id: 'leather-tan', label: 'Leather Tan', color: '#b08968', priceDelta: 40 },
      { id: 'leather-oxblood', label: 'Oxblood', color: '#6d1b2a', priceDelta: 60 },
      { id: 'leather-black', label: 'Black', color: '#0f1012' },
      { id: 'leather-olive', label: 'Olive', color: '#3e4b3b' },
      { id: 'leather-navy', label: 'Navy', color: '#1f2c4d' },
      { id: 'leather-cream', label: 'Cream', color: '#ded5c7', priceDelta: 20 },
      { id: 'leather-sage', label: 'Sage', color: '#98a886' },
      { id: 'leather-slate', label: 'Slate', color: '#64748b' },
      { id: 'leather-rust', label: 'Rust', color: '#a0472b' },
      { id: 'leather-forest', label: 'Forest', color: '#1b512d' },
      { id: 'leather-plum', label: 'Plum', color: '#6b377e' },
      { id: 'leather-camel', label: 'Camel', color: '#c49a6c' },
      { id: 'leather-charcoal', label: 'Charcoal', color: '#2b2f3a' },
    ],
  },
  {
    id: 'silicon',
    title: 'Silicon',
    swatches: [
      { id: 'silicon-warm-gray', label: 'Warm Gray', color: '#6b7280' },
      { id: 'silicon-cool-gray', label: 'Cool Gray', color: '#475569' },
      { id: 'silicon-green', label: 'Green', color: '#3aa76d' },
      { id: 'silicon-teal', label: 'Teal', color: '#0ea5a4' },
      { id: 'silicon-eggplant', label: 'Eggplant', color: '#5b3a76' },
      { id: 'silicon-brick', label: 'Brick', color: '#9f3b2b' },
      { id: 'silicon-ink', label: 'Ink', color: '#111827' },
    ],
  },
  {
    id: 'aluminum',
    title: 'Aluminum',
    swatches: [
      { id: 'alu-silver', label: 'Silver', color: '#bfc5d2' },
      { id: 'alu-graphite', label: 'Graphite', color: '#4b5563' },
      { id: 'alu-gold', label: 'Champagne', color: '#e0c18a', priceDelta: 25 },
    ],
  },
]

const basePrice = 200

export default function App() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    leather: true,
    silicon: true,
    aluminum: true,
  })

  const [selection, setSelection] = useState<Record<string, string>>({
    leather: 'leather-brown',
    silicon: 'silicon-warm-gray',
    aluminum: 'alu-silver',
  })

  const price = useMemo(() => {
    let total = basePrice
    for (const section of sectionsData) {
      const chosen = section.swatches.find((s) => s.id === selection[section.id])
      if (chosen?.priceDelta) total += chosen.priceDelta
    }
    return total
  }, [selection])

  return (
    <div className="page-grid">
      {/* Left: product viewer mock */}
      <div className="viewer">
        <div className="thumbs">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="thumb" />
          ))}
        </div>
        <div className="canvas">
          <div style={{
            width: 480,
            height: 220,
            borderRadius: 16,
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.15), transparent), #2d313f',
            boxShadow: '0 40px 80px rgba(0,0,0,.35)'
          }} />
        </div>
      </div>

      {/* Right: configuration panel */}
      <aside className="panel">
        <header className="panel-header">
          <div>
            <div className="title">Cozy Lounge Chair</div>
            <div className="muted" aria-hidden>Customize your chair</div>
          </div>
          <div className="price">
            <span className="muted">From </span>
            ${basePrice}
          </div>
        </header>

        <div className="section">
          {sectionsData.map((section) => (
            <div key={section.id}>
              <div
                className="section-header"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, [section.id]: !s[section.id] }))
                }
                role="button"
                aria-expanded={openSections[section.id]}
              >
                <strong>{section.title}</strong>
                <span className="muted">{section.swatches.length} options</span>
              </div>

              {openSections[section.id] && (
                <div className="swatches" role="radiogroup" aria-label={section.title}>
                  {section.swatches.map((swatch) => {
                    const checked = selection[section.id] === swatch.id
                    return (
                      <button
                        key={swatch.id}
                        className="swatch"
                        title={`${swatch.label}${swatch.priceDelta ? ` (+$${swatch.priceDelta})` : ''}`}
                        style={{ backgroundColor: swatch.color }}
                        role="radio"
                        aria-checked={checked}
                        onClick={() =>
                          setSelection((sel) => ({ ...sel, [section.id]: swatch.id }))
                        }
                      >
                        <span className="sr-only">{swatch.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cta">
          <button className="btn-secondary">View in your room</button>
          <button className="btn-primary">Add to cart — ${price}</button>
        </div>
      </aside>
    </div>
  )
}
