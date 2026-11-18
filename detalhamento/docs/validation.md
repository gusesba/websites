# Verificação — 17/11/2026

## Build e recursos

- Build final de produção concluído com Vite 8.3.8, sem erros.
- Instalação inicial: auditoria do npm com zero vulnerabilidades reportadas.
- Imagens WebP locais: hero 155.838 bytes, proteção 93.710 bytes e interior 152.424 bytes.
- Fontes e recursos referenciados verificados no filesystem.
- Licenças incluídas no build em `third-party-notices.txt`.
- Servidor local respondeu HTTP 200.
- Console do navegador sem erros ou avisos durante a conferência final.
- Nenhuma imagem quebrada ou âncora interna ausente na inspeção final do DOM.

## Interações conferidas no navegador

- Expansão e recolhimento dos serviços, com troca da imagem e do conteúdo.
- Ação de um serviço abre o formulário com a opção correspondente selecionada.
- Filtro de interiores reduz a galeria de três estudos para um; filtros usam estado visual e `aria-pressed`.
- Ampliação, navegação circular e setas do teclado na galeria.
- Fechamento de diálogo por botão e por Escape; retorno de foco ao controle de origem.
- Formulário vazio bloqueado por validação nativa dos três campos obrigatórios.
- Data no passado bloqueada pela restrição `min`.
- Envio válido exibe nome, carro, serviço e data em português.
- Foco programático confirmado no título da confirmação (`booking-title`).
- Menu móvel abre e fecha; selecionar uma seção fecha o menu.
- Pergunta sobre o agendamento expande a explicação demonstrativa.

## Responsividade

Larguras verificadas: 320, 390, 768, 1024 e 1280 px. Sem rolagem horizontal nos tamanhos conferidos após o ajuste do menor breakpoint. Capturas de desktop e celular em `screenshots/desktop.jpg` e `screenshots/mobile.jpg`.

Suporte a movimento reduzido implementado com `MotionConfig`, `useReducedMotion` e media queries CSS. A preferência do sistema não foi alterada durante a conferência; isso não equivale a uma auditoria completa de acessibilidade.

## Publicação

O projeto foi registrado no Sites com acesso privado; a identidade foi persistida em `.openai/hosting.json`. O envio do código ao repositório remoto e a publicação não foram executados: a revisão automática exigiu autorização explícita para upload/deploy. Nenhuma URL publicada foi verificada. O projeto e o build estão completos localmente.
