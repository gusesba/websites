# Forma Studio

Portfólio de landing pages de Gustavo Esmanhotto, feito em Next.js 16 com App Router, React 19 e CSS. A página apresenta as demos completas da BRAVIO Barbearia, do bréu café & tempo e da NÓR Detailing.

## Rodar

Requer Node.js 20.9 ou superior. Na pasta `portfolio`, execute:

```sh
npm ci
npm run dev
```

Abra o endereço local impresso pelo Next.js. Para servir a versão de produção:

```sh
npm run build
npm start
```

## Personalizar

- `app/page.jsx` contém os textos, projetos, etapas do processo, WhatsApp e e-mail comercial. Os botões de orçamento abrem uma conversa com uma mensagem editável.
- `app/globals.css` define a identidade visual, os efeitos e os layouts responsivos. `app/layout.jsx` define o título e a descrição da página.
- `components/knot.js` desenha a escultura em WebGL. Ela pode ser girada por arraste ou pelas setas do teclado e possui controle de pausa. Com movimento reduzido, inicia parada. Sem WebGL, o visitante vê a imagem local em `public/knot.webp`.

## Atualizar as demos

Os sites em `public/demos/` já estão incluídos. O portfólio roda de forma independente, inclusive em outra máquina. Cada cartão abre a página completa em uma nova aba.

Depois de editar uma landing page original, mantenha as pastas `barbearia`, `cafe` e `detalhamento` ao lado de `portfolio`, instale as dependências de cada projeto com `npm ci` e rode, a partir de `portfolio`:

```sh
npm run sync:demos
```

O script compila cópias temporárias dos originais, adapta os caminhos dos recursos para cada demo e inclui seus créditos e licenças. Execute novamente `npm run build` para gerar a versão de produção atualizada.
