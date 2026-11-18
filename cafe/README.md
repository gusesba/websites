# bréu — café & tempo

Landing page editorial de uma cafeteria fictícia no São Francisco, em Curitiba. Projeto conceitual para portfólio, inteiramente em português brasileiro.

## Desenvolvimento

Requisitos: Node.js 20.9+ e npm.

```sh
npm install
npm run dev
```

O Next.js imprime o endereço local (por padrão, `http://localhost:3000`). Para gerar e conferir a versão de produção:

```sh
npm run build
npm run preview
```

O App Router pré-renderiza a página e exporta o resultado em `dist/`, que pode ser servido como arquivos estáticos. `npm run preview` serve esse build localmente. Não é necessário backend, chave de API ou variável de ambiente. Esses comandos não publicam o site.

## O projeto

- Next.js 16 com App Router, React 19, CSS responsivo e ícones Lucide.
- Identidade própria em creme, off-white e verde-sálvia; títulos Italiana e Cormorant Garamond, textos DM Sans.
- Animação BlurText do React Bits, instalada como código-fonte local.
- Receitas gratuitas **Tabs sliding** e **Modal open/close**, do Transitions.dev, adaptadas nos componentes e no CSS.
- Revelações de entrada com Motion e IntersectionObserver, sem eventos contínuos de scroll.
- Cardápio com quatro categorias e navegação por setas, Home e End.
- Galeria em diálogo nativo: foco contido, restauração de foco, setas e Escape.
- Menu mobile com fechamento ao navegar ou pressionar Escape.
- Movimento reduzido, link de pular conteúdo e foco visível.
- Fotos e fontes hospedadas localmente, sem solicitações externas durante a navegação.

## Personalização

O conteúdo principal está em `src/App.jsx`; produtos, preços e galeria em `src/data.js`; os tokens, estilos e breakpoints em `src/styles.css`. A rota inicial está em `src/app/page.jsx`, e o layout, idioma e metadados em `src/app/layout.jsx`. Fotografias ficam em `public/images/` e fontes em `public/fonts/`.

O link de mapa aponta para o bairro São Francisco, não para um estabelecimento real. Cafeteria, produtos, horários e história são fictícios. As fotos são imagens ilustrativas de acervo; não retratam um estabelecimento bréu real. O rodapé deixa o caráter conceitual explícito.

## Verificação

Build de produção validado. Fluxos de categorias por clique e teclado, abertura/navegação/fechamento da galeria e menu mobile verificados no navegador. Layout revisado em larguras mobile, tablet e desktop. Não há formulário ou reserva que simule enviar dados.

## Recursos e licenças

Consulte `THIRD-PARTY.md`, `REACT-BITS-LICENSE.md`, `TRANSITIONS-LICENSE.txt` e os arquivos OFL em `public/fonts/`.
