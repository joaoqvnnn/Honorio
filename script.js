/* =========================================================
   SISTEMA SOLAR HONÓRIO — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  injectChat();
  setupMenu();
  setupActiveLink();
  setupCounters();
  setupMasks();
  setupCEP();
  setupForm();
  setupQuiz();
  setupChat();
});

/* =========================================================
   NAVBAR
   ========================================================= */
function injectNavbar() {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
    <header class="header">
      <div class="container nav">
        <a href="index.html" class="logo">
          <img src="https://via.placeholder.com/44x44/0e4d3a/f5a623?text=SH" alt="Logo Sistema Solar Honório">
          <span>Sistema Solar Honório</span>
        </a>
        <button class="menu-toggle" aria-label="Abrir menu"><i class="fas fa-bars"></i></button>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="solucoes.html">Soluções</a></li>
          <li><a href="projetos.html">Projetos</a></li>
          <li><a href="quiz.html">Descubra seu Sistema</a></li>
          <li><a href="cadastro.html">Cadastro</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
    </header>
  `;
}

/* =========================================================
   FOOTER
   ========================================================= */
function injectFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>Sistema Solar Honório</h4>
            <p style="margin-bottom:1rem;">Energia que você confia. Soluções em energia solar fotovoltaica em Mandaguari-PR, Maringá-PR e região.</p>
            <p><i class="fas fa-sun" style="color:var(--secondary);"></i> +2500 kW instalados</p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="sobre.html">Sobre Nós</a></li>
              <li><a href="solucoes.html">Soluções</a></li>
              <li><a href="projetos.html">Projetos</a></li>
              <li><a href="cadastro.html">Cadastro</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><i class="fas fa-phone"></i> (44) 99999-9999</li>
              <li><i class="fas fa-envelope"></i> contato@sistemasolarhonorio.com.br</li>
              <li><i class="fas fa-map-marker-alt"></i> Mandaguari – PR</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; ${new Date().getFullYear()} Sistema Solar Honório · Todos os direitos reservados
        </div>
      </div>
    </footer>
  `;
}

/* =========================================================
   CHAT / PAINEL DE CONTATO (INJETADO NO BODY)
   ========================================================= */
function injectChat() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="chat-widget">
      <button class="chat-toggle" id="chatToggle" aria-label="Abrir contato">
        <i class="fas fa-comment-dots"></i>
      </button>
      <div class="chat-panel" id="chatPanel">
        <div class="chat-panel-header">
          <div>
            <strong>Fale com a gente</strong>
            <span>Resposta em até 24h</span>
          </div>
          <button class="chat-close" id="chatClose" aria-label="Fechar"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-panel-body">
          <a href="https://wa.me/5544999999999" target="_blank" rel="noopener" class="chat-action whatsapp">
            <i class="fab fa-whatsapp"></i>
            <div>
              <strong>WhatsApp</strong>
              <span>(44) 99999-9999</span>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="tel:+5544999999999" class="chat-action">
            <i class="fas fa-phone"></i>
            <div>
              <strong>Ligar</strong>
              <span>(44) 99999-9999</span>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="mailto:contato@sistemasolarhonorio.com.br" class="chat-action">
            <i class="fas fa-envelope"></i>
            <div>
              <strong>E-mail</strong>
              <span>contato@sistemasolarhonorio.com.br</span>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="cadastro.html" class="chat-action">
            <i class="fas fa-file-signature"></i>
            <div>
              <strong>Solicitar orçamento</strong>
              <span>Preencha em 1 minuto</span>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function setupChat() {
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  if (close) close.addEventListener('click', () => panel.classList.remove('open'));
}

/* =========================================================
   MENU MOBILE
   ========================================================= */
function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('active'))
  );
}

/* =========================================================
   LINK ATIVO NO MENU
   ========================================================= */
function setupActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) a.classList.add('active');
  });
}

/* =========================================================
   CONTADORES ANIMADOS
   ========================================================= */
function setupCounters() {
  const stats = document.querySelectorAll('[data-counter]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.counter;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur) + suffix;
      }, 20);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

/* =========================================================
   MÁSCARAS (CPF/CNPJ, TELEFONE INTERNACIONAL, CEP)
   ========================================================= */
function setupMasks() {
  /* ---- CPF / CNPJ ---- */
  const cpf = document.getElementById('cpfCnpj');
  if (cpf) {
    cpf.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      }
      e.target.value = v;
    });
  }

  /* ---- TELEFONE COM PAÍS ---- */
  const tel = document.getElementById('telefone');
  const country = document.getElementById('countryCode');
  if (tel && country) {
    const aplicarMascara = () => {
      let v = tel.value.replace(/\D/g, '');

      if (country.value === '+55') {
        v = v.slice(0, 11);
        if (v.length > 10) {
          v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        } else {
          v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        }
      } else {
        v = v.slice(0, 15);
        v = v.replace(/(\d{3})(?=\d)/g, '$1 ');
      }
      tel.value = v.trim().replace(/[-\s]+$/, '');
    };

    tel.addEventListener('input', aplicarMascara);

    country.addEventListener('change', () => {
      tel.value = '';
      const placeholders = {
        '+55': '(44) 99999-9999', '+54': '11 9999-9999',
        '+595': '981 999 999',    '+598': '99 999 999',
        '+1': '(555) 555-5555',   '+351': '912 345 678',
        '+34': '612 345 678',     '+39': '312 345 6789',
        '+49': '1512 3456789',    '+44': '7700 900123',
        '+81': '90 1234 5678',    '+86': '138 1234 5678'
      };
      tel.placeholder = placeholders[country.value] || 'Número';
      tel.focus();
    });
  }

  /* ---- CEP ---- */
  const cep = document.getElementById('cep');
  if (cep) {
    cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      v = v.replace(/^(\d{5})(\d)/, '$1-$2');
      e.target.value = v;
    });
  }
}

/* =========================================================
   BUSCA CEP (ViaCEP) — preenche enquanto digita
   ========================================================= */
function setupCEP() {
  const cep = document.getElementById('cep');
  if (!cep) return;

  let ultimoCep = '';

  cep.addEventListener('input', async () => {
    const v = cep.value.replace(/\D/g, '');
    if (v.length !== 8 || v === ultimoCep) return;
    ultimoCep = v;

    const endereco = document.getElementById('endereco');
    if (endereco) endereco.placeholder = 'Buscando...';

    try {
      const r = await fetch(`https://viacep.com.br/ws/${v}/json/`);
      const d = await r.json();

      if (d.erro) {
        if (endereco) endereco.placeholder = 'CEP não encontrado';
        ultimoCep = '';
        return;
      }

      const set = (id, val) => {
        const el = document.getElementById(id);
        if (el && val) el.value = val;
      };
      set('endereco', d.logradouro);
      set('bairro', d.bairro);
      set('cidade', d.localidade);
      set('estado', d.uf);

      const numero = document.getElementById('numero');
      if (numero) setTimeout(() => numero.focus(), 100);
    } catch {
      if (endereco) endereco.placeholder = 'Erro ao buscar CEP';
    }
  });
}

/* =========================================================
   VALIDAÇÕES CPF / CNPJ
   ========================================================= */
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +cpf[i] * (10 - i);
  let r = (s * 10) % 11;
  if (r === 10) r = 0;
  if (r !== +cpf[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +cpf[i] * (11 - i);
  r = (s * 10) % 11;
  if (r === 10) r = 0;
  return r === +cpf[10];
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  const calc = (base, pesos) => {
    const soma = base.split('').reduce((acc, n, i) => acc + +n * pesos[i], 0);
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = calc(cnpj.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]);
  if (d1 !== +cnpj[12]) return false;
  const d2 = calc(cnpj.slice(0, 13), [6,5,4,3,2,9,8,7,6,5,4,3,2]);
  return d2 === +cnpj[13];
}

/* =========================================================
   FORMULÁRIO DE CADASTRO
   ========================================================= */
function setupForm() {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('formStatus');

    /* --- valida CPF/CNPJ --- */
    const doc = document.getElementById('cpfCnpj').value.replace(/\D/g, '');
    const ok = doc.length <= 11 ? validarCPF(doc) : validarCNPJ(doc);
    if (!ok) {
      status.textContent = 'CPF ou CNPJ inválido.';
      status.className = 'form-status error';
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* --- valida telefone --- */
    const tel = document.getElementById('telefone').value.replace(/\D/g, '');
    const ddi = document.getElementById('countryCode').value;
    if (ddi === '+55' && (tel.length < 10 || tel.length > 11)) {
      status.textContent = 'Telefone inválido.';
      status.className = 'form-status error';
      document.getElementById('telefone').focus();
      return;
    }
    if (ddi !== '+55' && tel.length < 6) {
      status.textContent = 'Telefone inválido.';
      status.className = 'form-status error';
      document.getElementById('telefone').focus();
      return;
    }

    /* --- tudo certo: aqui você pode enviar via fetch para um endpoint --- */
    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      cpfCnpj: document.getElementById('cpfCnpj').value,
      telefoneCompleto: ddi + ' ' + document.getElementById('telefone').value,
      cep: document.getElementById('cep').value,
      endereco: document.getElementById('endereco').value,
      numero: document.getElementById('numero').value,
      complemento: document.getElementById('complemento').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      tipoSistema: document.getElementById('tipoSistema').value,
      mensagem: document.getElementById('mensagem').value
    };
    console.log('📩 Cadastro:', dados);

    status.textContent = 'Enviado! Entraremos em contato em até 24h.';
    status.className = 'form-status success';
    status.scrollIntoView({ behavior: 'smooth', block: 'center' });

    form.reset();
    setTimeout(() => {
      status.className = 'form-status';
      status.textContent = '';
    }, 5000);
  });
}

/* =========================================================
   DESCUBRA SEU SISTEMA (antigo Quiz)
   ========================================================= */
function setupQuiz() {
  const box = document.getElementById('quizBox');
  if (!box) return;

  const perguntas = [
    {
      q: 'O imóvel já tem acesso à rede elétrica?',
      ops: [
        { texto: 'Sim, tenho acesso', valor: 'ON GRID' },
        { texto: 'Não, é isolado', valor: 'OFF GRID' },
        { texto: 'Tenho, mas é instável', valor: 'HÍBRIDO' }
      ]
    },
    {
      q: 'Qual seu principal objetivo?',
      ops: [
        { texto: 'Reduzir a conta de luz', valor: 'ON GRID' },
        { texto: 'Independência total', valor: 'OFF GRID' },
        { texto: 'Ter backup se faltar luz', valor: 'BESS' }
      ]
    },
    {
      q: 'Você quer armazenar energia em baterias?',
      ops: [
        { texto: 'Sim, quero baterias', valor: 'HÍBRIDO' },
        { texto: 'Não, só economizar', valor: 'ON GRID' },
        { texto: 'Talvez no futuro', valor: 'HÍBRIDO' }
      ]
    }
  ];

  const descricoes = {
    'ON GRID': 'Sistema conectado à rede. Reduz sua conta e o excedente vira crédito.',
    'OFF GRID': 'Independência total com baterias. Ideal para locais sem rede.',
    'HÍBRIDO': 'Rede + baterias. Segurança contra quedas e flexibilidade.',
    'BESS': 'Armazenamento em baterias para backup e melhor uso da energia.'
  };

  let i = 0;
  const respostas = [];

  const render = () => {
    /* --- resultado final --- */
    if (i >= perguntas.length) {
      const cont = {};
      respostas.forEach(r => { cont[r] = (cont[r] || 0) + 1; });
      const melhor = Object.keys(cont).reduce((a, b) => cont[a] >= cont[b] ? a : b);

      box.innerHTML = `
        <div class="quiz-result">
          <p style="color:var(--gray); margin-bottom:0.5rem;">O sistema ideal pra você:</p>
          <div class="result-badge">${melhor}</div>
          <p style="color:var(--gray); margin-bottom:2rem;">${descricoes[melhor]}</p>
          <a href="cadastro.html" class="btn btn-primary">Solicitar Orçamento</a>
          <button class="btn btn-outline" style="border-color:var(--primary); color:var(--primary); margin-left:0.5rem;" onclick="location.reload()">Refazer</button>
        </div>
      `;
      return;
    }

    /* --- pergunta --- */
    const p = perguntas[i];
    box.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width:${(i / perguntas.length) * 100}%"></div>
      </div>
      <p style="font-size:0.85rem; color:var(--gray); margin-bottom:0.6rem;">${i + 1} de ${perguntas.length}</p>
      <div class="quiz-question">${p.q}</div>
      <div class="quiz-options">
        ${p.ops.map(o => `<div class="quiz-option" data-valor="${o.valor}">${o.texto}</div>`).join('')}
      </div>
    `;

    box.querySelectorAll('.quiz-option').forEach(el => {
      el.addEventListener('click', () => {
        respostas.push(el.dataset.valor);
        i++;
        render();
      });
    });
  };

  render();
}
