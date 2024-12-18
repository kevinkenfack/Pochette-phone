import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

interface MetadataProps {
  title?: string
  description?: string
  image?: string
}

export function constructMetadata({
  title = 'CaseCobra',
  description = 'Créez votre coque de téléphone personnalisée.',
  image = '/thumbnail.png',
}: MetadataProps = {}): Metadata {
  return {
    title: title === 'CaseCobra' ? title : `${title} | CaseCobra`,
    description,
    openGraph: {
      title: title === 'CaseCobra' ? title : `${title} | CaseCobra`,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title === 'CaseCobra' ? title : `${title} | CaseCobra`,
      description,
      images: [image],
    },
  }
}
