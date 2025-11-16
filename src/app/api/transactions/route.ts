import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, transactions })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, amount, category, note, date } = body

    // Basic validation
    if (!type || !['income', 'expense'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 })
    }
    const parsedAmount = parseFloat(amount)
    if (Number.isNaN(parsedAmount)) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 })
    }

    const tx = await prisma.transaction.create({
      data: {
        type,
        amount: parsedAmount,
        category: category ?? 'Uncategorized',
        note: note ?? null,
        // Accept an ISO date string or fallback to now
        date: date ? new Date(date) : new Date(),
      },
    })

    return NextResponse.json({ success: true, transaction: tx }, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing transaction id' },
        { status: 400 }
      )
    }

    const tx = await prisma.transaction.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, transaction: tx },
      { status: 200 }
    )
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

