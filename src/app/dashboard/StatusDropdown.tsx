'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { changeOrderStatus } from './actions'
import { useRouter } from 'next/navigation'

const OrderStatus = {
  awaiting_shipment: 'En attente',
  fulfilled: 'Terminé',
  shipped: 'Expédié',
} as const

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: 'En attente',
  fulfilled: 'Terminé',
  shipped: 'Expédié',
}

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string
  orderStatus: keyof typeof OrderStatus
}) => {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-52 flex justify-between items-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'>
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52 p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'>
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
              {
                'bg-green-50 dark:bg-green-900/20': orderStatus === status,
              }
            )}
            onClick={() => mutate({ id, newStatus: status as keyof typeof OrderStatus })}>
            <Check
              className={cn(
                'h-4 w-4 text-green-600 dark:text-green-400',
                orderStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {LABEL_MAP[status as keyof typeof OrderStatus]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
