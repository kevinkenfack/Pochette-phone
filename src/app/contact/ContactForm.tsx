'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast'
import { Send, Check } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.currentTarget

    try {
      const formData = new FormData(form)
      const body = JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        throw new Error('Server error')
      }

      if (data.error) {
        throw new Error(data.error)
      }

      toast({
        title: (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span>Message envoyé !</span>
          </div>
        ),
        description: 'Nous vous répondrons dans les plus brefs délais.',
        className: "border-green-100 bg-white dark:bg-gray-950 dark:border-green-900/50",
        title_className: "text-green-900 dark:text-green-100 font-medium",
        description_className: "text-green-700 dark:text-green-300",
      })
      form.reset()
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Input
          name="name"
          placeholder="Votre nom"
          required
          className="bg-white dark:bg-gray-900"
        />
      </div>

      <div className="space-y-2">
        <Input
          name="email"
          type="email"
          placeholder="Votre email"
          required
          className="bg-white dark:bg-gray-900"
        />
      </div>

      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder="Votre message"
          required
          className="min-h-[150px] bg-white dark:bg-gray-900 resize-none"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className={`
          w-full relative overflow-hidden rounded-xl font-medium text-lg
          bg-gradient-to-r from-green-600 to-green-500 
          hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.6)] 
          hover:-translate-y-1 transition-all duration-300
          after:absolute after:inset-0 
          after:bg-gradient-to-r after:from-green-500 after:to-green-400
          after:opacity-0 after:transition-opacity after:duration-300
          hover:after:opacity-100 disabled:opacity-50 disabled:hover:transform-none
          py-6 px-8
        `}
      >
        <span className="relative flex items-center justify-center gap-3 z-10">
          {isLoading ? (
            'Envoi en cours...'
          ) : (
            <>
              Envoyer
              <Send className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </Button>
    </form>
  )
} 