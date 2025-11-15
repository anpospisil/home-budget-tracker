// src/app/transactions/page.tsx
import { prisma } from '@/lib/prisma'
import TransactionList from '@/app/components/TransactionList'

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Map dates to ISO strings
  const transactionsWithStrings = transactions.map((t) => ({
    ...t,
    date: t.date.toISOString(),
    createdAt: t.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionList transactions={transactionsWithStrings} />
    </div>
  )
}
