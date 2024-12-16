import CTAButton from '@/components/CTAButton'
import { Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAFA] dark:bg-gray-950">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="relative">
            <Ghost className="h-24 w-24 text-green-600 dark:text-green-400" />
            <div className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-2" />
          </div>
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          <span className="relative">
            <span className="relative z-10">404</span>
            <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
          </span>
        </h1>
        
        <h2 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Page introuvable
        </h2>
        
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Désolé, la page que vous recherchez semble avoir disparu dans l&apos;espace.
        </p>

        <div className="mt-10">
          <CTAButton href="/" variant="primary">
            Retour à l&apos;accueil
          </CTAButton>
        </div>
      </div>
    </div>
  )
} 