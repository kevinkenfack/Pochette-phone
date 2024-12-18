import { constructMetadata } from '@/lib/utils'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export const metadata = constructMetadata({
  title: 'Politique des cookies',
  description: 'Informations sur l\'utilisation des cookies sur notre site.'
})

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        </div>

        <MaxWidthWrapper className="relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Politique des{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  cookies
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou téléphone mobile) lors de la visite d'un site web.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Pourquoi utilisons-nous des cookies ?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Les cookies nous permettent de :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Mémoriser vos préférences</li>
                <li>Mesurer l'audience de notre site</li>
                <li>Sécuriser vos transactions</li>
                <li>Personnaliser votre expérience</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">3. Types de cookies utilisés</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nous utilisons différents types de cookies :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Cookies essentiels au fonctionnement du site</li>
                <li>Cookies analytiques</li>
                <li>Cookies de personnalisation</li>
                <li>Cookies publicitaires</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">4. Gestion des cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Vous pouvez à tout moment choisir de désactiver ces cookies. Vous pouvez le faire à travers les paramètres de votre navigateur.
              </p>

              <h2 className="text-2xl font-bold mb-6">5. Durée de conservation</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Les cookies ont une durée de vie limitée qui varie selon leur type :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Cookies de session : supprimés à la fermeture du navigateur</li>
                <li>Cookies persistants : maximum 13 mois</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">6. Mise à jour</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nous nous réservons le droit de modifier cette politique de cookies à tout moment. La date de dernière mise à jour sera toujours indiquée en bas de cette page.
              </p>

              <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dernière mise à jour : {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
} 