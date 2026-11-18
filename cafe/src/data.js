export const menu = {
  'Cafés': [
    { name: 'Espresso da casa', detail: 'Doce, encorpado. O começo de uma boa conversa.', price: 9 },
    { name: 'Coado com calma', detail: 'V60 ou Kalita. Pergunte pelo grão que chegou.', price: 16 },
    { name: 'Cappuccino bréu', detail: 'Espresso duplo, leite cremoso, só isso.', price: 17 },
    { name: 'Latte de baunilha', detail: 'Baunilha de verdade, feita em calda na casa.', price: 20 },
  ],
  'Da cozinha': [
    { name: 'Croissant na chapa', detail: 'Massa folhada, manteiga e flor de sal.', price: 16 },
    { name: 'Tostada da estação', detail: 'Pão de fermentação natural, ricota e tomates.', price: 29 },
    { name: 'Ovos no pão', detail: 'Ovos cremosos, sourdough e azeite de ervas.', price: 28 },
    { name: 'Queijo quente da casa', detail: 'Meia-cura, muçarela e uma casquinha dourada.', price: 24 },
  ],
  'Um doce': [
    { name: 'Bolo de azeite & limão', detail: 'Fatia macia, cobertura cítrica, café do lado.', price: 18 },
    { name: 'Cookie de chocolate', detail: 'Chocolate 70%, centro macio e flor de sal.', price: 12 },
    { name: 'Torta de queijo', detail: 'Cremosa, com compota de frutas da estação.', price: 23 },
    { name: 'Affogato', detail: 'Sorvete de baunilha encontra nosso espresso.', price: 22 },
  ],
  'Gelados': [
    { name: 'Cold brew cítrico', detail: 'Extração a frio, laranja e bastante gelo.', price: 19 },
    { name: 'Espresso tônica', detail: 'Espresso, tônica e uma casca de limão.', price: 21 },
    { name: 'Latte gelado', detail: 'Espresso duplo com leite, no seu tempo.', price: 19 },
    { name: 'Chá da estação', detail: 'Infusão da casa, frutas e frescor.', price: 16 },
  ],
};

export const gallery = [
  { src: 'interior', alt: 'Café e cerâmica sobre a mesa junto à janela, entre plantas', caption: '01 / A mesa perto da janela' },
  { src: 'latte', alt: 'Cappuccino com desenho delicado na espuma', caption: '02 / Pequenos rituais' },
  { src: 'pastry', alt: 'Croissants dourados com camadas de massa folhada', caption: '03 / O cheiro que vem da cozinha' },
  { src: 'space', alt: 'Interior da cafeteria com luz natural e plantas', caption: '04 / Encontre o seu canto' },
];

export const formatPrice = value => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value);
