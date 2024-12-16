import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800'>
      <MaxWidthWrapper className='py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex flex-col items-center md:items-start space-y-4'>
            <p className='text-sm text-muted-foreground dark:text-gray-400'>
              &copy; {new Date().getFullYear()} CaseCobra. Tous droits réservés
            </p>
          </div>

          <nav className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
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
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
