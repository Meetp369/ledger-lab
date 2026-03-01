import { useState, useEffect } from 'react'
import { CATS } from '../../constants'
import { inputBase } from '../../utils/helpers'

export default function EditDrawer({ expense, onClose, onSave, onDel }) {
  const open = !!expense
  const [f,    setF]    = useState(null)
  const [errs, setErrs] = useState({})

  useEffect(() => {
    if (expense) { setF({ ...expense, amount: String(expense.amount) }); setErrs({}) }
  }, [expense?.id])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  function upd(field, val) {
    setF((prev) => ({ ...prev, [field]: val }))
    if (errs[field]) setErrs((prev) => ({ ...prev, [field]: null }))
  }

  function handleSave() {
    const e2 = {}
    if (!f.title.trim()) e2.title = 'Title is required.'
    const n = parseInt(f.amount, 10)
    if (!f.amount || isNaN(n) || n < 1) e2.amount = 'Enter a whole number > 0.'
    if (Object.keys(e2).length) { setErrs(e2); return }
    onSave({ ...f, amount: n, title: f.title.trim(), note: f.note.trim() })
    onClose()
  }

  const lbl = { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a706a', display: 'block', marginBottom: 5 }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(26,23,20,0.4)', backdropFilter: 'blur(2px)', opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity 0.3s' }} />

      <aside style={{ position: 'fixed', top: 0, right: 0, zIndex: 50, width: 390, maxWidth: '100vw', height: '100vh', background: '#fff', borderLeft: '2px solid #c94a2a', boxShadow: '-6px 0 32px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', overflowY: 'auto', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: '#1a1714', borderBottom: '2px solid #c94a2a', position: 'sticky', top: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Edit Expense</span>
          <button type="button" onClick={onClose}
            style={{ background: 'none', border: '1px solid #3a3530', color: '#9a8f85', borderRadius: 6, width: 30, height: 30, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#c94a2a'; e.currentTarget.style.color = '#c94a2a' }}
            onMouseOut={(e)  => { e.currentTarget.style.borderColor = '#3a3530'; e.currentTarget.style.color = '#9a8f85' }}
          >✕</button>
        </div>

        {f && (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

            <div>
              <label style={lbl}>Title *</label>
              <input type="text" value={f.title} onChange={(e) => upd('title', e.target.value)}
                style={{ ...inputBase, border: errs.title ? '1.5px solid #c0392b' : '1.5px solid #ddd4cb', background: errs.title ? '#fff5f5' : '#fff' }} />
              {errs.title && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 3 }}>{errs.title}</div>}
            </div>

            <div>
              <label style={lbl}>Amount ($) *</label>
              <input type="number" min="1" step="1" value={f.amount} onChange={(e) => upd('amount', e.target.value)}
                style={{ ...inputBase, border: errs.amount ? '1.5px solid #c0392b' : '1.5px solid #ddd4cb', background: errs.amount ? '#fff5f5' : '#fff' }} />
              {errs.amount && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 3 }}>{errs.amount}</div>}
            </div>

            <div>
              <label style={lbl}>Category</label>
              <select value={f.cat} onChange={(e) => upd('cat', e.target.value)} style={{ ...inputBase, cursor: 'pointer' }}>
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={lbl}>Date</label>
              <input type="date" value={f.date} onChange={(e) => upd('date', e.target.value)} style={inputBase} />
            </div>

            <div>
              <label style={lbl}>Note <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <input type="text" placeholder="Optional note" value={f.note} onChange={(e) => upd('note', e.target.value)} style={inputBase} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 8, paddingTop: 14, borderTop: '1px solid #f0ebe4' }}>
              <button type="button" onClick={handleSave}
                style={{ flex: 2, padding: '11px 0', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#c94a2a', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#a83a1e'}
                onMouseOut={(e)  => e.currentTarget.style.background = '#c94a2a'}
              >Save Changes</button>

              <button type="button" onClick={() => { onDel(expense.id); onClose() }}
                style={{ flex: 1, padding: '11px 0', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', border: '1.5px solid #c0392b', color: '#c0392b', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#c0392b'; e.currentTarget.style.color = '#fff' }}
                onMouseOut={(e)  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c0392b' }}
              >Delete</button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
