export const CATS = [
  'Food & Drink', 'Transport', 'Housing', 'Health',
  'Entertainment', 'Subscriptions', 'Shopping', 'Education', 'Other',
]

export const KW = [
  { words: ['uber','lyft','taxi','bus','train','gas','petrol','parking','toll'], cat: 'Transport' },
  { words: ['coffee','cafe','lunch','dinner','breakfast','pizza','burger','restaurant','food','grocery'], cat: 'Food & Drink' },
  { words: ['netflix','spotify','hulu','disney','subscription','apple music','patreon'], cat: 'Subscriptions' },
  { words: ['rent','mortgage','electricity','water','internet','utilities','wifi'], cat: 'Housing' },
  { words: ['doctor','dentist','pharmacy','medicine','gym','fitness','therapy'], cat: 'Health' },
  { words: ['movie','cinema','concert','game','steam','playstation','xbox'], cat: 'Entertainment' },
  { words: ['amazon','shopping','clothes','shoes','mall','walmart','target'], cat: 'Shopping' },
  { words: ['course','udemy','school','tuition','textbook','class','workshop'], cat: 'Education' },
]

export const TMPLS = [
  {name: 'Coffee',    title: 'Morning Coffee',    amt: 5,  cat: 'Food & Drink',  note: 'Daily coffee'  },
  { name: 'Gas',       title: 'Gas Fill-up',       amt: 40, cat: 'Transport',     note: 'Weekly fuel'   },
  { name: 'Lunch',     title: 'Lunch',             amt: 12, cat: 'Food & Drink',  note: 'Weekday lunch' },
  { name: 'Stream',    title: 'Streaming Service', amt: 15, cat: 'Subscriptions', note: 'Monthly sub'   },
]
