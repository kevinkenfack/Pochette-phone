import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 mt-8'>
      <MaxWidthWrapper className='py-6 sm:py-8'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          {/* Navigation */}
          <nav className='flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3'>
            <Link
              href='/contact'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
              Contact
            </Link>
            <Link
              href='/legal/terms'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
              Conditions d'utilisation
            </Link>
            <Link
              href='/legal/privacy'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
              Politique de confidentialité
            </Link>
            <Link
              href='/legal/cookies'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
              Politique des cookies
            </Link>
          </nav>

          {/* Copyright */}
          <div className='flex justify-center'>
            <p className='text-sm text-muted-foreground dark:text-gray-400'>
              &copy; {new Date().getFullYear()} CaseCobra. Tous droits réservés
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
