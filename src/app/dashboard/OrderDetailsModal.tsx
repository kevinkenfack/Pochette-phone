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
import { Eye, FileDown, Info, Phone, Package, MapPin, Calendar, CreditCard } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'

interface OrderDetailsModalProps {
  order: Order & {
    user: any
    configuration: any
    shippingAddress: any
    billingAddress: any
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(date))
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsDetailsOpen(true)}
          className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <Info className="w-4 h-4 mr-2" />
          Détails
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsPreviewOpen(true)}
          className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </Button>
      </div>

      {/* Modal des détails */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl w-[95%] sm:w-[85%] md:w-[95%] p-0 
          my-2 sm:my-4 
          h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] 
          max-h-[500px] sm:max-h-none 
          flex flex-col 
          overflow-hidden
          rounded-lg
        ">
          {/* En-tête fixe - Réduit la taille */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 z-10 p-3 sm:p-4 border-b">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span>Commande #{order.id.slice(-6)}</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Contenu scrollable - Utilise flex-grow pour prendre l'espace restant */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-3 sm:p-4 space-y-4">
              {/* Statut et montant */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500">Statut de la commande</p>
                  <p className="text-sm sm:text-base font-medium text-green-600 dark:text-green-400">
                    {order.status === 'awaiting_shipment' ? 'En attente d\'expédition' :
                     order.status === 'shipped' ? 'Expédiée' :
                     order.status === 'fulfilled' ? 'Livrée' : 'Annulée'}
                  </p>
                </div>
                <div className="space-y-0.5 sm:space-y-1 text-right">
                  <p className="text-xs sm:text-sm text-gray-500">Montant total</p>
                  <p className="text-base sm:text-xl font-semibold text-green-600 dark:text-green-400">
                    {formatPrice(order.amount)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Informations client */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Client</h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p>{order.user.email}</p>
                        {order.shippingAddress?.phoneNumber && (
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {order.shippingAddress.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Détails produit */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Produit</h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p>iPhone {order.configuration.model}</p>
                        <p>Matériau : {order.configuration.material === 'silicone' ? 'Silicone' : 'Polycarbonate'}</p>
                        <p>Couleur : {order.configuration.color}</p>
                        <p>Finition : {order.configuration.finish === 'smooth' ? 'Lisse' : 'Texturée'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Adresse de livraison
                    </h3>
                    {order.shippingAddress && (
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.shippingAddress.name}
                        </p>
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

              {/* Timeline de commande */}
              <div className="pt-4 sm:pt-6 border-t">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
                  Historique de la commande
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-3">
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="absolute h-full top-8 left-4 border-l border-dashed border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="pb-8">
                      <p className="font-medium text-gray-900 dark:text-white">Commande créée</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  
                  {order.status !== 'awaiting_shipment' && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Commande expédiée</p>
                        <p className="text-sm text-gray-500">La commande a été expédiée</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de l'aperçu */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl w-[95%] sm:w-[85%] md:w-[95%] p-0 
          my-2 sm:my-4 
          h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] 
          max-h-[500px] sm:max-h-none
          flex flex-col 
          overflow-hidden
          rounded-lg
        ">
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 z-10 p-3 sm:p-4 border-b">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Eye className="w-4 h-4" />
                Aperçu de la coque
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex-grow overflow-y-auto">
            <div className="p-3 sm:p-4">
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
                        sizes="(max-width: 768px) 100vw, 50vw"
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
                  <div className="w-full max-w-[220px] sm:max-w-[280px] mx-auto">
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderDetailsModal 