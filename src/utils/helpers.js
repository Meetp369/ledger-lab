import { KW } from '../constants'

let _n = 1
export const uid = () => 'id' + (++_n) + Math.random().toString(36).slice(2, 6)

export const today = () => new Date().toISOString().slice(0, 10)

export const usd = (n) => '$' + Number(n || 0).toLocaleString('en-US')

export const blank = () => ({ title: '', amount: '', cat: 'Other', date: today(), note: '' })


export const hint = (title) => {
  const l = title.toLowerCase()
  for (const { words, cat } of KW)
    if (words.some((w) => l.includes(w))) return cat
  return null
}

export const inputBase = {
  display: 'block',
  width: '100%',
  padding: '9px 11px',
  fontSize: 13,
  color: '#1a1714',
  fontFamily: 'inherit',
  borderRadius: 6,
  border: '1.5px solid #ddd4cb',
  background: '#ffffff',
  outline: 'none',
  boxSizing: 'border-box',
}
