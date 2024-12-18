'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'

const STATUS_STYLES: Record<OrderStatus, { bg: string, text: string }> = {
  awaiting_shipment: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  shipped: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
  },
  fulfilled: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
  }
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_shipment: 'En attente',
  shipped: 'Expédiées',
  fulfilled: 'Terminées'
}

interface OrderFilterProps {
  selectedStatus: OrderStatus | 'all'
  onStatusChange: (status: OrderStatus | 'all') => void
}

export default function OrderFilter({ selectedStatus, onStatusChange }: OrderFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onStatusChange('all')}
        className={cn(
          'font-medium',
          selectedStatus === 'all'
            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
            : 'text-gray-500 dark:text-gray-400'
        )}
      >
        Toutes
      </Button>

      {Object.entries(STATUS_LABELS).map(([status, label]) => (
        <Button
          key={status}
          variant="outline"
          size="sm"
          onClick={() => onStatusChange(status as OrderStatus)}
          className={cn(
            'font-medium',
            selectedStatus === status
              ? [STATUS_STYLES[status as OrderStatus].bg, STATUS_STYLES[status as OrderStatus].text]
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  )
} 