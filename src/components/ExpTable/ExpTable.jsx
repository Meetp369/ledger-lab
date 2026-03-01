import { useState, useMemo } from 'react'
import { CATS } from '../../constants'
import ExpRow from './ExpRow'

export default function ExpTable({ expenses, onEdit, onDel, activeId }) {
  const [filter,  setFilter]  = useState('All')
  const [sortCol, setSortCol] = useState('date')
  const [asc,     setAsc]     = useState(false)

  const rows = useMemo(() => {
    let list = filter === 'All' ? [...expenses] : expenses.filter((e) => e.cat === filter)
    list.sort((a, b) => {
      const va = sortCol === 'date' ? a.date : a.amount
      const vb = sortCol === 'date' ? b.date : b.amount
      const c  = va < vb ? -1 : va > vb ? 1 : 0
      return asc ? c : -c
    })
    return list
  }, [expenses, filter, sortCol, asc])

  function sortBy(col) {
    if (sortCol === col) setAsc((a) => !a)
    else { setSortCol(col); setAsc(false) }
  }

  const ico = (c) => sortCol === c ? (asc ? ' ↑' : ' ↓') : ' ⇅'

  const th = {
    padding: '10px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.12em', color: '#9a8f85', textAlign: 'left',
    background: '#f1ede8', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd4cb',
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a706a' }}>Filter:</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '7px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #ddd4cb', background: '#fff', color: '#1a1714', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}>
            <option value="All">All Categories</option>
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <span style={{ fontSize: 11, color: '#9a8f85' }}>{rows.length} record{rows.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ border: '1px solid #ddd4cb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={{ ...th, cursor: 'pointer', userSelect: 'none' }} onClick={() => sortBy('amount')}>Amount{ico('amount')}</th>
              <th style={{ ...th, cursor: 'pointer', userSelect: 'none' }} onClick={() => sortBy('date')}>Date{ico('date')}</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0
              ? <tr><td colSpan={5} style={{ padding: '50px 20px', textAlign: 'center', color: '#9a8f85', fontSize: 13, background: '#fff' }}>No expenses yet - add your first one!</td></tr>
              : rows.map((exp) => <ExpRow key={exp.id} exp={exp} active={exp.id === activeId} onEdit={onEdit} onDel={onDel} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
