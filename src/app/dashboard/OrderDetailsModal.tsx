'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatPrice } from '@/lib/utils'
import { Order } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { Eye, FileDown, Info } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'

interface OrderDetailsModalProps {
  order: Order & {
    user: any
    configuration: any
    shippingAddress: any
    billingAddress: any
  }
}

const OrderDetailsModal = ({ order }: OrderDetailsModalProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(order.configuration.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `design-${order.id.slice(-6)}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(true)}>
          <Info className="w-4 h-4 mr-2" />
          Détails
        </Button>
        <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </Button>
      </div>

      {/* Modal des détails */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl w-[95%] p-6 my-8">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Info className="w-5 h-5" />
              Commande #{order.id.slice(-6)}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 mt-6">
            {/* Informations client et commande */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Client</h3>
                  <p className="mt-1">{order.user.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Produit</h3>
                  <p className="mt-1">iPhone {order.configuration.model}</p>
                  <p className="text-muted-foreground">
                    {order.configuration.color} - {order.configuration.finish}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Prix</h3>
                  <p className="mt-1">{formatPrice(order.amount)}</p>
                </div>
              </div>

              {/* Adresse de livraison */}
              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Adresse de livraison
                </h3>
                {order.shippingAddress && (
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.postalCode} {order.shippingAddress.city}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de l'aperçu */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl w-[95%] p-4 sm:p-6 my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-50 pb-4">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Aperçu de la coque
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-8">
            {/* Image originale */}
            <div className="order-2 md:order-1">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className="relative aspect-square">
                  <Image
                    src={order.configuration.imageUrl}
                    alt="Design original"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <Button 
                  className="w-full mt-3" 
                  variant="outline"
                  onClick={handleDownload}
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Télécharger l'image
                </Button>
              </div>
            </div>

            {/* Aperçu de la coque */}
            <div className="order-1 md:order-2">
              <div className="w-full max-w-[250px] sm:max-w-[280px] mx-auto">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                  <PhonePreview
                    croppedImageUrl={order.configuration.croppedImageUrl!}
                    color={order.configuration.color}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderDetailsModal 