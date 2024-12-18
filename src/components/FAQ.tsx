'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: "Comment personnaliser ma coque de téléphone ?",
    answer: "Choisissez votre modèle d'iPhone, téléchargez votre image et personnalisez les options de matériaux et de finition. Notre outil de prévisualisation vous permet de voir le résultat final avant la commande."
  },
  {
    question: "Quels modèles d'iPhone sont disponibles ?",
    answer: "Nous proposons des coques pour iPhone X, 11, 12, 13, 14 et 15. Chaque modèle est précisément conçu pour s'adapter parfaitement à votre appareil."
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "La livraison en France métropolitaine prend généralement 3-5 jours ouvrables après la production de votre coque personnalisée."
  },
  {
    question: "Quels matériaux utilisez-vous ?",
    answer: "Nous proposons deux options : silicone premium pour une prise en main souple et confortable, ou polycarbonate pour une protection maximale."
  },
  {
    question: "La personnalisation affecte-t-elle la protection ?",
    answer: "Non, toutes nos coques offrent une excellente protection contre les chocs et les rayures, quelle que soit la personnalisation choisie."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e10_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
            Questions{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                Fréquentes
              </span>
              <span className="absolute inset-x-0 bottom-0 h-3 bg-green-200/40 dark:bg-green-800/40 -rotate-1" />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur nos coques personnalisées
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="group relative"
              >
                <div className={`
                  relative z-10 bg-white dark:bg-gray-800 rounded-2xl 
                  transition-all duration-300 
                  ${openIndex === index ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20' : 'hover:shadow-md'}
                `}>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className={`
                        text-lg font-semibold transition-colors duration-300
                        ${openIndex === index ? 'text-green-600 dark:text-green-400' : 'dark:text-white'}
                      `}>
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={`
                          h-5 w-5 transition-all duration-300
                          ${openIndex === index ? 'text-green-600 rotate-180' : 'text-gray-400'}
                        `}
                      />
                    </div>
                    
                    <div className={`
                      grid transition-all duration-300
                      ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}
                    `}>
                      <div className="overflow-hidden">
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effet de gradient sur l'élément actif */}
                {openIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-400/5 rounded-2xl blur-xl" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 