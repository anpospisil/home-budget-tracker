import { prisma } from '@/lib/ prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const transactions = await prisma.transaction.findMany()
  return NextResponse.json({ transactions })
}
