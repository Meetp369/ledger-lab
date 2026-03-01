import { useState } from 'react'
import { useExpenses } from './hooks/useExpenses'
import TopBar      from './components/TopBar/TopBar'
import BudgetPanel from './components/BudgetPanel/BudgetPanel'
import QuickAdd    from './components/QuickAdd/QuickAdd'
import AddForm     from './components/AddForm/AddForm'
import Summary     from './components/Summary/Summary'
import ExpTable    from './components/ExpTable/ExpTable'
import EditDrawer  from './components/EditDrawer/EditDrawer'

export default function App() {
  const { expenses, spent, addExpense, saveEdit, delExpense } = useExpenses()

  const [budget,  setBudget]  = useState(0)
  const [editing, setEditing] = useState(null)   
  const [seed,    setSeed]    = useState(null)  
  const [seedVer, setSeedVer] = useState(0)     

  function pickTemplate(tpl) {
    setSeed(tpl)
    setSeedVer((v) => v + 1)
  }

  function handleDel(id) {
    delExpense(id)
    if (editing?.id === id) setEditing(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0eb' }}>
      <TopBar budget={budget} spent={spent} />

      <div style={{ display: 'flex', height: 'calc(100vh - 61px)', overflow: 'hidden' }}>

        <aside style={{ width: 310, minWidth: 310, background: '#ede8e2', borderRight: '1px solid #ddd4cb', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          <BudgetPanel budget={budget} spent={spent} onSet={setBudget} />
          <QuickAdd onPick={pickTemplate} />
          <AddForm key={seedVer} seed={seed} onAdd={addExpense} />
          <Summary expenses={expenses} budget={budget} spent={spent} />
        </aside>

        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <ExpTable
            expenses={expenses}
            onEdit={setEditing}
            onDel={handleDel}
            activeId={editing?.id}
          />
        </main>
      </div>

      <EditDrawer
        expense={editing}
        onClose={() => setEditing(null)}
        onSave={saveEdit}
        onDel={handleDel}
      />
    </div>
  )
}
