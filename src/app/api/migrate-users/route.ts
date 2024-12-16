import { db } from '@/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const orders = await db.order.findMany({
      where: {
        user: {
          name: null
        }
      },
      include: {
        user: true,
        shippingAddress: true
      }
    })

    for (const order of orders) {
      if (order.shippingAddress?.name) {
        await db.user.update({
          where: { id: order.userId },
          data: {
            name: order.shippingAddress.name
          }
        })
      }
    }

    return NextResponse.json({ success: true, updated: orders.length })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ success: false, error: 'Migration failed' }, { status: 500 })
  }
} 