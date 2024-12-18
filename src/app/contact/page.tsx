import ContactForm from './ContactForm'
import { constructMetadata } from '@/lib/utils'

export const metadata = constructMetadata({
  title: 'Contact',
  description: 'Contactez-nous pour toute question ou suggestion.'
})

export default function ContactPage() {
  return (
    <div className="container max-w-5xl py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Contactez{' '}
          <span className="relative">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
              nous
            </span>
            <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Une question ? N'hésitez pas à nous écrire !
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </div>
  )
} 