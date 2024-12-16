import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { formatPrice } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import StatusDropdown from './StatusDropdown'
import { Button } from '@/components/ui/button'
import OrderDetailsModal from './OrderDetailsModal'
import OrderSearch from './OrderSearch'

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
      user: true,
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

          <div className='overflow-x-auto'>
            <div className='min-w-[800px] bg-white dark:bg-gray-800 rounded-xl border'>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Adresse</TableHead>
                    <TableHead className="font-semibold">Produit</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="font-semibold">Montant</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow 
                      key={order.id} 
                      className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      {/* Colonne Client */}
                      <TableCell className="min-w-[200px]">
                        <div className="space-y-1">
                          <div className="font-medium truncate">{order.user.email}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="font-mono">#{order.id.slice(-6)}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      
                      {/* Colonne Adresse */}
                      <TableCell className="min-w-[200px]">
                        <div className="space-y-1">
                          <div className="font-medium">{order.shippingAddress?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.shippingAddress?.city}, {order.shippingAddress?.country}
                          </div>
                        </div>
                      </TableCell>
                      
                      {/* Colonne Produit */}
                      <TableCell className="min-w-[180px]">
                        <div className="space-y-1">
                          <div className="font-medium">iPhone {order.configuration.model}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.configuration.material} - {order.configuration.color}
                          </div>
                        </div>
                      </TableCell>
                      
                      {/* Colonne Statut */}
                      <TableCell className="min-w-[150px]">
                        <StatusDropdown id={order.id} orderStatus={order.status} />
                      </TableCell>
                      
                      {/* Colonne Montant */}
                      <TableCell className="min-w-[100px]">
                        <div className="font-medium text-green-600 dark:text-green-400">
                          {formatPrice(order.amount)}
                        </div>
                      </TableCell>
                      
                      {/* Colonne Actions */}
                      <TableCell className="w-[100px]">
                        <OrderDetailsModal order={order} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
