'use client'

import Phone from './Phone'
import { ArrowRight } from 'lucide-react'

interface BeforeAfterProps {
  imageSrc: string
  alt?: string
}

export const BeforeAfter = ({ imageSrc, alt = "Image Before After" }: BeforeAfterProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image originale (gauche) */}
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl p-6">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full aspect-square object-cover rounded-xl"
          />
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Votre photo</p>
          </div>
        </div>

        {/* Flèche centrale */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="bg-green-600 dark:bg-green-500 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Flèche mobile */}
        <div className="flex md:hidden justify-center">
          <div className="bg-green-600 dark:bg-green-500 rounded-full p-3 shadow-lg rotate-90">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Résultat sur la coque (droite) */}
        <div className="relative flex justify-center">
          <div className="relative transform-gpu hover:rotate-y-12 transition-transform duration-1000">
            <Phone 
              className="w-[280px] md:w-[320px] rounded-[50px]" 
              imgSrc={imageSrc}
            />
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Votre coque</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 