import { ShippingAddress } from '@prisma/client'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

const OrderReceivedEmail = ({
  shippingAddress,
  orderId,
  orderDate,
}: {
  shippingAddress: ShippingAddress
  orderId: string
  orderDate: string
}) => {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://casecobra.vercel.app'

  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; padding: 10px !important; }
              .mobile-padding { padding: 20px !important; }
              .mobile-text-center { text-align: center !important; }
              .mobile-full-width { 
                width: 100% !important;
                max-width: none !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .mobile-stack {
                display: block !important;
                width: 100% !important;
                margin-bottom: 16px !important;
              }
            }
          `}
        </style>
      </Head>
      <Preview>Votre commande CaseCobra est confirmée ! 🎉</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          {/* En-tête avec logo */}
          <Section style={header}>
            <Img
              src="https://i.imgur.com/CZru3Q5.png"
              alt="Logo CaseCobra"
              width={150}
              height={50}
              style={logo}
            />
          </Section>

          {/* Message principal avec gradient */}
          <Section style={message} className="mobile-padding">
            <Heading style={global.heading}>
              Merci pour votre commande !
            </Heading>
            <div style={greenGradientBar} />
            <Text style={global.text}>
              Nous préparons votre coque personnalisée avec le plus grand soin. 
              Vous recevrez un email dès que votre commande sera expédiée.
            </Text>
            <Button 
              href={baseUrl}
              style={ctaButton}
              className="mobile-full-width"
            >
              Visiter notre site
            </Button>
          </Section>

          <Hr style={global.hr} />

          {/* Statut de commande */}
          <Section style={statusSection} className="mobile-padding">
            <Row>
              <Column>
                <Text style={statusTitle}>Statut</Text>
                <Text style={statusValue}>En préparation</Text>
              </Column>
              <Column>
                <Text style={statusTitle}>Livraison estimée</Text>
                <Text style={statusValue}>Sous 48h</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={global.hr} />

          {/* Informations de livraison */}
          <Section style={global.defaultPadding} className="mobile-padding">
            <div style={infoCard}>
              <Text style={infoTitle}>Adresse de livraison</Text>
              <Text style={infoText}>
                {shippingAddress.name}<br />
                {shippingAddress.street}<br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              </Text>
            </div>
          </Section>

          <Hr style={global.hr} />

          {/* Détails de la commande */}
          <Section style={global.defaultPadding} className="mobile-padding">
            <div style={orderDetails}>
              <div>
                <Text style={infoTitle}>Numéro de commande</Text>
                <Text style={infoText}>{orderId}</Text>
              </div>
              <div>
                <Text style={infoTitle}>Date de commande</Text>
                <Text style={infoText}>{orderDate}</Text>
              </div>
            </div>
          </Section>

          {/* Support */}
          <Section style={supportSection}>
            <Text style={supportText}>
              Une question ? Contactez-nous en mentionnant votre numéro de commande.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footer.text}>
              © {new Date().getFullYear()} CaseCobra. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderReceivedEmail

const main = {
  backgroundColor: '#FAFAFA',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '40px auto',
  padding: '20px 0',
  width: '600px',
  maxWidth: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}

const header = {
  padding: '32px 40px',
  textAlign: 'center',
  borderBottom: '1px solid #E5E5E5',
} as React.CSSProperties

const message = {
  padding: '40px',
  textAlign: 'center',
} as React.CSSProperties

const greenGradientBar = {
  height: '4px',
  background: 'linear-gradient(to right, #16a34a, #059669)',
  margin: '24px auto',
  width: '60px',
  borderRadius: '2px',
}

const ctaButton = {
  backgroundColor: '#16a34a',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
  margin: '24px auto',
  display: 'inline-block',
  width: '100%',
  maxWidth: '250px',
  boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.2)',
}

const statusSection = {
  padding: '24px 40px',
  backgroundColor: '#F9FAFB',
}

const statusTitle = {
  fontSize: '14px',
  color: '#6B7280',
  margin: '0 0 8px 0',
}

const statusValue = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#111827',
  margin: '0',
}

const global = {
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-0.5px',
    margin: '0',
    color: '#111827',
  } as React.CSSProperties,
  text: {
    margin: '24px 0',
    lineHeight: '1.6',
    color: '#4B5563',
    fontSize: '16px',
  },
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
  defaultPadding: {
    padding: '32px 40px',
  },
}

const infoCard = {
  backgroundColor: '#F9FAFB',
  borderRadius: '12px',
  padding: '24px',
}

const infoTitle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 8px 0',
}

const infoText = {
  fontSize: '14px',
  color: '#4B5563',
  margin: '0',
  lineHeight: '1.5',
}

const orderDetails = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  '@media (min-width: 600px)': {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
  },
}

const supportSection = {
  padding: '32px 40px',
  backgroundColor: '#F9FAFB',
  borderTop: '1px solid #E5E5E5',
}

const supportText = {
  fontSize: '14px',
  color: '#6B7280',
  textAlign: 'center',
  margin: '0',
  lineHeight: '1.5',
} as React.CSSProperties

const footer = {
  padding: '24px 40px',
  backgroundColor: '#F3F4F6',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  text: {
    fontSize: '12px',
    color: '#9CA3AF',
    textAlign: 'center',
    margin: '0',
  } as React.CSSProperties,
}

const logo = {
  margin: '0 auto',
  display: 'block',
  objectFit: 'contain' as const,
}
