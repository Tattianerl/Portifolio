// ===== UTILITÁRIOS =====
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// ===== CONFIGURAÇÃO DO PORTFÓLIO =====
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
  sobre: 'Sou formada em Sistemas para Internet e estou em transição de carreira para a área de tecnologia. Tenho paixão por transformar ideias em soluções digitais, com foco em desenvolvimento front-end. Atualmente, dedico-me ao aprimoramento das minhas habilidades em HTML, CSS, JavaScript e React, criando projetos práticos que unem design, usabilidade e boas práticas de código.Busco minha primeira oportunidade na área para aplicar meus conhecimentos, aprender com profissionais experientes e contribuir para o crescimento da equipe e da empresa.',
  formacoes: [
    { titulo: 'Sistemas para Internet', detalhe: 'Tecnólogo', periodo: '2022 — 2024', instituicao: 'Universidade Estácio de Sá' },
    { titulo: 'PROGRAMAÇÃO DE SISTEMAS DE INFORMAÇÃO.', detalhe: 'Certificação', periodo: '2024', instituicao: 'Universidade Estácio de Sá' },
    { titulo: 'Certificado Profissional de UX Design do Google', detalhe: 'Certificação', periodo: '2024', instituicao: 'Coursera' },
  ],
  experiencias: [
    { cargo: 'Vendedora/Atendente de loja', periodo: '2011 — Atual', empresa: 'Di Santinni', desc: ['Minha experiência em vendas me ajudou a desenvolver uma escuta ativa, empatia e comunicação eficiente — habilidades que uso diariamente para criar projetos digitais que realmente atendam às necessidades das pessoas. Saber ouvir, entender problemas e oferecer soluções é algo que levo do mundo das vendas para o desenvolvimento front-end.'] },
  ],
  cursos: [
    { nome: "Marketing Pessoal", instituicao: "DIO", periodo: "10/2024" },
    { nome: "Liderança", instituicao: "DIO", periodo: "10/2024" },
    { nome: "IA Generativa", instituicao: "DIO", periodo: "08/2024" },
    { nome: "Inteligência Artificial (IA)", instituicao: "DIO", periodo: "09/2024" },
    { nome: "Engenharia de Prompt", instituicao: "DIO", periodo: "09/2024" }
  ]
};

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

// ===== THEME TOGGLE COM LOCALSTORAGE =====
const toggleBtn = $('#themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') body.classList.add('light-theme');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// ===== SCROLL REVEAL =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('on'); });
}, { threshold: 0.18 });

// ===== POPULAÇÃO DINÂMICA =====
async function fetchGitHubProjects() {
  try {
    const res = await fetch('https://api.github.com/users/Tattianerl/repos?sort=updated&per_page=10');
    if (!res.ok) throw new Error("Falha ao buscar projetos do GitHub");
    const data = await res.json();

    return data.map(repo => ({
      titulo: repo.name,
      descricao: repo.description || 'Descrição em breve...',
      features: [],
      preview: repo.homepage && repo.homepage !== '' ? repo.homepage : `https://Tattianerl.github.io/${repo.name}/`,
      repo: repo.html_url,
      linguagem: repo.language
    }));
  } catch (err) {
    console.error('Erro ao buscar repositórios do GitHub:', err);
    return [];
  }
}

async function hydrate() {
  // Identidade
  $('#brand-name').textContent = config.nome;
  document.title = `Portfólio - ${config.nome}`;
  $('#headline').textContent = `${config.nome} Desenvolvedora Front-end.`;
  $('#aboutText').textContent = config.sobre;
  $('#idioma2').textContent = `Inglês — ${config.ingles}`;
  $('#allProjectsLink').href = config.allProjects;
  $('#btnCV').href = $('#btnCVTop').href = config.cv;
  $('#lnkGithub').href = $('#btnGithub').href = config.github;
  $('#lnkLinkedin').href = $('#btnLinkedin').href = $('#btnContactLinkedin').href = config.linkedin;
  if(config.instagram) $('#lnkInstagram').href = $('#btnInstagram').href = config.instagram;
  $('#mailto').href = `mailto:${config.email}`;
  $('#footYear').textContent = new Date().getFullYear();
  $('#footName').textContent = config.nome;

  // Formação
  const eduWrap = $('#eduList'); eduWrap.innerHTML = '';
  config.formacoes.forEach(f => {
    const el = document.createElement('div'); el.className='tl-item';
    el.innerHTML = `<h4>${f.titulo} — <small>${f.instituicao}</small></h4><small>${f.periodo} · ${f.detalhe || ''}</small>`;
    eduWrap.appendChild(el);
  });

  // Experiências
  const expWrap = $('#expList'); expWrap.innerHTML = '';
  config.experiencias.forEach(exp => {
    const el = document.createElement('div'); el.className='tl-item';
    el.innerHTML = `<h4>${exp.cargo} — <small>${exp.empresa}</small></h4><small>${exp.periodo}</small>${exp.desc?.length ? `<ul class='tl-list'>${exp.desc.map(i=>`<li>${i}</li>`).join('')}</ul>` : ''}`;
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
  grid.innerHTML = '';

  if (projetos.length === 0) {
    grid.innerHTML = "<p>Não foi possível carregar os projetos agora. 🚧</p>";
    return;
  }

  projetos.slice(0,6).forEach(p => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.setAttribute('aria-label', `Projeto ${p.titulo}`);
    card.innerHTML = `
      <small class="pill">Projeto</small>
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      ${p.linguagem ? `<i class="${langIcons[p.linguagem] || 'devicon-code-plain'}" aria-label="Linguagem ${p.linguagem}" style="font-size:28px; margin-right:5px;"></i>` : ''}
      <div class="card-actions">
        <a class="btn btn-outline" href="${p.preview}" target="_blank" rel="noopener noreferrer" role="button" aria-label="Ver prévia de ${p.titulo}">Prévia do Projeto</a>
        <a class="btn btn-primary" href="${p.repo}" target="_blank" rel="noopener noreferrer" role="button" aria-label="Ver repositório de ${p.titulo}">Repositório</a>
      </div>`;
    grid.appendChild(card);
    io.observe(card);
  });
}

// ===== FORMULÁRIO COM EMAILJS =====
const EMAILJS_PUBLIC_KEY = "S9aBJ2ISTkcA_j2kq";
const EMAILJS_SERVICE_ID = "service_1alk4es";
const EMAILJS_TEMPLATE_ID = "template_cwwf0zn";

document.addEventListener('DOMContentLoaded', async () => {
  await hydrate(); // seu hydrate
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Navbar ativa
  const navLinks = $$('.nav a');
  const sections = ['home','projects','about','contact'].map(id => document.getElementById(id));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
        document.title = `${config.nome} | ${en.target.id.charAt(0).toUpperCase() + en.target.id.slice(1)}`;
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  // Inicialização EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    feedback.style.opacity = 0; // animação suave

    // Validação mínima
    if (!form.from_name.value.trim() || !form.from_email.value.trim() || !form.mensagem.value.trim()) {
      feedback.style.color = "#ff4d4d";
      feedback.textContent = "Preencha todos os campos antes de enviar.";
      feedback.style.opacity = 1;
      btn.disabled = false;
      btn.textContent = "Enviar";
      return;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form
      );

      feedback.style.color = "var(--primary-color)";
      feedback.textContent = "Mensagem enviada com sucesso! ✅";
      feedback.style.opacity = 1;
      form.reset();
    } catch (err) {
      console.error(err);
      feedback.style.color = "#ff4d4d";
      feedback.textContent = "Ocorreu um erro ao enviar a mensagem. ❌";
      feedback.style.opacity = 1;
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar";
    }
  });
});
