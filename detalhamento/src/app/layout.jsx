import '../transitions.css';
import '../styles.css';

export const metadata = {
  metadataBase: new URL('https://nor-auto-atelier-curitiba.epiccord5.chatgpt.site'),
  title: 'NÓR Detailing — Impecável em cada detalhe | Curitiba',
  description: 'Detalhamento automotivo, proteção cerâmica e cuidado interior em Curitiba. Explore a NÓR: um projeto conceitual de design e desenvolvimento.',
  applicationName: 'NÓR Detailing',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'NÓR Detailing — Em outro nível.',
    description: 'Precisão, proteção e presença. Cuidado automotivo em Curitiba. Projeto conceitual.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/images/black-studio.webp', width: 1536, height: 1024 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { themeColor: '#090909', colorScheme: 'dark' };

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
