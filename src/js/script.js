  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // 1. Carregar preferência salva no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }

  // 2. Alternar tema no clique
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    // 3. Salvar a preferência
    if (body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });

const config = {
  nome: 'Tatiane Lima',
  cidade: 'Rio de Janeiro RJ',
  email: 'tattine85@hotmail.com',
  github: 'https://github.com/Tattianerl',
  linkedin: 'https://www.linkedin.com/in/tati-lima85',
  instagram: 'https://www.instagram.com/limatati1/',
  cv: './src/assets/cv/CV_TatianeRL.pdf',
  allProjects: 'https://github.com/Tattianerl?tab=repositories',
  ingles: 'Próximo passos',
  sobre: 'Sou Tatiane Lima, recém-formada em Sistemas para Internet e em transição de carreira, saindo do setor de vendas para o mundo da tecnologia. Ao longo da minha experiência como vendedora e atendente, desenvolvi habilidades essenciais como comunicação assertiva, empatia, negociação e foco em resultados, que hoje aplico na criação de soluções digitais centradas no usuário. Atualmente, meu foco é em desenvolvimento Front-end, trabalhando com HTML, CSS, JavaScript, React e React Native. Tenho paixão por criar interfaces modernas, acessíveis e responsivas, seguindo boas práticas de código, arquitetura limpa e componentes reutilizáveis. Busco oportunidades para aplicar meus conhecimentos, aprender continuamente e contribuir para projetos que unam criatividade e tecnologia.',
  formacoes: [
    { titulo: 'Sistemas para Internet', detalhe: 'Tecnólogo', periodo: '2022 — 2024', instituicao: 'Estácio de Sá' },
    { titulo: 'PROGRAMAÇÃO DE SISTEMAS DE INFORMAÇÃO.', detalhe: 'Certificação', periodo: '2024', instituicao: 'Universidade Estácio de Sá' },
    { titulo: 'PROGRAMAÇÃO PARA INTERNET', detalhe: 'Certificação', periodo: '2024', instituicao: 'Universidade Estácio de Sá' },
    { titulo: 'Heineken - Inteligência Artificial Aplicada a Dados com Copilot', detalhe: 'Certificação', periodo: '04-2025', instituicao: 'Parceria entre a Heineken e a plataforma DIO.me' },
    { titulo: 'CAIXA - IA GENERATIVA COM MICROSOFT COPILOT', detalhe: 'Certificação', periodo: '01-2025', instituicao: 'Parceria entre a Caixa e a plataforma DIO' },
    { titulo: 'XP INC. - FULL STACK DEVELOPER', detalhe: 'Certificação', periodo: '13-04-2025', instituicao: 'Parceria entre XP Inc e DIO.me' },
    { titulo: 'DESIGNER DE UX', detalhe: 'Certificação', periodo: '2023', instituicao: 'Designer de ux do Google' },
  ],
  experiencias: [
    { cargo: 'Vendedora/Atendente de loja', periodo: '2011 — Atual', empresa: 'Di Santinni', desc: ['Atuei no atendimento direto ao cliente, identificando necessidades e oferecendo soluções adequadas. Realizo atividades de organização de estoque, reposição de produtos, abertura e fechamento de caixa. Durante minha experiência, desenvolvi competências essenciais como comunicação assertiva, negociação, empatia, trabalho em equipe e foco em resultados, contribuindo para o alcance de metas e para a fidelização dos clientes.'] },
  ],
  cursos: [
    { nome: "Marketing Pessoal", instituicao: "DIO", periodo: "10/2024" },
    { nome: "Liderança", instituicao: "DIO", periodo: "10/2024" },
    { nome: "IA Generativa", instituicao: "DIO", periodo: "08/2024" },
    { nome: "Inteligência Artificial (IA)", instituicao: "DIO", periodo: "09/2024" },
    { nome: "Engenharia de Prompt", instituicao: "DIO", periodo: "09/2024" }
  ]
};

// ===== UTILITÁRIOS =====
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// ===== ÍCONES DAS LINGUAGENS =====
const langIcons = { 
  "JavaScript": "devicon-javascript-plain colored",
  "Python": "devicon-python-plain colored",
  "HTML": "devicon-html5-plain colored",
  "CSS": "devicon-css3-plain colored",
  "TypeScript": "devicon-typescript-plain colored",
  "Java": "devicon-java-plain colored",
  "C#": "devicon-csharp-plain colored",
  "PHP": "devicon-php-plain colored",
  "Ruby": "devicon-ruby-plain colored",
  "Go": "devicon-go-plain colored"
};

// ===== BUSCAR PROJETOS DO GITHUB COM LINK AUTOMÁTICO DE DEPLOY =====
async function fetchGitHubProjects() {
  try {
    const username = 'Tattianerl'; 
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const data = await res.json();

    return data.map(repo => {
      const previewLink = repo.homepage && repo.homepage !== '' 
        ? repo.homepage 
        : `https://${username}.github.io/${repo.name}/`;

      return {
        titulo: repo.name,
        descricao: repo.description || 'Sem descrição',
        features: [],
        preview: previewLink,
        repo: repo.html_url,
        linguagem: repo.language
      };
    });
  } catch (err) {
    console.error('Erro ao buscar repositórios do GitHub:', err);
    return [];
  }
}



// ===== FUNÇÃO PRINCIPAL DE POPULAÇÃO =====
async function hydrate() {
  // Identidade
  $('#brand-name').textContent = config.nome;
  document.title = `Portfólio - ${config.nome}`;
  $('#headline').textContent = `${config.nome} Desenvolvedora Front‑end.`;
  $('#aboutText').textContent = config.sobre;
  $('#idioma2').textContent = `Inglês — ${config.ingles}`;
  $('#allProjectsLink').href = config.allProjects;
  $('#btnCV').href = config.cv; 
  $('#btnCVTop').href = config.cv;

  // Links
  $('#lnkGithub').href = config.github; 
  $('#btnGithub').href = config.github;
  $('#lnkLinkedin').href = config.linkedin; 
  $('#btnLinkedin').href = config.linkedin; 
  $('#btnContactLinkedin').href = config.linkedin;
  if (config.instagram && config.instagram !== '#') { 
    $('#lnkInstagram').href = config.instagram; 
    $('#btnInstagram').href = config.instagram; 
  }
  $('#mailto').href = `mailto:${config.email}`;

  // Footer
  $('#footYear').textContent = new Date().getFullYear();
  $('#footName').textContent = config.nome; 
 

  // Formação
  const eduWrap = $('#eduList'); eduWrap.innerHTML = '';
  config.formacoes.forEach(e => {
    const el = document.createElement('div'); el.className='tl-item';
    el.innerHTML = `<h4>${e.titulo} — <small>${e.instituicao}</small></h4><small>${e.periodo} · ${e.detalhe || ''}</small>`;
    eduWrap.appendChild(el);
  });

  // Experiências
  const expWrap = $('#expList'); expWrap.innerHTML = '';
  config.experiencias.forEach(x => {
    const el = document.createElement('div'); el.className='tl-item';
    el.innerHTML = `<h4>${x.cargo} — <small>${x.empresa}</small></h4><small>${x.periodo}</small>${x.desc?.length? `<ul class='tl-list'>${x.desc.map(i=>`<li>${i}</li>`).join('')}</ul>`: ''}`;
    expWrap.appendChild(el);
  });

  // Cursos
  const cWrap = $('#courseList'); cWrap.innerHTML = ''; 
  config.cursos.forEach(c => {
    const el = document.createElement('div'); el.className = 'tl-item';
    el.innerHTML = `<h4>${c.nome} — <small>${c.instituicao}</small></h4><small>${c.periodo}</small>`;
    cWrap.appendChild(el);
  });

  // Projetos
  const grid = $('#projectsGrid');
  grid.innerHTML = 'Carregando projetos...';
  const projetos = await fetchGitHubProjects();

  // Limitar a 6 cards
  const projetosLimitados = projetos.slice(0, 6);
  grid.innerHTML = '';

  projetosLimitados.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.setAttribute('aria-label', `Projeto ${p.titulo}`);
    card.innerHTML = `
      <small class="pill" style="background:rgba(35,196,227,.15); color:#c9f2fb">Projeto</small>
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      ${p.linguagem ? `<i class="${langIcons[p.linguagem] || ''}" style="font-size:28px; margin-right:5px;"></i>` : ''}
      <div class="card-actions">
        <a class="btn btn-outline" ${p.preview && p.preview!=='#' ? `href='${p.preview}' target='_blank'` : 'href="#" aria-disabled="true"'}>Prévia do Projeto</a>
        <a class="btn btn-primary" ${p.repo && p.repo!=='#' ? `href='${p.repo}' target='_blank'` : 'href="#" aria-disabled="true"'}>Repositório</a>
      </div>
    `;
    grid.appendChild(card);
    io.observe(card); 
  });
}

// ===== UX Enhancements =====
function handleSubmit(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  alert(`Obrigada, ${data.name}! Vou responder em breve.`);
  e.target.reset();
}

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en => {
    if (en.isIntersecting) en.target.classList.add('on');
  })
}, { threshold: .18 });

// Theme toggle
function setTheme(mode){
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('theme', mode);
}
const saved = localStorage.getItem('theme'); 
if(saved) setTheme(saved);
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(next);
});

// Inicialização
window.addEventListener('DOMContentLoaded', async ()=>{
  await hydrate();
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
  if(!saved){ setTheme(matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
  
  const navLinks = $$('.nav a');
  const sections = ['home','projects','about','contact'].map(id=>document.getElementById(id));
  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    })
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s=>spy.observe(s));
});
