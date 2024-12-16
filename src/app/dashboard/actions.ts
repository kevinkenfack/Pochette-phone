"use server"

import { db } from '@/db'
import { OrderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: OrderStatus
}) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  })
}

export const getOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      user: true,
      configuration: true,
      shippingAddress: true,
      billingAddress: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return orders
}

export const findOrderById = async (orderId: string) => {
  try {
    const order = await db.order.findFirst({
      where: {
        id: orderId,
        isPaid: true,
      },
      include: {
        user: true,
        configuration: true,
        shippingAddress: true,
        billingAddress: true,
      },
    })
    return order
  } catch (error) {
    console.error('Erreur recherche commande:', error)
    return null
  }
}
