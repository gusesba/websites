# BRAVIO — Barbearia de Curitiba

Landing page de uma barbearia fictícia, criada como projeto de portfólio. Identidade editorial em carvão, papel cru e laranja queimado. Conteúdo em português brasileiro.

## Rodar o projeto

Requer Node.js 20.9+ e npm.

```sh
npm install
npm run dev
```

`npm run dev` inicia o projeto em `http://localhost:3000`. `npm run build` gera a versão de produção em `.next`; `npm start` (ou `npm run preview`) serve esse build localmente.

## Stack e interações

- Next.js 16 com App Router, React, CSS responsivo e ícones Lucide.
- Layout e metadados no servidor; animações e interações no componente cliente `src/App.jsx`.
- Motion para entradas ao rolar a página e parallax na fotografia principal.
- **React Bits:** BlurText e Magnet, incorporados como código em `src/components`. Licença original em `REACT-BITS-LICENSE.md`.
- **transitions.dev:** receitas oficiais de modal, acordeão e confirmação. CSS aplicado em `src/transitions.css`; referências originais em `transitions/`.
- Menu mobile, navegação por âncoras, galeria ampliável com setas e teclado, perguntas frequentes e agendamento demonstrativo em duas etapas.
- Diálogos nativos com gerenciamento de foco, navegação por teclado e respeito a `prefers-reduced-motion`.
- Fontes locais Barlow Condensed e Manrope; respectivas licenças em `public/fonts`.

## Conteúdo demonstrativo

A BRAVIO não é um estabelecimento real. Serviços, valores, horários e localização são ilustrativos. O agendamento apenas exibe um resumo em memória: não armazena dados, não envia mensagens e não realiza cobranças. O mapa é uma composição artística e o link externo mostra apenas o bairro São Francisco em Curitiba.

Para adaptar a uma empresa real, substitua os dados e conecte o agendamento a um serviço apropriado. Os dados dos serviços e os textos estão em `src/App.jsx`; a identidade visual e os breakpoints ficam em `src/styles.css`.

## Créditos

- Componentes: [React Bits](https://reactbits.dev/), por David Haz.
- Transições: [transitions.dev](https://transitions.dev/), por Jakub Antalik.
- Fotografias ilustrativas: [Unsplash](https://unsplash.com/). Arquivos locais para evitar dependências de carregamento remoto:
  - `hero.jpg`: https://images.unsplash.com/photo-1503951914875-452162b0f3f1
  - `ritual.jpg`: https://images.unsplash.com/photo-1621605815971-fbc98d665033
  - `cut.jpg`: https://images.unsplash.com/photo-1599351431202-1e0f0137899a
  - `space.jpg`: https://images.unsplash.com/photo-1585747860715-2ba37e788b70
- Fontes: [Google Fonts](https://fonts.google.com/), sob SIL Open Font License.

## Estrutura

```text
public/             Fotografias, fontes e favicon
src/app/layout.jsx  Layout raiz, estilos globais e metadados
src/app/page.jsx    Página inicial no App Router
src/App.jsx         Seções da landing page e interações
src/components/     Componentes React Bits
src/styles.css      Layout e identidade visual
src/transitions.css Transições do transitions.dev
transitions/        Receitas originais utilizadas
.openai/hosting.json Metadados da publicação anterior, não usados pelo Next.js
```
