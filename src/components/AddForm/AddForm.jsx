import { useState, useEffect } from 'react'
import { CATS } from '../../constants'
import { uid, today, blank, hint, inputBase } from '../../utils/helpers'

export default function AddForm({ seed, onAdd }) {
  const [f,    setF]    = useState(() => seed ? fromSeed(seed) : blank())
  const [errs, setErrs] = useState({})
  const [sugg, setSugg] = useState(null)

  useEffect(() => {
    if (seed) { setF(fromSeed(seed)); setErrs({}); setSugg(null) }
  }, [seed])

  function upd(field, val) {
    setF((prev) => ({ ...prev, [field]: val }))
    if (errs[field]) setErrs((prev) => ({ ...prev, [field]: null }))
    if (field === 'title') setSugg(val.trim() ? hint(val) : null)
  }

  function handleAdd() {
    const e2 = {}
    if (!f.title.trim()) e2.title = 'Title is required.'
    const n = parseInt(f.amount, 10)
    if (!f.amount || isNaN(n) || n < 1) e2.amount = 'Enter a whole number greater than 0.'
    if (Object.keys(e2).length) { setErrs(e2); return }

    onAdd({ id: uid(), title: f.title.trim(), amount: n, cat: f.cat, date: f.date, note: f.note.trim() })
    setF(blank()); setErrs({}); setSugg(null)
  }

  const lbl = { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a706a', display: 'block', marginBottom: 5 }
  const row = { marginBottom: 10 }

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd4cb', borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9a8f85', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0ebe4' }}>
        Log Expense
      </div>

      <div style={row}>
        <label style={lbl}>Title *</label>
        <input type="text" autoComplete="off" placeholder="e.g. Uber ride, lunch, rent..."
          value={f.title} onChange={(e) => upd('title', e.target.value)}
          style={{ ...inputBase, border: errs.title ? '1.5px solid #c0392b' : '1.5px solid #ddd4cb', background: errs.title ? '#fff5f5' : '#fff' }}
        />
        {errs.title && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 3 }}>{errs.title}</div>}

        {sugg && sugg !== f.cat && (
          <div style={{ marginTop: 6, padding: '7px 10px', borderRadius: 6, background: '#edfaf3', border: '1px solid #a8d5b5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 11, color: '#1a7a4a' }}>
            <span>💡 Suggested: <strong>{sugg}</strong></span>
            <button type="button" onClick={() => { upd('cat', sugg); setSugg(null) }}
              style={{ background: '#1a7a4a', color: '#fff', border: 'none', borderRadius: 4, padding: '3px 9px', fontSize: 10, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>
              Use it
            </button>
          </div>
        )}
      </div>

      <div style={row}>
        <label style={lbl}>Amount ($) *</label>
        <input type="number" min="1" step="1" placeholder="e.g. 25"
          value={f.amount} onChange={(e) => upd('amount', e.target.value)}
          style={{ ...inputBase, border: errs.amount ? '1.5px solid #c0392b' : '1.5px solid #ddd4cb', background: errs.amount ? '#fff5f5' : '#fff' }}
        />
        {errs.amount && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 3 }}>{errs.amount}</div>}
      </div>

      <div style={row}>
        <label style={lbl}>Category</label>
        <select value={f.cat} onChange={(e) => upd('cat', e.target.value)} style={{ ...inputBase, cursor: 'pointer' }}>
          {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={row}>
        <label style={lbl}>Date</label>
        <input type="date" value={f.date} onChange={(e) => upd('date', e.target.value)} style={inputBase} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Note <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
        <input type="text" placeholder="e.g. team lunch" value={f.note} onChange={(e) => upd('note', e.target.value)} style={inputBase} />
      </div>

      <button type="button" onClick={handleAdd}
        style={{ display: 'block', width: '100%', padding: '12px 0', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#c94a2a', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit' }}
        onMouseOver={(e) => e.currentTarget.style.background = '#a83a1e'}
        onMouseOut={(e)  => e.currentTarget.style.background = '#c94a2a'}
      >
        + Add Expense
      </button>
    </div>
  )
}

const fromSeed = (s) => ({ title: s.title, amount: String(s.amt), cat: s.cat, date: today(), note: s.note })
