'use client'

import AddTransactionForm from '@/app/components/AddTransactionForm'

export default function AddPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Transaction</h1>
      <AddTransactionForm onSuccess={() => location.reload()} />
    </div>
  )
}
