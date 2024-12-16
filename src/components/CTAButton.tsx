import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CTAButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'lg'
}

const CTAButton = ({
  href,
  children,
  variant = 'primary',
  size = 'default'
}: CTAButtonProps) => {
  const baseStyles = 'relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-all duration-300 ease-out group'
  
  const sizeStyles = {
    default: 'text-lg px-8 py-3',
    lg: 'text-xl px-10 py-4'
  }

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-green-600 to-green-500 
      text-white hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.6)] 
      hover:-translate-y-1
      after:absolute after:inset-0 
      after:bg-gradient-to-r after:from-green-500 after:to-green-400
      after:opacity-0 after:transition-opacity after:duration-300
      hover:after:opacity-100
      z-0
    `,
    secondary: `
      bg-white text-gray-900 border-2 border-gray-200
      hover:border-green-500 hover:text-green-600
      hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]
      hover:-translate-y-1
      dark:bg-gray-800 dark:text-white dark:border-gray-700
      dark:hover:border-green-500 dark:hover:text-green-400
    `
  }

  return (
    <Link
      href={href}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
      `}
    >
      <span className='relative flex items-center gap-2 z-10'>
        {children}
        <ArrowRight className={`
          w-5 h-5 transition-transform duration-300
          group-hover:translate-x-1
        `} />
      </span>
    </Link>
  )
}

export default CTAButton 