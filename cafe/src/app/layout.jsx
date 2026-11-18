import '../styles.css';

export const metadata = {
  metadataBase: new URL('https://breu-cafe-curitiba.epiccord5.chatgpt.site'),
  title: 'bréu — café & tempo · Curitiba',
  description: 'Café de origem, cozinha de estação e um tempo só seu. Conheça a bréu, uma cafeteria autoral no coração de Curitiba. Projeto conceitual de portfólio.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'bréu — café & tempo',
    description: 'Um café. Um respiro. Um lugar para ficar. São Francisco, Curitiba.',
    type: 'website',
    locale: 'pt_BR',
    images: ['/images/space.jpg'],
    url: '/',
  },
};

export const viewport = {
  themeColor: '#f5f2eb',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/images/space.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
