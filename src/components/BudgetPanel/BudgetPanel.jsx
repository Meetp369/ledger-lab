import { useState, useEffect } from 'react'
import { usd, inputBase } from '../../utils/helpers'

export default function BudgetPanel({ budget, spent, onSet }) {
  const [raw, setRaw] = useState(budget > 0 ? String(budget) : '')
  const [err, setErr] = useState('')

  useEffect(() => { if (budget <= 0) setRaw('') }, [budget])

  function handleSet() {
    const n = parseInt(raw.trim(), 10)
    if (isNaN(n) || n < 1) { setErr('Please enter a valid amount greater than 0.'); return }
    setErr('')
    onSet(n)
  }

  const pct  = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const over = budget > 0 && spent > budget

  const lbl = {
    fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.1em', color: '#7a706a', display: 'block', marginBottom: 5,
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd4cb', borderRadius: 10, padding: 16 }}>
      <CardTitle>Monthly Budget</CardTitle>

      <label style={lbl}>Set Amount ($)</label>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="number" min="1" step="1" placeholder="e.g. 2000"
          value={raw}
          onChange={(e) => { setRaw(e.target.value); setErr('') }}
          style={{ ...inputBase, flex: 1, border: err ? '1.5px solid #c0392b' : '1.5px solid #ddd4cb' }}
        />
        <GhostBtn onClick={handleSet}>Set</GhostBtn>
      </div>
      {err && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 4 }}>{err}</div>}

      {budget > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9a8f85', marginBottom: 5 }}>
            <span>Spent: <strong style={{ color: '#1a1714' }}>{usd(spent)}</strong></span>
            <span style={{ color: over ? '#c0392b' : '#1a7a4a', fontWeight: 600 }}>
              {over ? `${usd(spent - budget)} over` : `${usd(budget - spent)} remaining`}
            </span>
          </div>
          <div style={{ height: 8, background: '#ede8e2', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: pct + '%', borderRadius: 99,
              background: over ? 'linear-gradient(90deg,#c0392b,#e05252)' : 'linear-gradient(90deg,#1a7a4a,#34d399)',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}
    </div>
  )
}

function GhostBtn({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        padding: '9px 16px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.08em', border: '1.5px solid #bbb0a5', borderRadius: 6,
        background: 'transparent', color: '#5a5550', cursor: 'pointer',
        fontFamily: 'inherit', whiteSpace: 'nowrap',
      }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#c94a2a'; e.currentTarget.style.color = '#c94a2a' }}
      onMouseOut={(e)  => { e.currentTarget.style.borderColor = '#bbb0a5'; e.currentTarget.style.color = '#5a5550' }}
    >{children}</button>
  )
}

function CardTitle({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
      color: '#9a8f85', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0ebe4',
    }}>{children}</div>
  )
}
