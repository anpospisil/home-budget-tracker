'use client'

import { useState } from 'react'

export default function AddTransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount, category, note }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'Unknown error')
      setAmount('')
      setCategory('')
      setNote('')
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="bg-white p-4 rounded shadow-sm space-y-3" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            checked={type === 'income'}
            onChange={() => setType('income')}
            className="accent-green-500"
          />
          <span className="text-sm">Income</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
            className="accent-red-500"
          />
          <span className="text-sm">Expense</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (e.g. 12.50)"
          className="p-2 border rounded"
          inputMode="decimal"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g. Groceries)"
          className="p-2 border rounded"
        />
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note (optional)"
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}
