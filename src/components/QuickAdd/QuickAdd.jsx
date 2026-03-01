import { TMPLS } from '../../constants'
import { usd } from '../../utils/helpers'

export default function QuickAdd({ onPick }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd4cb', borderRadius: 10, padding: 16 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
        color: '#9a8f85', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0ebe4',
      }}>Quick Add</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {TMPLS.map((t) => <TplBtn key={t.name} tpl={t} onPick={onPick} />)}
      </div>
    </div>
  )
}

function TplBtn({ tpl, onPick }) {
  return (
    <button type="button" onClick={() => onPick(tpl)}
      style={{
        textAlign: 'left', padding: '10px 12px', borderRadius: 8,
        cursor: 'pointer', fontFamily: 'inherit', display: 'block',
        background: '#f5f0eb', border: '1px solid #ddd4cb', transition: 'all 0.14s',
      }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#c94a2a'; e.currentTarget.style.background = '#fdf0ec' }}
      onMouseOut={(e)  => { e.currentTarget.style.borderColor = '#ddd4cb'; e.currentTarget.style.background = '#f5f0eb' }}
    >
      <div style={{ fontSize: 11, color: '#7a706a' }}>{tpl.icon} {tpl.name}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#c94a2a', marginTop: 2 }}>{usd(tpl.amt)}</div>
    </button>
  )
}
