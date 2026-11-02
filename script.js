document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  injectChat();
  setupMenu();
  setupActiveLink();
  setupMasks(); // Cuida do CPF e CEP
  setupCEP();
  setupPhone();
  setupForm();
  setupQuiz();
  setupChat();
});

/* NAVBAR E FOOTER */
function injectNavbar() {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
    <header class="header">
      <div class="container nav">
        <a href="index.html" class="logo">
          <img src="https://via.placeholder.com/44x44/0e4d3a/f5a623?text=SH" alt="Logo">
          <span>Sistema Solar Honório</span>
        </a>
        <button class="menu-toggle"><i class="fas fa-bars"></i></button>
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

function injectFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>Sistema Solar Honório</h4>
            <p>Energia que você confia. Soluções em Mandaguari-PR, Maringá-PR e região.</p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><a href="sobre.html">Sobre</a></li>
              <li><a href="solucoes.html">Soluções</a></li>
              <li><a href="projetos.html">Projetos</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>(44) 99999-9999</li>
              <li>contato@sistemasolarhonorio.com.br</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">&copy; ${new Date().getFullYear()} Sistema Solar Honório.</div>
      </div>
    </footer>
  `;
}

function injectChat() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="chat-widget">
      <button class="chat-toggle" id="chatToggle"><i class="fas fa-comment-dots"></i></button>
      <div class="chat-panel" id="chatPanel">
        <div class="chat-panel-header">
          <div><strong>Fale com a gente</strong></div>
          <button class="chat-close" id="chatClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-panel-body">
          <a href="https://wa.me/5544999999999" class="chat-action" target="_blank">
            <i class="fab fa-whatsapp" style="color:#25d366;"></i>
            <div><strong>WhatsApp</strong><span>(44) 99999-9999</span></div>
          </a>
          <a href="cadastro.html" class="chat-action">
            <i class="fas fa-file-signature"></i>
            <div><strong>Orçamento</strong><span>Preencha em 1 minuto</span></div>
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

/* FUNCIONALIDADES */
function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle) return;
  toggle.addEventListener('click', () => links.classList.toggle('active'));
}

function setupActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function setupChat() {
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  if (!toggle) return;
  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  close.addEventListener('click', () => panel.classList.remove('open'));
}

/* MÁSCARAS */
function setupMasks() {
  const cpf = document.getElementById('cpfCnpj');
  if (cpf) {
    cpf.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        v = v.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
      }
      e.target.value = v;
    });
  }

  const cep = document.getElementById('cep');
  if (cep) {
    cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      e.target.value = v.replace(/^(\d{5})(\d)/, '$1-$2');
    });
  }
}

/* CEP VIA CEP */
function setupCEP() {
  const cep = document.getElementById('cep');
  if (!cep) return;
  cep.addEventListener('input', async () => {
    const v = cep.value.replace(/\D/g, '');
    if (v.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${v}/json/`);
      const d = await r.json();
      if (!d.erro) {
        document.getElementById('endereco').value = d.logradouro || '';
        document.getElementById('bairro').value = d.bairro || '';
        document.getElementById('cidade').value = d.localidade || '';
        document.getElementById('estado').value = d.uf || '';
        document.getElementById('numero').focus();
      }
    } catch {}
  });
}

/* =========================================================
   TELEFONE PROFISSIONAL (TODOS OS PAÍSES DO MUNDO)
   ========================================================= */
function setupPhone() {
  const input = document.querySelector("#telefone");
  if (!input || !window.intlTelInput) return;

  // Inicializa a biblioteca oficial
  window.iti = window.intlTelInput(input, {
    initialCountry: "br",
    preferredCountries: ["br", "ar", "py", "uy", "us", "pt"],
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.4/build/js/utils.js",
  });
}

/* VALIDAÇÃO DO FORM */
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

function setupForm() {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('formStatus');

    // Valida CPF/CNPJ
    const doc = document.getElementById('cpfCnpj').value.replace(/\D/g, '');
    const ok = doc.length <= 11 ? validarCPF(doc) : validarCNPJ(doc);
    if (!ok) {
      status.textContent = 'CPF ou CNPJ inválido. Verifique os dígitos.';
      status.className = 'form-status error';
      return;
    }

    // Valida Telefone Internacional
    if (window.iti && !window.iti.isValidNumber()) {
      status.textContent = 'Telefone inválido. Digite o número completo com DDD.';
      status.className = 'form-status error';
      return;
    }

    // Sucesso
    status.textContent = 'Enviado! Entraremos em contato em até 24h.';
    status.className = 'form-status success';
    form.reset();
    if (window.iti) window.iti.setNumber('');
    setTimeout(() => { status.className = 'form-status'; status.textContent = ''; }, 5000);
  });
}

/* QUIZ */
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

  const desc = {
    'ON GRID': 'Sistema conectado à rede. Reduz sua conta e o excedente vira crédito.',
    'OFF GRID': 'Independência total com baterias. Ideal para locais sem rede.',
    'HÍBRIDO': 'Rede + baterias. Segurança contra quedas e flexibilidade.',
    'BESS': 'Armazenamento em baterias para backup e melhor uso da energia.'
  };

  let i = 0;
  const respostas = [];

  const render = () => {
    if (i >= perguntas.length) {
      const cont = {};
      respostas.forEach(r => { cont[r] = (cont[r] || 0) + 1; });
      const melhor = Object.keys(cont).reduce((a, b) => cont[a] >= cont[b] ? a : b);
      box.innerHTML = `
        <div class="quiz-result">
          <p style="color:var(--gray); margin-bottom:0.5rem;">O sistema ideal pra você:</p>
          <div class="result-badge">${melhor}</div>
          <p style="color:var(--gray); margin-bottom:2rem;">${desc[melhor]}</p>
          <a href="cadastro.html" class="btn btn-primary">Solicitar Orçamento</a>
          <button class="btn btn-outline" style="border-color:var(--primary); color:var(--primary); margin-left:0.5rem;" onclick="location.reload()">Refazer</button>
        </div>
      `;
      return;
    }
    const p = perguntas[i];
    box.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${(i / perguntas.length) * 100}%"></div></div>
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
