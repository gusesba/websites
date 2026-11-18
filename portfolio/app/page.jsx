import Header from '../components/Header';
import Sculpture from '../components/Sculpture';
import ScrollReveal from '../components/ScrollReveal';
import StudioBadge from '../components/StudioBadge';
import { Mark, Arrow } from '../components/Icons';

const contact = 'https://wa.me/5541997173484?text=' + encodeURIComponent('Olá, Gustavo! Vi o portfólio da Gusesba e gostaria de um orçamento para uma landing page.');
const projects = [
  { slug: 'bravio', name: 'BRAVIO', signature: 'BARBEARIA', title: 'BRAVIO Barbearia', type: 'Barbearia', image: 'hero.jpg', description: 'Fotografia de perto, cortes autorais e um agendamento que começa pela escolha do serviço.' },
  { slug: 'breu', name: 'bréu', signature: 'CAFÉ & TEMPO', title: 'bréu café & tempo', type: 'Cafeteria', image: 'space.jpg', description: 'Um café de bairro traduzido em tons suaves, tipografia delicada e um cardápio para explorar.' },
  { slug: 'nor', name: 'NÓR', signature: 'D E T A I L I N G', title: 'NÓR Detailing', type: 'Automotivo', image: 'porsche-abertura.webp', description: 'Luz de estúdio, pintura em detalhe e pacotes de cuidado que variam com o porte do carro.' },
];
const steps = [
  ['Conversa e direção', 'Começamos pelo seu negócio, pelo público e pela ação que a página precisa incentivar. Dessa conversa sai o roteiro do projeto.'],
  ['Design e movimento', 'O roteiro ganha forma, da primeira dobra ao contato. Você acompanha a direção visual e revisa a proposta antes do desenvolvimento.'],
  ['Desenvolvimento e entrega', 'Construo a página em Next.js, ajusto as interações e testo a navegação no celular e no desktop antes da entrega.'],
];

export default function Home() {
  return <>
    <ScrollReveal />
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <div id="inicio" />
    <Header contact={contact} />
    <main id="conteudo">
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="availability"><i /> Disponível para projetos</p>
            <h1>Landing pages<br />fora do <em>óbvio.</em></h1>
            <p className="intro">Design autoral e desenvolvimento sob medida para marcas que querem se destacar no digital.</p>
            <div className="hero-actions"><a className="button primary" href="#projetos">Explorar projetos <Arrow direction="down" size={16} /></a><a className="plain-link" href="#processo">Meu processo <Arrow direction="right" size={15} /></a></div>
          </div>
          <Sculpture />
        </div>
      </section>
      <div className="discipline-strip" aria-label="Especialidades"><div className="wrap disciplines" data-reveal="">
        <span>Design de interface</span><b aria-hidden="true">✳</b><span>Desenvolvimento web</span><b aria-hidden="true">✳</b><span>Motion design</span><b aria-hidden="true">✳</b><span>Experiência digital</span>
      </div></div>
      <section className="projects wrap section" id="projetos" aria-labelledby="projects-title">
        <p className="eyebrow" data-reveal=""><i /> PORTFÓLIO</p>
        <div className="section-title" data-reveal=""><h2 id="projects-title">Projetos selecionados<span>.</span></h2><span className="project-count">[ 03 PROJETOS ]</span></div>
        <div className="projects-grid">{projects.map((p, i) =>
          <a className={'project ' + p.slug} key={p.slug} data-reveal="" href={'/demos/' + p.slug + '/index.html'} target="_blank" rel="noreferrer" aria-label={'Abrir ' + p.title + ' em nova aba'}>
            <div className="project-cover">
              <img src={'/demos/' + p.slug + '/images/' + p.image} alt="" width="760" height="510" />
              <div className="cover-shade" />
              <span className="cover-id">P — 0{i + 1}</span>
              <span className="cover-open"><Arrow size={16} /></span>
              <div className="project-wordmark" aria-hidden="true"><strong>{p.name}{p.slug === 'bravio' && <i>.</i>}</strong><small>{p.signature}</small></div>
            </div>
            <div className="project-meta"><h3>{p.title}</h3><span>{p.type}</span></div>
            <p>{p.description}</p>
          </a>
        )}</div>
      </section>
      <section className="process section" id="processo" aria-labelledby="process-title"><div className="wrap process-layout">
        <div data-reveal=""><p className="eyebrow"><i /> PROCESSO</p><h2 id="process-title">Da ideia<br />à <em>página.</em></h2></div>
        <div className="steps">{steps.map(([title, detail], index) => <details key={title} data-reveal="" name="etapas" open={index === 0}><summary><small>0{index + 1}</small>{title}<span className="plus" aria-hidden="true" /></summary><p>{detail}</p></details>)}</div>
      </div></section>
      <section className="studio section wrap" id="estudio" aria-labelledby="studio-title">
        <div className="studio-about">
          <div data-reveal=""><p className="eyebrow"><i /> O ESTÚDIO</p><h2 id="studio-title">Por trás<br />da <em>Gusesba.</em></h2></div>
          <div className="studio-copy" data-reveal=""><p>Sou Gustavo Esmanhotto. Criei a Gusesba para dar a cada negócio uma página com identidade própria.</p><p>Os três projetos deste portfólio são estudos autorais. Em cada um, explorei como fotografia, tipografia e movimento podem ajudar alguém a dar o próximo passo.</p><a href={contact} className="plain-link" target="_blank" rel="noreferrer">Converse comigo <Arrow size={15} /></a></div>
        </div>
        <StudioBadge />
      </section>
      <section className="contact-section"><div className="wrap contact-inner"><div data-reveal=""><p className="eyebrow"><i /> SEU PROJETO</p><h2>Vamos dar forma<br />à sua <em>ideia?</em></h2></div><div className="contact-actions" data-reveal=""><a className="button primary" href={contact} target="_blank" rel="noreferrer">Pedir um orçamento <Arrow /></a><a className="email" href="mailto:gustavoesmanhotto@hotmail.com">gustavoesmanhotto@hotmail.com</a></div></div></section>
    </main>
    <footer className="wrap footer" data-reveal=""><div className="footer-brand"><Mark />Gusesba</div><span>© {new Date().getFullYear()} Gustavo Esmanhotto</span><a href="#inicio">Voltar ao topo <Arrow direction="up" size={14} /></a></footer>
  </>;
}
