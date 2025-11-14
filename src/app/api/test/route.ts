import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany()
    return NextResponse.json({ success: true, transactions })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: (error as Error).message })
  }
}
