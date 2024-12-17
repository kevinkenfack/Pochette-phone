import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import ContactEmail from '@/components/emails/ContactEmail'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const data = await resend.emails.send({
      from: 'CaseCobra <noreply@kevinkenfack.com>',
      to: 'kevinkenfackjoel@gmail.com',
      subject: `Nouveau message de ${name}`,
      react: ContactEmail({
        name,
        email,
        message,
      }),
    })

    console.log('Email sent successfully:', data)

    if (!data.data?.id) {
      throw new Error('Failed to get email ID')
    }

    return new NextResponse(
      JSON.stringify({ 
        data: {
          id: data.data.id
        },
        error: null
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

  } catch (error) {
    console.error('Error details:', error)
    return new NextResponse(
      JSON.stringify({ 
        data: null,
        error: 'Failed to send email'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
} 