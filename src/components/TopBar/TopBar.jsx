import { usd } from '../../utils/helpers'

export default function TopBar({ budget, spent }) {
  const rem  = budget > 0 ? budget - spent : null
  const over = rem !== null && rem < 0

  return (
    <header style={{
      background: '#1a1714', borderBottom: '3px solid #c94a2a',
      padding: '0 20px', height: 58, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22, color: '#c94a2a' }}>◈</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: '0.04em', lineHeight: 1 }}>
            Ledger Lab
          </div>
          <div style={{ fontSize: 9, color: '#9a8f85', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Expense Tracker
          </div>
        </div>
      </div>

      {budget > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 14px', borderRadius: 10,
          border: over ? '1px solid #e05252' : '1px solid rgba(26,122,74,0.5)',
          background: over ? 'rgba(80,20,20,0.5)' : 'rgba(10,50,30,0.4)',
        }}>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9a8f85' }}>Budget</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{usd(budget)}</span>
          <span style={{
            fontSize: 11, padding: '2px 9px', borderRadius: 99, fontWeight: 600,
            color: over ? '#fca5a5' : '#6ee7b7',
            background: over ? 'rgba(127,29,29,0.5)' : 'rgba(6,78,59,0.5)',
          }}>
            {over ? `⚠ ${usd(Math.abs(rem))} over` : `${usd(rem)} left`}
          </span>
        </div>
      )}
    </header>
  )
}
