import { getSiteConfig } from '@/lib/site-config'
import ContactoClient from './ContactoClient'

export default async function ContactoPage() {
  const config = await getSiteConfig()

  return <ContactoClient initialConfig={config} />
}