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

// Ajout des couleurs pour chaque statut
const STATUS_STYLES: Record<keyof typeof OrderStatus, { bg: string, text: string, darkBg: string, darkText: string }> = {
  awaiting_shipment: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    darkBg: 'dark:bg-yellow-900/20',
    darkText: 'dark:text-yellow-400'
  },
  shipped: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    darkBg: 'dark:bg-blue-900/20',
    darkText: 'dark:text-blue-400'
  },
  fulfilled: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    darkBg: 'dark:bg-green-900/20',
    darkText: 'dark:text-green-400'
  },
}

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
  const currentStyle = STATUS_STYLES[orderStatus]

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
          className={cn(
            'w-52 flex justify-between items-center',
            currentStyle.bg,
            currentStyle.text,
            currentStyle.darkBg,
            currentStyle.darkText,
            'border-0'
          )}>
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52 p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'>
        {Object.entries(OrderStatus).map(([status, label]) => {
          const style = STATUS_STYLES[status as keyof typeof OrderStatus]
          return (
            <DropdownMenuItem
              key={status}
              className={cn(
                'flex items-center gap-2 p-3 cursor-pointer transition-colors',
                orderStatus === status ? [style.bg, style.text, style.darkBg, style.darkText] : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              onClick={() => mutate({ id, newStatus: status as keyof typeof OrderStatus })}>
              <Check
                className={cn(
                  'h-4 w-4',
                  orderStatus === status ? 'opacity-100' : 'opacity-0',
                  style.text,
                  style.darkText
                )}
              />
              <span className={cn(
                'text-sm font-medium',
                orderStatus === status ? [style.text, style.darkText] : 'text-gray-900 dark:text-gray-100'
              )}>
                {label}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
