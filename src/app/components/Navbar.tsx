'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800">Home Budget Tracker</h1>
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
            Dashboard
          </Link>
          <Link href="/transactions" className="text-gray-600 hover:text-gray-800">
            Transactions
          </Link>
          <Link href="/add" className="text-gray-600 hover:text-gray-800">
            Add Transaction
          </Link>
        </div>
      </div>
    </nav>
  )
}
