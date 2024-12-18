import { constructMetadata } from '@/lib/utils'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export const metadata = constructMetadata({
  title: 'Politique de confidentialité',
  description: 'Découvrez comment nous protégeons vos données personnelles.'
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        </div>

        <MaxWidthWrapper className="relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Politique de{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  confidentialité
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">1. Collecte des données</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Utilisation des données</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Vos données sont utilisées exclusivement pour traiter vos commandes et améliorer votre expérience.
              </p>

              <h2 className="text-2xl font-bold mb-6">3. Protection des données</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nous mettons en œuvre toutes les mesures nécessaires pour protéger vos données personnelles.
              </p>

              {/* ... autres sections ... */}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
} 