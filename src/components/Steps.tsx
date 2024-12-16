'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Check, Upload, Palette, ShoppingCart } from 'lucide-react'

const STEPS = [
  {
    name: 'Upload',
    description: 'Choisissez votre photo',
    url: '/configure/upload',
    icon: Upload
  },
  {
    name: 'Design',
    description: 'Personnalisez votre coque',
    url: '/configure/design',
    icon: Palette
  },
  {
    name: 'Commande',
    description: 'Validez et commandez',
    url: '/configure/preview',
    icon: ShoppingCart
  }
]

const Steps = () => {
  const pathname = usePathname()

  return (
    <div className="w-full py-6 px-4 md:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          {STEPS.map((step, i) => {
            const isCurrent = pathname.includes(step.url)
            const isCompleted = STEPS.slice(0, i).some(s => pathname.includes(s.url))
            const Icon = step.icon

            return (
              <div 
                key={step.name} 
                className={cn(
                  "flex-1 relative",
                  "md:block",
                  !isCurrent && !isCompleted && i !== (STEPS.findIndex(s => pathname.includes(s.url)) + 1) && "hidden md:block"
                )}
              >
                <div className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
                  "border-2",
                  isCurrent ? "bg-green-50 dark:bg-green-900/20 border-green-600 shadow-sm" : 
                  isCompleted ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-900" :
                  "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                )}>
                  {/* Icône */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200",
                    isCurrent ? "bg-green-600 text-white" :
                    isCompleted ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" :
                    "bg-gray-100 text-gray-400 dark:bg-gray-700"
                  )}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Texte */}
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium",
                      isCurrent ? "text-green-600 dark:text-green-400" :
                      "text-gray-900 dark:text-gray-100"
                    )}>
                      {step.name}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isCurrent ? "text-green-600/80 dark:text-green-400/80" :
                      "text-gray-500 dark:text-gray-400"
                    )}>
                      {step.description}
                    </p>
                  </div>

                  {/* Numéro mobile */}
                  <div className="flex md:hidden items-center justify-center w-6 h-6 text-sm font-medium text-gray-400">
                    {i + 1}/{STEPS.length}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Steps
