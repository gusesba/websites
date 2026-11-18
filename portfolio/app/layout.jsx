import './globals.css';

export const metadata = {
  title: 'Forma Studio — Landing pages fora do óbvio',
  description: 'Portfólio de Gustavo Esmanhotto. Explore três landing pages autorais e converse sobre a próxima página da sua marca.',
  openGraph: {
    title: 'Forma Studio — Design & desenvolvimento',
    description: 'Landing pages autorais por Gustavo Esmanhotto.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport = { themeColor: '#121212', colorScheme: 'dark' };

export default function Layout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
