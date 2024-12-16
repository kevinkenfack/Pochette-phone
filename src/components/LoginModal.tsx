import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from './ui/dialog'
import Image from 'next/image'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { buttonVariants } from './ui/button'
import { Lock, User } from 'lucide-react'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogPortal>
        <DialogOverlay className='fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm' />
        <DialogContent 
          className={`
            fixed 
            z-[51] 
            top-1/2 
            left-1/2 
            -translate-x-1/2 
            -translate-y-1/2 
            w-[95%] 
            max-w-md 
            p-4 
            sm:p-6 
            rounded-xl 
            bg-white 
            dark:bg-zinc-900
            shadow-2xl 
            border-2 
            border-zinc-100 
            dark:border-zinc-800 
            transform 
            overflow-y-auto 
            max-h-[90vh]
          `}
        >
          <div className='flex flex-col items-center justify-center space-y-4 sm:space-y-6'>
            <DialogHeader className='space-y-4 w-full'>
              <div className='relative mx-auto w-20 h-20 sm:w-28 sm:h-28 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center'>
                <Image
                  src='/snake-1.png'
                  alt='snake image'
                  className='object-contain p-4'
                  fill
                />
              </div>
              <DialogTitle className='text-2xl sm:text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white'>
                <div className='flex flex-col items-center gap-2'>
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                      Connectez-vous
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
                  </span>
                  <span>pour continuer</span>
                </div>
              </DialogTitle>
              <DialogDescription className='text-sm sm:text-base text-center py-2 text-zinc-600 dark:text-zinc-400'>
                <span className='font-semibold text-zinc-900 dark:text-zinc-100 block mb-1'>
                  Votre configuration a été sauvegardée !
                </span>
                Connectez-vous ou créez un compte pour finaliser votre commande.
              </DialogDescription>
            </DialogHeader>
            
            <div className='w-full space-y-4'>
              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                <LoginLink 
                  className={buttonVariants({ 
                    variant: 'outline', 
                    className: 'w-full flex items-center justify-center gap-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm sm:text-base' 
                  })}
                >
                  <User className='w-4 h-4' />
                  Connexion
                </LoginLink>
                <RegisterLink 
                  className={buttonVariants({ 
                    variant: 'default', 
                    className: 'w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base' 
                  })}
                >
                  <User className='w-4 h-4' />
                  Inscription
                </RegisterLink>
              </div>
              
              <div className='text-center'>
                <p className='text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-500 flex items-center justify-center gap-1'>
                  <Lock className='w-3 h-3' />
                  Vos informations sont protégées et sécurisées
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default LoginModal