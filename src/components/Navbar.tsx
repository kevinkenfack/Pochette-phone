import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight, Menu } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky z-[100] top-0 w-full border-b border-gray-200 bg-white/75 dark:bg-gray-900/75 dark:border-gray-800 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='flex z-40 font-semibold text-xl'>
            case<span className='text-green-600 dark:text-green-500'>cobra</span>
          </Link>

          {/* Menu Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger className='flex md:hidden p-2 -mr-2 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
              <Menu className='h-6 w-6 text-gray-700 dark:text-gray-300' />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align='end' 
              className='w-56 mt-2 mr-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg'
            >
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/track' 
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Suivre ma commande
                    </Link>
                  </DropdownMenuItem>

                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link 
                        href='/dashboard' 
                        className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                      >
                        Dashboard ✨
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/configure/upload'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Créer ma coque
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/api/auth/logout'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Déconnexion
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/track' 
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Suivre ma commande
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/configure/upload'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Créer ma coque
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/api/auth/register'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Inscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href='/api/auth/login'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                    >
                      Connexion
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu Desktop */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link
              href='/track'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20',
              })}>
              Suivre ma commande
            </Link>

            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20',
                  })}>
                  Déconnexion
                </Link>

                {isAdmin && (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                      className: 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20',
                    })}>
                    Dashboard ✨
                  </Link>
                )}

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'bg-green-600 hover:bg-green-700 text-white',
                  })}>
                  Créer ma coque
                  <ArrowRight className='ml-1.5 h-4 w-4' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20',
                  })}>
                  Inscription
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20',
                  })}>
                  Connexion
                </Link>

                <div className='h-6 w-px bg-gray-200 dark:bg-gray-700' />

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'bg-green-600 hover:bg-green-700 text-white',
                  })}>
                  Créer ma coque
                  <ArrowRight className='ml-1.5 h-4 w-4' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
