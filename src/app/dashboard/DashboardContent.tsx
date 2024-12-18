'use client'

import { useState } from 'react'
import { OrderStatus } from '@prisma/client'
import OrderFilter from './OrderFilter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StatusDropdown from './StatusDropdown'
import OrderDetailsModal from './OrderDetailsModal'
import { formatPrice } from '@/lib/utils'

export default function DashboardContent({ orders }: { orders: any[] }) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'all' ? true : order.status === selectedStatus
  )

  return (
    <>
      <OrderFilter 
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <div className='overflow-x-auto'>
        <div className='min-w-[800px] bg-white dark:bg-gray-800 rounded-xl border'>
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50 hover:bg-green-50/80 dark:bg-green-900/20 dark:hover:bg-green-900/30">
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Client</TableHead>
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Adresse</TableHead>
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Produit</TableHead>
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Statut</TableHead>
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Montant</TableHead>
                <TableHead className="font-semibold text-green-800 dark:text-green-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* Colonne Client */}
                  <TableCell className="min-w-[200px]">
                    <div className="space-y-1">
                      {order.user.name && (
                        <div className="font-medium text-gray-900 dark:text-white">
                          {order.user.name}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">{order.user.email}</div>
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
    </>
  )
} 