# NÓR Detailing — Next.js

Landing page conceitual de detalhamento automotivo em Curitiba, em português brasileiro. A segunda versão segue a referência visual fornecida: estúdio preto, LEDs, dourado, tipografia condensada e carro em destaque. Marca fictícia criada para portfólio.

## Executar

Requer Node.js 20.9+ (validado com Node 24) e npm.

```bash
npm ci
npm run dev
```

Abra `http://127.0.0.1:5173`. A porta é fixa para facilitar a prévia.

```bash
npm run build
npm run preview
```

O Next.js 16.4.6 usa App Router e gera a exportação estática em `out/`. `npm run preview` serve exatamente esse build na mesma porta 5173; encerre o servidor de desenvolvimento antes de iniciar a prévia de produção. A configuração do Sites foi atualizada para `out/` e preserva a identidade existente. Nenhum upload ou deploy foi executado nesta reformulação.

## O que está incluído

- Next.js App Router, React, CSS próprio, Motion e ícones Lucide.
- Oito componentes reais do React Bits: **BlurText**, **Magnet**, **ShinyText**, **SpotlightCard**, **StarBorder**, **ClickSpark**, **LightRays** e **GlareHover**, com código-fonte local.
- Transitions.dev: **Accordion expand**, **Modal open / close**, **Card hover tilt** e **Success check**. O preço usa a dinâmica de troca com blur de **Text states swap**, adaptada ao Motion.
- Hero com tipografia animada, parallax, feixes WebGL que acompanham o cursor, brilho metálico e partículas ao clicar.
- Três pacotes com seleção de porte do veículo e valores ilustrativos animados.
- Galeria com filtros animados, ampliação, navegação circular e setas do teclado.
- Formulário demonstrativo com validação nativa, data futura, seleção do serviço e resumo de confirmação.
- Navegação responsiva, foco contido nos diálogos, fechamento por Escape, links de salto e suporte a movimento reduzido. Há um controle para pausar os efeitos de atmosfera no rodapé.
- Imagens WebP e fontes locais; sem dependência de CDN para o funcionamento da página.
- Metadados em PT-BR, Open Graph e favicon próprio.

## Personalizar

- `src/app/layout.jsx`: documento, metadados e estilos globais.
- `src/app/page.jsx`: página inicial com renderização estática.
- `src/data.js`: serviços, pacotes, valores, galeria e perguntas.
- `src/App.jsx`: composição principal, navegação, pacotes e seções.
- `src/components/Booking.jsx` e `Gallery.jsx`: formulário demonstrativo e galeria.
- `src/components/Primitives.jsx`: marca, revelações e cartões com inclinação 3D.
- `src/styles.css`: cores em `:root`, tipografia, composição e breakpoints.
- `src/transitions.css`: tokens e transições adaptadas do transitions.dev.
- `public/images/`: imagens otimizadas utilizadas no site.
- `docs/image-originals/`: imagens originais geradas, preservadas fora do build.
- `docs/credits.md`: fontes, licenças, prompts e origem dos recursos.

O formulário não tem backend, não grava dados, não envia mensagens e não faz agendamentos reais. Para um negócio real, conecte um serviço de agendamento ou backend e ajuste os textos demonstrativos, a política de privacidade e os metadados para o domínio final.

## Verificação

Build de produção concluído sem erros. Conferência no navegador dos pacotes, porte do veículo, filtros, galeria ampliada, navegação móvel, pausa dos efeitos e formulário. Detalhes em `docs/validation-next.md`. Capturas atuais em `docs/screenshots/desktop-next.jpg` e `docs/screenshots/mobile-next.jpg`.
