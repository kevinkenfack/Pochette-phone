import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import { db } from '@/db'
import { constructMetadata } from '@/lib/utils'

export const metadata = constructMetadata({
  title: 'Galerie',
  description: 'Découvrez notre collection de coques personnalisées créées par notre communauté.'
})

const GALLERY_ITEMS = [
  {
    imageUrl: '/gallery/1.jpg',
    croppedImageUrl: '/gallery/1.jpg',
    color: 'black',
    model: 'iPhone 13',
  },
  {
    imageUrl: '/gallery/2.jpg',
    croppedImageUrl: '/gallery/2.jpg',
    color: 'blue',
    model: 'iPhone 14',
  },
  {
    imageUrl: '/gallery/3.jpg',
    croppedImageUrl: '/gallery/3.jpg',
    color: 'blue',
    model: 'iPhone 14',
  },
  {
    imageUrl: '/gallery/4.jpg',
    croppedImageUrl: '/gallery/4.jpg',
    color: 'blue',
    model: 'iPhone 14',
  },
  {
    imageUrl: '/gallery/5.jpg',
    croppedImageUrl: '/gallery/5.jpg',
    color: 'blue',
    model: 'iPhone 14',
  },
  {
    imageUrl: '/gallery/6.jpg',
    croppedImageUrl: '/gallery/6.jpg',
    color: 'blue',
    model: 'iPhone 14',
  },
  // ... ajoutez plus d'exemples
]

export default async function GalleryPage() {
  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <MaxWidthWrapper>
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Nos plus belles{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                réalisations
              </span>
              <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez notre collection de coques personnalisées créées par notre communauté.
            Laissez-vous inspirer pour créer votre propre design unique.
          </p>
        </div>

        {/* Grille de galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[9/16] relative">
                <Phone
                  imgSrc={item.croppedImageUrl}
                  color={item.color as any}
                  className="w-full transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.model}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/configure/upload"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 rounded-xl hover:from-green-500 hover:to-green-400 transition-all duration-200 hover:shadow-lg"
          >
            Créer ma coque
          </a>
        </div>
      </MaxWidthWrapper>
    </div>
  )
} 