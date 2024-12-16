import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      {/* Hero Section avec le même style que la page principale */}
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        </div>

        <MaxWidthWrapper className="relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Conditions{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  d'utilisation
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Les présentes conditions générales d'utilisation régissent l'utilisation de notre service de personnalisation de coques de téléphone.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Services proposés</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nous proposons un service de création et de personnalisation de coques de protection pour smartphones.
              </p>

              <h2 className="text-2xl font-bold mb-6">3. Propriété intellectuelle</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Les utilisateurs sont responsables des images qu'ils téléchargent et garantissent disposer des droits nécessaires.
              </p>

              {/* ... autres sections ... */}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
} 