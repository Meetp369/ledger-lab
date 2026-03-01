import { useMemo } from 'react'
import { usd } from '../../utils/helpers'

export default function Summary({ expenses, budget, spent }) {
  const bycat = useMemo(
    () => expenses.reduce((acc, e) => ({ ...acc, [e.cat]: (acc[e.cat] || 0) + e.amount }), {}),
    [expenses]
  )
  const rows = Object.entries(bycat).sort(([, a], [, b]) => b - a)
  const over = budget > 0 && spent > budget

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd4cb', borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9a8f85', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0ebe4' }}>
        Summary
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid #f0ebe4' }}>
        <span style={{ fontSize: 12, color: '#7a706a' }}>Total Spent</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#1a1714' }}>{usd(spent)}</span>
      </div>

      {budget > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 8, marginBottom: 10, borderBottom: '1px solid #f0ebe4', color: over ? '#c0392b' : '#1a7a4a' }}>
          <span style={{ fontSize: 12 }}>{over ? '⚠ Over Budget' : 'Remaining'}</span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{usd(Math.abs(budget - spent))}</span>
        </div>
      )}

      {rows.length === 0
        ? <p style={{ fontSize: 12, color: '#9a8f85' }}>No expenses yet.</p>
        : rows.map(([cat, amt]) => {
            const pct = spent > 0 ? Math.round((amt / spent) * 100) : 0
            return (
              <div key={cat} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: '#5a5550' }}>{cat}</span>
                  <span style={{ color: '#1a1714', fontWeight: 600 }}>
                    {usd(amt)} <span style={{ color: '#9a8f85', fontWeight: 400 }}>({pct}%)</span>
                  </span>
                </div>
                <div style={{ height: 4, background: '#ede8e2', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct + '%', borderRadius: 99, background: 'linear-gradient(90deg,#c94a2a,rgba(201,74,42,0.45))', transition: 'width 0.4s' }} />
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
