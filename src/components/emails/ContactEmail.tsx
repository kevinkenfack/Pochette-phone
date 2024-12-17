import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactEmailProps {
  name: string
  email: string
  message: string
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nouveau message de contact</Heading>
          
          <Section style={section}>
            <Text style={text}>
              <strong>Nom :</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email :</strong> {email}
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={text}>
              <strong>Message :</strong>
            </Text>
            <Text style={text}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const section = {
  padding: '24px',
}

const h1 = {
  color: '#484848',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '16px 0',
  padding: '0 24px',
}

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
} 