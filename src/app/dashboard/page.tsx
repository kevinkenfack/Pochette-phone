import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { db } from '@/db'
import { formatPrice } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import OrderSearch from './OrderSearch'
import DashboardContent from './DashboardContent'
import { constructMetadata } from '@/lib/utils'

export const metadata = constructMetadata({
  title: 'Dashboard',
  description: 'Gérez vos commandes et suivez vos statistiques.'
})

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        }
      },
      configuration: true,
      shippingAddress: true,
      billingAddress: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 2500

  return (
    <div className='flex min-h-screen w-full bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl w-full mx-auto flex flex-col gap-6 p-4 md:p-8'>
        <div className='flex flex-col gap-12'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
              <CardHeader className='pb-2'>
                <CardDescription className='text-gray-500 dark:text-gray-400'>
                  Cette semaine
                </CardDescription>
                <CardTitle className='text-4xl font-bold text-gray-900 dark:text-white'>
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Objectif : {formatPrice(WEEKLY_GOAL)}
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                  className='bg-gray-200 dark:bg-gray-700'
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Month</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <OrderSearch />

          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
            Commandes en cours
          </h1>

          <DashboardContent orders={orders} />
        </div>
      </div>
    </div>
  )
}

export default Page
