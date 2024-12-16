import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import { Reviews } from '@/components/Reviews'
import { 
  ArrowRight, 
  Check, 
  Star, 
  Sparkles, 
  Phone as PhoneIcon, 
  Shield, 
  Truck 
} from 'lucide-react'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { BeforeAfter } from '@/components/BeforeAfter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Arrière-plan décoratif */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        </div>

        <MaxWidthWrapper className="relative pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge Promo */}
              <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mx-auto lg:mx-0">
                <Sparkles className="h-4 w-4" />
                <span>-20% sur votre première commande</span>
              </div>

              {/* Titre principal */}
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Créez votre{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                    coque unique
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                Transformez vos photos en oeuvres d'art portables. Protection premium et style personnalisé pour votre iPhone.
              </p>

              {/* CTA Groupe */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CTAButton href="/configure/upload" size="lg">
                  Creer ma coque
                </CTAButton>
                <CTAButton href="#gallery" variant="secondary" size="lg">
                  Voir les créations
                </CTAButton>
              </div>

              {/* Stats et confiance */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                {[
                  { icon: PhoneIcon, label: "50K+", sublabel: "Coques créées" },
                  { icon: Shield, label: "5 ans", sublabel: "Garantie" },
                  { icon: Truck, label: "48h", sublabel: "Livraison" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center lg:items-start">
                    <stat.icon className="h-6 w-6 text-green-600 mb-2" />
                    <div className="font-bold text-2xl text-gray-900 dark:text-white">{stat.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section visuelle avec téléphone flottant */}
            <div className="relative lg:h-[600px]">
              {/* Cercle décoratif */}
              <div className="absolute inset-0">
                <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-gradient-to-br from-green-200 to-green-100/50 dark:from-green-900 dark:to-green-800/50 rounded-full blur-3xl opacity-30 transform rotate-12" />
              </div>

              {/* Phone showcase avec rotation 3D */}
              <div className="relative perspective-1000">
                <div className="relative transform-gpu hover:rotate-y-12 transition-transform duration-1000 cursor-pointer">
                  <Phone 
                    className="w-80 mx-auto rounded-[50px]" 
                    imgSrc="/testimonials/1.jpg"
                  />
                  
                  {/* Reviews flottantes - caché sur mobile */}
                  <div className="hidden md:block absolute -right-12 top-20 transform hover:-translate-y-2 transition-transform">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-medium dark:text-white">Design incroyable !</p>
                    </div>
                  </div>

                  {/* Badge prix - caché sur mobile */}
                  <div className="hidden md:block absolute -left-8 bottom-20 transform hover:scale-105 transition-transform">
                    <div className="bg-green-600 text-white rounded-full p-4 shadow-lg">
                      <p className="text-sm font-bold">À partir de</p>
                      <p className="text-2xl font-bold">29.99€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Section Témoignages */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Ce que nos clients{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  en pensent
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "La qualité d'impression est exceptionnelle ! Les couleurs sont vibrantes et la finition est parfaite. Je recommande à 100%.",
                author: "Sophie M.",
                role: "iPhone 14 Pro",
                avatar: "/users/user-1.png",
                rating: 5,
                date: "Il y a 2 jours"
              },
              {
                text: "Service client réactif et livraison ultra rapide. La coque est robuste et protège parfaitement mon téléphone des chutes.",
                author: "Thomas R.",
                role: "iPhone 13",
                avatar: "/users/user-2.png",
                rating: 5,
                date: "Il y a 1 semaine"
              },
              {
                text: "Déjà ma deuxième commande ! La qualité est toujours au rendez-vous et le rendu est magnifique. Le rapport qualité-prix est excellent.",
                author: "Julie L.",
                role: "iPhone 15",
                avatar: "/users/user-3.png",
                rating: 5,
                date: "Il y a 3 jours"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="group">
                <div className="relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                      "{testimonial.text}"
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-green-100 dark:ring-green-800"
                      />
                      <div>
                        <h4 className="font-bold dark:text-white">{testimonial.author}</h4>
                        <div className="flex flex-col text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{testimonial.role}</span>
                          <span className="text-gray-500 dark:text-gray-500">{testimonial.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute top-8 right-8">
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-medium">Achat vérifié</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trustpilot Reviews */}
          <div className="mt-16">
            <Reviews />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Section Processus */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e10_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Comment ça{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  fonctionne
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Uploadez votre photo",
                description: "Choisissez votre plus belle photo depuis votre galerie"
              },
              {
                step: "02",
                title: "Personnalisez",
                description: "Ajustez la position et ajoutez des effets si vous le souhaitez"
              },
              {
                step: "03",
                title: "Commandez",
                description: "Recevez votre coque personnalisée en 48h chrono"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative group perspective-1000">
                <div className="transform transition-transform duration-500 group-hover:rotate-y-12">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                    <div className="text-5xl font-bold text-green-500 mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold mb-4 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Section Before/After */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e10_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Du{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  souvenir
                </span>
              </span>
              {' '}à la{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  réalité
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Faites glisser pour voir la transformation
            </p>
          </div>

          <BeforeAfter imageSrc="/testimonials/1.jpg" />
        </MaxWidthWrapper>
      </section>

      {/* Section CTA finale */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute inset-0 bg-[radial-gradient(#22c55e10_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <MaxWidthWrapper className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Prêt à créer votre{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  coque unique
                </span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Commencez dès maintenant et recevez votre coque personnalisée en 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/configure/upload" size="lg">
                Créer ma coque maintenant
              </CTAButton>
              <CTAButton href="#gallery" variant="secondary" size="lg">
                Voir plus d'exemples
              </CTAButton>
            </div>

            {/* Trust badges */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: Truck, label: "Livraison 48h" },
                { icon: Star, label: "4.9/5 Trustpilot" },
                { icon: PhoneIcon, label: "Support 7j/7" }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <badge.icon className="h-6 w-6 text-green-600" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}