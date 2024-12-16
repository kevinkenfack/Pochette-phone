'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { findOrderById } from './actions'
import OrderDetailsModal from './OrderDetailsModal'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const OrderSearch = () => {
  const [orderId, setOrderId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setIsSearching(true)
    setError('')
    setOrder(null)

    try {
      const result = await findOrderById(orderId)
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
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Rechercher une commande</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Entrez le numéro de commande pour voir les détails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Entrez le numéro de commande..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSearching}
            className="w-full sm:w-auto"
          >
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? 'Recherche...' : 'Rechercher'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-medium">Commande trouvée !</h3>
                <p className="text-sm text-muted-foreground">
                  Client : {order.user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Produit : iPhone {order.configuration.model}
                </p>
              </div>
              <OrderDetailsModal order={order} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OrderSearch 