import OrderTracker from './OrderTracker'

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Suivre ma commande
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Entrez votre numéro de commande pour voir son statut
          </p>
        </div>

        <OrderTracker />
      </div>
    </div>
  )
} 