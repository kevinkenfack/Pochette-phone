# CaseCobra - A Modern Fullstack E-Commerce Shop for Custom Phone Cases

Built with the Next.js 14 App Router, Postgres, TypeScript, Tailwind & Kinde Auth

![Project Image](https://github.com/joschan21/casecobra/blob/master/public/thumbnail.png)

## Features

- 🛠️ Complete shop built from scratch in Next.js 14
- 💻 Beautiful landing page included
- 🎨 Custom artworks made by a professional illustrator
- 💳 Secret admin dashboard to manage orders
- 🖥️ Drag-and-drop file uploads
- 🛍️ Customers can purchase directly from you
- 🌟 Clean, modern UI on top of shadcn-ui
- 🛒 Completely custom phone case configurator
- 🔑 Authentication using Kinde
- ✉️ Beautiful thank-you email after purchase
- ✅ Apple-inspired configuration design
- ⌨️ 100% written in TypeScript
- 🎁 ...much more

## Getting started

To get started with this project, run

```bash
  git clone https://github.com/joschan21/casecobra.git
```

and copy the .env.example variables into a separate .env file, fill them out & and that's all you need to get started!

```env
# Base
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_KINDE_ISSUER_URL=your-kinde-issuer-url
NEXT_PUBLIC_KINDE_CLIENT_ID=your-kinde-client-id
KINDE_CLIENT_SECRET=your-kinde-client-secret
NEXT_PUBLIC_KINDE_POST_CALLBACK_URL=http://localhost:3000/api/auth/kinde-callback
NEXT_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000

# Database
DATABASE_URL=your-postgres-url

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# UploadThing
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# Resend (email service)
RESEND_API_KEY=your-resend-api-key
```

## Acknowledgements

- [Kinde](https://kinde.com) for making this project possible

## License

[MIT](https://choosealicense.com/licenses/mit/)
