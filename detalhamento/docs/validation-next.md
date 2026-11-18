# Verificação da versão Next.js — 17/11/2026

## Framework e build

- Next.js 16.4.6 com App Router, React e exportação estática em `out/`.
- Build final concluído sem erros nem avisos, incluindo pré-renderização da página inicial.
- `metadata`, Open Graph, idioma PT-BR e favicon definidos no layout do Next.js.
- Instalação concluída com lockfile atualizado; npm reportou zero vulnerabilidades.
- Recursos locais: fontes, imagens, scripts e avisos de licenças incluídos na exportação.
- Servidor da exportação estática respondeu HTTP 200 para a página e a fotografia principal.
- Conferência final no navegador feita também com o build de produção, após encerrar o servidor de desenvolvimento.
- Nenhum erro ou aviso de console na conferência final; nenhuma imagem quebrada ou âncora interna ausente na inspeção final.

## Interações

- Pacotes para Hatch / Sedã: R$ 390, R$ 990 e R$ 1.890.
- Seleção de SUV / Grande porte atualiza para R$ 470, R$ 1.140 e R$ 2.140, com transição de blur.
- Escolher Signature abre o formulário com esse pacote selecionado.
- Campos obrigatórios vazios bloqueados pela validação nativa (três campos inválidos).
- Data mínima calculada no cliente ao abrir o formulário, adequada à exportação estática.
- Simulação preenchida com dados fictícios exibe nome, carro, pacote e data em português.
- Confirmação recebe foco no título; check SVG usa comprimento real do traço, medido em montagem.
- Filtro de interiores reduz a galeria de três estudos para um.
- Ampliação, navegação circular por setas e fechamento por Escape conferidos.
- Menu móvel abre e fecha; selecionar Pacotes fecha o menu e mantém `aria-expanded="false"`.
- Controle de efeitos atualiza seu estado e remove os feixes de luz; brilhos de atmosfera são ocultados.
- Botões nativos do formulário conferidos após o ajuste de layout: `display: flex` e texto de 10 px no desktop.

## Visual e responsividade

Larguras verificadas: 320, 390, 768, 1024, 1280 e 1536 px. Sem rolagem horizontal nos tamanhos conferidos. A versão em 1536 × 1024 foi comparada à proporção da referência fornecida pelo usuário.

- Desktop de produção: `screenshots/desktop-next.jpg`.
- Celular de produção: `screenshots/mobile-next.jpg`.
- Oito componentes do React Bits integrados: BlurText, Magnet, ShinyText, SpotlightCard, StarBorder, ClickSpark, LightRays e GlareHover.
- Transitions.dev aplicado em diálogos, acordeões, inclinação de cartões e check de confirmação; troca de preço segue o padrão de blur adaptado ao Motion.

Movimento reduzido é respeitado por Motion, media queries e pelos componentes. A preferência do sistema não foi alterada nesta conferência. Esta verificação não substitui uma auditoria completa de acessibilidade ou testes em dispositivos físicos.

## Escopo

Marca, pacotes e preços fictícios, identificados na interface. O formulário não grava dados, não cobra, não envia mensagens e não efetua agendamentos reais. A reformulação está completa localmente. Nenhum upload ou deploy foi executado; a identidade do Sites existente foi preservada.
