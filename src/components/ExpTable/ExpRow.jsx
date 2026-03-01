import { useState } from 'react'
import { usd } from '../../utils/helpers'

export default function ExpRow({ exp, active, onEdit, onDel }) {
  const [hov, setHov] = useState(false)
  const td = { padding: '11px 12px', borderBottom: '1px solid #f0ebe4', verticalAlign: 'middle' }

  return (
    <tr
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onEdit(exp)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onEdit(exp)}
      style={{ cursor: 'pointer', background: active ? '#fdf0ec' : hov ? '#faf7f4' : '#fff', borderLeft: active ? '3px solid #c94a2a' : '3px solid transparent', transition: 'background 0.1s' }}
    >
      <td style={{ ...td, maxWidth: 180 }}>
        <div style={{ fontWeight: 600, color: '#1a1714', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.title}</div>
        {exp.note && <div style={{ fontSize: 10, color: '#9a8f85', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.note}</div>}
      </td>

      <td style={td}>
        <span style={{ background: '#f1ede8', border: '1px solid #ddd4cb', borderRadius: 99, padding: '2px 9px', fontSize: 10, color: '#5a5550' }}>{exp.cat}</span>
      </td>

      <td style={{ ...td, fontWeight: 700, color: '#c94a2a', fontSize: 14, whiteSpace: 'nowrap' }}>{usd(exp.amount)}</td>

      <td style={{ ...td, fontSize: 11, color: '#9a8f85', whiteSpace: 'nowrap' }}>{exp.date}</td>

      <td style={td}>
        <div style={{ display: 'flex', gap: 5, opacity: hov ? 1 : 0, transition: 'opacity 0.15s' }}>
          <IconBtn title="Edit"   color="#c94a2a" onClick={(e) => { e.stopPropagation(); onEdit(exp) }}>✎</IconBtn>
          <IconBtn title="Delete" color="#c0392b" onClick={(e) => { e.stopPropagation(); onDel(exp.id) }}>✕</IconBtn>
        </div>
      </td>
    </tr>
  )
}

function IconBtn({ children, onClick, title, color }) {
  return (
    <button type="button" title={title} onClick={onClick}
      style={{ background: 'none', border: '1px solid #ddd4cb', borderRadius: 5, padding: '4px 8px', cursor: 'pointer', fontSize: 13, color: '#7a706a', fontFamily: 'inherit' }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color }}
      onMouseOut={(e)  => { e.currentTarget.style.borderColor = '#ddd4cb'; e.currentTarget.style.color = '#7a706a' }}
    >{children}</button>
  )
}
