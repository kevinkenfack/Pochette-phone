'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('cookies-accepted')
    if (!acceptedCookies) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 max-w-[360px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-2xl animate-in slide-in-from-left">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Cookie className="h-5 w-5 text-green-600" />
            <span>Cookies</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience.
          </p>
          <p>
            En continuant, vous acceptez notre{' '}
            <Link href="/legal/cookies" className="text-green-600 hover:underline">
              politique de cookies
            </Link>
            .
          </p>
        </div>

        <Button
          onClick={acceptCookies}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 transition-all duration-300"
        >
          Accepter
        </Button>
      </div>
    </div>
  )
} 