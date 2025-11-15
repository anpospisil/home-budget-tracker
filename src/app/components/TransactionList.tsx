'use client'

import React from 'react'

type Tx = {
  id: number
  type: 'income' | 'expense' | string
  amount: number
  category: string
  note?: string | null
  date: string
  createdAt: string
}

export default function TransactionList({ transactions }: { transactions: Tx[] }) {
  if (!transactions.length) {
    return <div className="p-4 bg-white rounded shadow">No transactions yet.</div>
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
        >
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-medium">{t.category}</span>
              <span className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
            </div>
            {t.note && <div className="text-sm text-gray-600">{t.note}</div>}
          </div>

          <div className="text-right">
            <div className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
              {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
