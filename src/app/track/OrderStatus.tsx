import { formatPrice } from '@/lib/utils'
import { Package, Truck, CheckCircle } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'

const steps = [
  { id: 'awaiting_shipment', label: 'En préparation', icon: Package },
  { id: 'shipped', label: 'Expédié', icon: Truck },
  { id: 'fulfilled', label: 'Livré', icon: CheckCircle },
]

export default function OrderStatus({ order }: { order: any }) {
  const currentStepIndex = steps.findIndex(step => step.id === order.status)

  return (
    <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
      {/* En-tête avec infos client */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Commande #{order.id.slice(-6)}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Passée le {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Montant total</div>
          <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {formatPrice(order.amount)}
          </div>
        </div>
      </div>

      {/* Informations client */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Client
            </h4>
            <div className="mt-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {order.shippingAddress?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {order.user.email}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Adresse de livraison
            </h4>
            <div className="mt-1 text-sm text-gray-900 dark:text-white">
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.postalCode} {order.shippingAddress?.city}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative py-4 sm:py-6">
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-6 sm:space-y-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex w-1/2 pr-4 sm:pr-8 justify-end">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {step.label}
                  </div>
                </div>
                <div className="relative flex h-6 sm:h-8 w-6 sm:w-8 items-center justify-center">
                  <div
                    className={`h-6 sm:h-8 w-6 sm:w-8 rounded-full border-2 flex items-center justify-center ${
                      isCompleted
                        ? 'border-green-600 bg-green-600 dark:border-green-500 dark:bg-green-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Icon className={`h-3 sm:h-4 w-3 sm:w-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                </div>
                <div className="w-1/2 pl-4 sm:pl-8">
                  {isCurrent && (
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {order.status === 'fulfilled' ? 'Livraison effectuée ✅' : 'En cours'}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Aperçu de la commande */}
      <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <div className="w-full max-w-[150px] sm:max-w-[200px]">
            <PhonePreview
              croppedImageUrl={order.configuration.croppedImageUrl}
              color={order.configuration.color}
            />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
              iPhone {order.configuration.model}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {order.configuration.color} - {order.configuration.finish}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 