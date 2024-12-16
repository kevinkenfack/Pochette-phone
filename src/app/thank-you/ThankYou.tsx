'use client'

import { useQuery } from '@tanstack/react-query'
import { getPaymentStatus } from './actions'
import { useSearchParams } from 'next/navigation'
import { Check, Loader2, Package, Truck } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'
import { formatPrice } from '@/lib/utils'
import CTAButton from '@/components/CTAButton'

const ThankYou = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: 5,
    retryDelay: 2000,
    staleTime: 2000,
  })

  if (data === undefined) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-green-600' />
          <h3 className='font-semibold text-xl'>Chargement de votre commande...</h3>
          <p className='text-gray-500'>Cela ne prendra qu'un instant.</p>
        </div>
      </div>
    )
  }

  if (data === false) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-green-600' />
          <h3 className='font-semibold text-xl'>Vérification du paiement...</h3>
          <p className='text-gray-500'>Cela peut prendre un moment.</p>
        </div>
      </div>
    )
  }

  const { configuration, billingAddress, shippingAddress, amount } = data
  const { color } = configuration

  return (
    <div className='bg-[#FAFAFA] dark:bg-gray-950 min-h-screen'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <div className='inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium'>
            <Check className='h-4 w-4' />
            Commande confirmée
          </div>
          
          <h1 className='mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>
            Votre coque est{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                en route
              </span>
              <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
            </span>
            !
          </h1>
          
          <p className='mt-4 text-base text-gray-600 dark:text-gray-300'>
            Nous avons bien reçu votre commande et la préparons avec soin.
          </p>

          <div className='mt-12 text-sm font-medium'>
            <p className='text-gray-900 dark:text-white'>Numéro de commande</p>
            <p className='mt-2 text-green-600 dark:text-green-400 font-mono'>{orderId}</p>
          </div>
        </div>

        {/* Étapes de livraison */}
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
            <div className='flex gap-4'>
              <Package className='h-6 w-6 text-green-600 dark:text-green-400' />
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white'>Préparation</h3>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Votre coque est en cours de fabrication avec le plus grand soin.
                </p>
              </div>
            </div>
          </div>
          
          <div className='rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
            <div className='flex gap-4'>
              <Truck className='h-6 w-6 text-green-600 dark:text-green-400' />
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white'>Livraison</h3>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Livraison prévue sous 48h via DHL.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Aperçu de la coque */}
        <div className='mt-10 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
          <h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
            Votre création
          </h4>
          <div className='flex justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4'>
            <PhonePreview
              croppedImageUrl={configuration.croppedImageUrl!}
              color={color!}
              className="w-full max-w-[300px] md:max-w-[340px]"
            />
          </div>
        </div>

        {/* Adresses */}
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
            <p className='font-medium text-gray-900 dark:text-white'>Adresse de livraison</p>
            <address className='mt-3 text-sm text-gray-600 dark:text-gray-300 not-italic'>
              <p className='font-medium'>{shippingAddress?.name}</p>
              <p>{shippingAddress?.street}</p>
              <p>{shippingAddress?.postalCode} {shippingAddress?.city}</p>
            </address>
          </div>

          <div className='rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
            <p className='font-medium text-gray-900 dark:text-white'>Adresse de facturation</p>
            <address className='mt-3 text-sm text-gray-600 dark:text-gray-300 not-italic'>
              <p className='font-medium'>{billingAddress?.name}</p>
              <p>{billingAddress?.street}</p>
              <p>{billingAddress?.postalCode} {billingAddress?.city}</p>
            </address>
          </div>
        </div>

        {/* Récapitulatif */}
        <div className='mt-10 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800'>
          <div className='space-y-4'>
            <div className='flex justify-between text-sm'>
              <p className='text-gray-600 dark:text-gray-300'>Sous-total</p>
              <p className='font-medium text-gray-900 dark:text-white'>{formatPrice(amount)}</p>
            </div>
            <div className='flex justify-between text-sm'>
              <p className='text-gray-600 dark:text-gray-300'>Livraison</p>
              <p className='font-medium text-gray-900 dark:text-white'>{formatPrice(0)}</p>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <p className='text-gray-900 dark:text-white'>Total</p>
              <p className='text-green-600 dark:text-green-400'>{formatPrice(amount)}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className='mt-10 flex justify-center'>
          <CTAButton href='/' variant='secondary'>
            Retour à l'accueil
          </CTAButton>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vous pourrez suivre votre commande à tout moment avec votre numéro de commande
          </p>
          <CTAButton href={`/track?orderId=${orderId}`} variant="secondary">
            Suivre ma commande
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
