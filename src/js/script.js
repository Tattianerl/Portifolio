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
  sobre: 'Sou Tatiane Lima, recém-formada em Sistemas para Internet ...',
  formacoes: [
    { titulo: 'Sistemas para Internet', detalhe: 'Tecnólogo', periodo: '2022 — 2024', instituicao: 'Estácio de Sá' },
    { titulo: 'PROGRAMAÇÃO DE SISTEMAS DE INFORMAÇÃO.', detalhe: 'Certificação', periodo: '2024', instituicao: 'Universidade Estácio de Sá' },
    // ... demais formações
  ],
  experiencias: [
    { cargo: 'Vendedora/Atendente de loja', periodo: '2011 — Atual', empresa: 'Di Santinni', desc: ['Atuei no atendimento direto ...'] },
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
    const data = await res.json();
    return data.map(repo => ({
      titulo: repo.name,
      descricao: repo.description || 'Sem descrição',
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
  $('#headline').textContent = `${config.nome} Desenvolvedora Front‑end.`;
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
  projetos.slice(0,6).forEach(p => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.setAttribute('aria-label', `Projeto ${p.titulo}`);
    card.innerHTML = `
      <small class="pill">Projeto</small>
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      ${p.linguagem ? `<i class="${langIcons[p.linguagem] || ''}" style="font-size:28px; margin-right:5px;"></i>` : ''}
      <div class="card-actions">
        <a class="btn btn-outline" href="${p.preview}" target="_blank">Prévia do Projeto</a>
        <a class="btn btn-primary" href="${p.repo}" target="_blank">Repositório</a>
      </div>`;
    grid.appendChild(card);
    io.observe(card);
  });
}

// ===== FORMULÁRIO  COM EMAILJS =====
const EMAILJS_PUBLIC_KEY = "S9aBJ2ISTkcA_j2kq";  // sua Public Key
const EMAILJS_SERVICE_ID = "service_1alk4es";    // Service ID
const EMAILJS_TEMPLATE_ID = "template_1mvb84d";  // Template ID

document.addEventListener('DOMContentLoaded', async () => {
  await hydrate();
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Navbar ativa
  const navLinks = $$('.nav a');
  const sections = ['home','projects','about','contact'].map(id => document.getElementById(id));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  // EmailJS
 emailjs.init(EMAILJS_PUBLIC_KEY);

  $('#contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector("button[type='submit']");
    const feedback = $('#formFeedback');

    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      feedback.style.color = "var(--primary-color)";
      feedback.textContent = "Mensagem enviada com sucesso! ✅";
      form.reset();
    } catch (err) {
      console.error(err);
      feedback.style.color = "#ff4d4d";
      feedback.textContent = "Ocorreu um erro ao enviar a mensagem. ❌";
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar";
    }
  });
});
