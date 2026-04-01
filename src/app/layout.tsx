import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'AGORA 2026 — La démocratie éclairée',
  description: 'Votez sur les référendums de la semaine. Comprenez les enjeux. Débattez avec des arguments sourcés. Devenez un Citoyen Éclairé.',
  openGraph: {
    title: 'AGORA 2026',
    description: 'La plateforme du référendum éclairé',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
