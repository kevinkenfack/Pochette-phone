'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in to view this page.')
  }

  try {
    console.log('Checking payment status for order:', orderId)
    
    const order = await db.order.findFirst({
      where: { id: orderId, userId: user.id },
      include: {
        billingAddress: true,
        configuration: true,
        shippingAddress: true,
        user: true,
      },
    })

    console.log('Order found:', order)

    if (!order) {
      console.log('Order not found')
      throw new Error('This order does not exist.')
    }

    if (order.isPaid) {
      console.log('Order is paid')
      return order
    } else {
      console.log('Order is not paid yet')
      return false
    }
  } catch (error) {
    console.error('Error checking payment status:', error)
    throw error
  }
}
