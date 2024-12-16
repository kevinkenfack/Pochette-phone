'use client'

import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, FINISHES, MODELS } from '@/validators/option-validator'
import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Check, Shield, Truck, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import LoginModal from '@/components/LoginModal'

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = configuration
  const { user } = useKindeBrowserClient()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  useEffect(() => setShowConfetti(true))

  const { color, model, finish, material } = configuration
  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
  const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!

  let totalPrice = BASE_PRICE
  if (material === 'polycarbonate') totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: async (data) => {
      try {
        console.log('Début de la création de session', data);
        const result = await createCheckoutSession(data);
        console.log('Résultat:', result);
        return result;
      } catch (error) {
        console.error('Erreur détaillée:', error);
        throw error;
      }
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
      else throw new Error('Unable to retrieve payment URL.')
    },
    onError: () => {
      toast({
        title: 'Une erreur est survenue',
        description: 'Veuillez réessayer ultérieurement.',
        variant: 'destructive',
      })
    },
  })

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({ configId: id })
    } else {
      localStorage.setItem('configurationId', id)
      setIsLoginModalOpen(true)
    }
  }

  const features = [
    { icon: Shield, label: "Garantie 5 ans" },
    { icon: Truck, label: "Livraison 48h" },
    { icon: Star, label: "Qualité premium" },
  ]

  return (
    <>
      <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className='mt-20 flex flex-col items-center md:grid md:grid-cols-12 gap-8 lg:gap-12'>
        {/* Aperçu de la coque */}
        <div className='md:col-span-5 lg:col-span-4'>
          <div className='sticky top-24'>
            <Phone
              className={cn(
                `bg-${tw}`,
                "w-full max-w-[280px] md:max-w-[320px] mx-auto",
                "transform transition-transform duration-300 hover:scale-105"
              )}
              imgSrc={configuration.croppedImageUrl!}
              dark={false}
            />
          </div>
        </div>

        {/* Détails et commande */}
        <div className='md:col-span-7 lg:col-span-8 w-full'>
          <div className='space-y-8'>
            {/* En-tête */}
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Votre coque {modelLabel}
              </h1>
              <div className='mt-3 flex items-center gap-1.5 text-green-600 dark:text-green-400'>
                <Check className='h-5 w-5' />
                <span className='font-medium'>En stock et prêt à être expédié</span>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className='grid grid-cols-3 gap-4'>
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className='flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800'>
                  <Icon className='h-6 w-6 text-green-600 dark:text-green-400 mb-2' />
                  <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>{label}</span>
                </div>
              ))}
            </div>

            {/* Détails du produit */}
            <div className='space-y-6 text-sm'>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-3'>Points forts</h3>
                <ul className='space-y-2 text-gray-600 dark:text-gray-300'>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-600' />
                    Compatible charge sans fil
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-600' />
                    Protection TPU anti-chocs
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-600' />
                    Emballage 100% recyclé
                  </li>
                </ul>
              </div>

              {/* Récapitulatif prix */}
              <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6'>
                <div className='space-y-3'>
                  <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                    <span>Prix de base</span>
                    <span className='font-medium text-gray-900 dark:text-white'>{formatPrice(BASE_PRICE / 100)}</span>
                  </div>

                  {finish === 'textured' && (
                    <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                      <span>Finition texturée</span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                      </span>
                    </div>
                  )}

                  {material === 'polycarbonate' && (
                    <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                      <span>Matériau polycarbonate</span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                      </span>
                    </div>
                  )}

                  <div className='pt-3 border-t border-gray-200 dark:border-gray-700'>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-gray-900 dark:text-white'>Total</span>
                      <span className='font-semibold text-gray-900 dark:text-white'>{formatPrice(totalPrice / 100)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton commander */}
              <Button
                onClick={handleCheckout}
                disabled={isPending}
                className='w-full py-6 text-base font-semibold'>
                {isPending ? 'Chargement...' : 'Commander maintenant'}
                <ArrowRight className='h-5 w-5 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
