export const services = [
  { name: 'Detalhamento externo', short: 'A melhor versão da sua pintura.', description: 'Lavagem técnica, descontaminação e acabamento preciso. Um cuidado completo para revelar cada linha do seu carro.', includes: ['Lavagem técnica', 'Descontaminação', 'Proteção da pintura'] },
  { name: 'Cuidado interior', short: 'Sinta a diferença ao entrar.', description: 'Higienização minuciosa de tecidos, couro e acabamentos. O equilíbrio entre limpeza profunda e toque natural.', includes: ['Higienização de tecidos', 'Tratamento do couro', 'Limpeza de detalhes'] },
  { name: 'Proteção cerâmica', short: 'Brilho que vai além da superfície.', description: 'Preparação da pintura e aplicação criteriosa de proteção. Mais profundidade no reflexo e praticidade na manutenção.', includes: ['Inspeção da pintura', 'Polimento de preparação', 'Aplicação cerâmica'] },
  { name: 'Rodas & acabamentos', short: 'A precisão está nos últimos detalhes.', description: 'Limpeza de rodas, caixas e pneus. Cada material recebe o acabamento adequado para completar o conjunto.', includes: ['Limpeza de rodas', 'Cuidado de pneus', 'Acabamento de plásticos'] },
];

export const packages = [
  { name: 'Essencial', eyebrow: 'O PRIMEIRO NÍVEL', price: 390, suvExtra: 80, description: 'O cuidado que renova o prazer de dirigir.', includes: ['Lavagem técnica completa', 'Descontaminação da pintura', 'Limpeza de rodas e pneus', 'Proteção de manutenção'], detail: 'Para manter seu carro sempre à altura.', featured: false },
  { name: 'Signature', eyebrow: 'A ASSINATURA NÓR', price: 990, suvExtra: 150, description: 'Precisão por fora. Equilíbrio por dentro.', includes: ['Tudo do pacote Essencial', 'Polimento de refino', 'Proteção da pintura', 'Higienização interna', 'Tratamento de couro e acabamentos'], detail: 'Uma experiência completa de cuidado.', featured: true },
  { name: 'Black Edition', eyebrow: 'O MÁXIMO EM CUIDADO', price: 1890, suvExtra: 250, description: 'Um novo patamar para cada superfície.', includes: ['Tudo do pacote Signature', 'Correção técnica da pintura', 'Aplicação de proteção cerâmica', 'Proteção de rodas e vidros', 'Orientação de manutenção'], detail: 'Para quem vive cada detalhe.', featured: false },
];

export const studies = [
  { title: 'Presença em preto', subtitle: 'Detalhamento externo · Estudo 01', category: 'pintura', image: '/images/black-studio.webp', alt: 'Carro esportivo preto visto de trás em um estúdio iluminado por linhas de LED', position: '60% 65%' },
  { title: 'Proteção em cada camada', subtitle: 'Proteção cerâmica · Estudo 02', category: 'protecao', image: '/images/ceramic-detail.webp', alt: 'Aplicação de proteção cerâmica com luva e aplicador sobre a pintura', position: '60% center' },
  { title: 'A beleza também está dentro', subtitle: 'Tratamento interior · Estudo 03', category: 'interior', image: '/images/interior.webp', alt: 'Bancos em couro caramelo de um carro esportivo cuidadosamente higienizado', position: '60% center' },
];

export const questions = [
  ['Qual pacote faz sentido para o meu carro?', 'A escolha começa pela condição das superfícies e pela sua rotina. O Essencial concentra o cuidado de manutenção, o Signature amplia o tratamento externo e interno, e o Black Edition inclui preparação e proteção cerâmica. Todos são exemplos conceituais deste projeto.'],
  ['Os valores são reais?', 'Os valores e pacotes são ilustrativos, criados para demonstrar esta experiência digital. A NÓR é uma marca fictícia e nenhum serviço é comercializado neste site.'],
  ['A proteção cerâmica dispensa a lavagem?', 'Não. A proteção pode facilitar a manutenção, mas o veículo continua precisando de lavagens adequadas. Produtos, método e frequência de cuidado influenciam a conservação do acabamento.'],
  ['Como funciona a avaliação?', 'O formulário permite simular uma avaliação com seu nome, modelo do carro, cuidado escolhido e data preferida. Não existe envio ao servidor, cobrança ou agendamento real.'],
];
