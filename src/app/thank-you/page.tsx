import { Suspense } from 'react'
import ThankYou from './ThankYou'

const Page = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Vérification du paiement...
          </h2>
          <p className="text-muted-foreground">
            Cela peut prendre un moment.
          </p>
        </div>
      </div>
    }>
      <ThankYou />
    </Suspense>
  )
}

export default Page
