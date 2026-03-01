import { useState, useMemo } from 'react'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])

  const spent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )

  const addExpense = (exp) => setExpenses((prev) => [exp, ...prev])

  const saveEdit = (updated) =>
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))

  const delExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  return { expenses, spent, addExpense, saveEdit, delExpense }
}
