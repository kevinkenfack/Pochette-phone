import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    console.log('🔔 Webhook reçu')
    console.log('Signature:', signature)

    if (!signature) {
      console.log('❌ Pas de signature')
      return new Response('Invalid signature', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log('✅ Event reçu:', event.type)

    if (event.type === 'checkout.session.completed') {
      console.log('💰 Paiement complété')
      console.log('Session:', event.data.object)
      
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address
      const phoneNumber = session.customer_details?.phone || session.shipping_details?.phone

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
              phoneNumber: phoneNumber,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      })

      await resend.emails.send({
        from: 'CaseCobra <noreply@kevinkenfack.com>',
        to: [event.data.object.customer_details.email],
        subject: 'Votre commande CaseCobra est confirmée ! 🎉',
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state,
          },
        }),
      })
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    console.error('❌ Erreur webhook:', err)
    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    )
  }
}
