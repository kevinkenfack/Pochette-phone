'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAuthStatus } from './actions'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configurationId)
  }, [])

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    if (configId) {
      localStorage.removeItem('configurationId')
      router.push(`/configure/preview?id=${configId}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className='min-h-screen bg-[#FAFAFA] dark:bg-gray-950 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Carte de connexion */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-800'>
          {/* Icône et titre */}
          <div className='flex flex-col items-center'>
            <div className='bg-green-50 dark:bg-green-900/30 p-3 rounded-full'>
              <Lock className='h-6 w-6 text-green-600 dark:text-green-400' />
            </div>
            
            <h3 className='mt-4 text-xl font-semibold text-gray-900 dark:text-white'>
              Connexion en cours
            </h3>
            
            {/* Loader et message */}
            <div className='mt-6 flex flex-col items-center gap-3'>
              <Loader2 className='h-8 w-8 animate-spin text-green-600' />
              <p className='text-gray-600 dark:text-gray-300 text-center'>
                Vous allez être redirigé automatiquement...
              </p>
            </div>
          </div>

          {/* Message sécurité */}
          <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
            <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
              Nous sécurisons votre connexion pour protéger vos informations
            </p>
          </div>
        </div>

        {/* Logo en bas */}
        <div className='mt-8 text-center'>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            case<span className='text-green-600 dark:text-green-500'>cobra</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
