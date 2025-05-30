'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { findOrderById } from '../dashboard/actions'
import OrderStatus from './OrderStatus'
import { useSearchParams } from 'next/navigation'

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  
  // Récupérer l'orderId depuis l'URL
  const searchParams = useSearchParams()
  const orderIdFromUrl = searchParams.get('orderId')

  // Effectuer la recherche automatiquement si orderId est dans l'URL
  useEffect(() => {
    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl)
      handleSearch(undefined, orderIdFromUrl)
    }
  }, [orderIdFromUrl])

  const handleSearch = async (e?: React.FormEvent, searchOrderId?: string) => {
    if (e) e.preventDefault()
    
    const idToSearch = searchOrderId || orderId
    if (!idToSearch.trim()) return

    setIsSearching(true)
    setError('')
    setOrder(null)

    try {
      const result = await findOrderById(idToSearch)
      if (result) {
        setOrder(result)
      } else {
        setError('Aucune commande trouvée avec cet identifiant')
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la recherche')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Entrez votre numéro de commande..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full text-sm sm:text-base"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSearching}
          className="w-full sm:w-auto"
        >
          <Search className="w-4 h-4 mr-2" />
          {isSearching ? 'Recherche...' : 'Suivre'}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-xs sm:text-sm">
          {error}
        </div>
      )}

      {order && <OrderStatus order={order} />}
    </div>
  )
} 