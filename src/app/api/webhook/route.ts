import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/db'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const customer = await stripe.customers.retrieve(session.customer as string)
    const orderId = session.metadata?.orderId

    if (!orderId) {
      return new NextResponse('Order ID not found', { status: 400 })
    }

    try {
      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            update: {
              phoneNumber: customer.phone || undefined,
            }
          }
        }
      })
    } catch (error) {
      console.error('Error updating order:', error)
      return new NextResponse('Error updating order', { status: 500 })
    }
  }

  return new NextResponse(null, { status: 200 })
} 