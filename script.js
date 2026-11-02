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

/* ===== NAVBAR INJETADA ===== */
function injectNavbar() {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
    <header class="header">
      <div class="container nav">
        <a href="index.html" class="logo">
          <img src="https://via.placeholder.com/44x44/0e4d3a/f5a623?text=SH" alt="Sistema Solar Honório">
          <span>Sistema Solar Honório</span>
        </a>
        <button class="menu-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="solucoes.html">Soluções</a></li>
          <li><a href="projetos.html">Projetos</a></li>
          <li><a href="quiz.html">Quiz IA</a></li>
          <li><a href="cadastro.html">Cadastro</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
    </header>
  `;
}

/* ===== FOOTER INJETADO ===== */
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

/* ===== CHAT INJETADO ===== */
function injectChat() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="chat-widget">
      <button class="chat-toggle" id="chatToggle" aria-label="Abrir chat">
        <i class="fas fa-comments"></i>
      </button>
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <i class="fas fa-robot"></i> Assistente Solar Honório
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="chat-msg bot">Olá! 👋 Sou o assistente da Sistema Solar Honório. Posso ajudar com orçamento, tipos de sistema (ON GRID, OFF GRID, HÍBRIDO, BESS) e agendamento. Como posso ajudar?</div>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chatInput" placeholder="Digite sua mensagem...">
          <button id="chatSend"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

/* ===== MENU MOBILE ===== */
function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle) return;
  toggle.addEventListener('click', () => links.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('active'))
  );
}

/* ===== LINK ATIVO ===== */
function setupActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ===== CONTADORES ===== */
function setupCounters() {
  const stats = document.querySelectorAll('[data-counter]');
  if (!stats.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

/* ===== MÁSCARAS CPF/CNPJ E TELEFONE ===== */
function setupMasks() {
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

  const tel = document.getElementById('telefone');
  if (tel) {
    tel.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        v = v.replace(/^(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
      }
      e.target.value = v;
    });
  }

  const cep = document.getElementById('cep');
  if (cep) {
    cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      v = v.replace(/^(\d{5})(\d)/, '$1-$2');
      e.target.value = v;
    });
  }
}

/* ===== BUSCA CEP (ViaCEP) ===== */
function setupCEP() {
  const cep = document.getElementById('cep');
  if (!cep) return;
  cep.addEventListener('blur', async () => {
    const v = cep.value.replace(/\D/g, '');
    if (v.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${v}/json/`);
      const d = await r.json();
      if (d.erro) { alert('CEP não encontrado.'); return; }
      document.getElementById('endereco').value = d.logradouro + (d.bairro ? ', ' + d.bairro : '');
      document.getElementById('cidade').value = `${d.localidade} - ${d.uf}`;
    } catch { alert('Erro ao buscar CEP.'); }
  });
}

/* ===== VALIDAÇÕES ===== */
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

/* ===== FORM CADASTRO ===== */
function setupForm() {
  const form = document.getElementById('formCadastro');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const doc = document.getElementById('cpfCnpj').value.replace(/\D/g, '');
    const ok = doc.length <= 11 ? validarCPF(doc) : validarCNPJ(doc);
    if (!ok) {
      status.textContent = '⚠️ CPF ou CNPJ inválido. Verifique os dígitos.';
      status.className = 'form-status error';
      return;
    }
    status.textContent = '✅ Cadastro enviado com sucesso! Entraremos em contato em até 24h.';
    status.className = 'form-status success';
    form.reset();
    setTimeout(() => { status.className = 'form-status'; status.textContent = ''; }, 6000);
  });
}

/* ===== QUIZ ===== */
function setupQuiz() {
  const box = document.getElementById('quizBox');
  if (!box) return;

  const dados = [
    {
      q: 'Qual é o seu principal objetivo com a energia solar?',
      ops: ['Reduzir a conta de luz', 'Independência total da rede', 'Backup contra quedas', 'Sustentabilidade']
    },
    {
      q: 'O local possui acesso à rede elétrica?',
      ops: ['Sim, tenho acesso', 'Não, é isolado', 'Tenho, mas é instável']
    },
    {
      q: 'Você precisa de armazenamento em baterias?',
      ops: ['Sim, é essencial', 'Não preciso', 'Talvez no futuro']
    }
  ];

  const rec = {
    'Reduzir a conta de luz': 'ON GRID',
    'Independência total da rede': 'OFF GRID',
    'Backup contra quedas': 'HÍBRIDO',
    'Sustentabilidade': 'ON GRID',
    'Sim, tenho acesso': 'ON GRID',
    'Não, é isolado': 'OFF GRID',
    'Tenho, mas é instável': 'HÍBRIDO',
    'Sim, é essencial': 'BESS',
    'Não preciso': 'ON GRID',
    'Talvez no futuro': 'HÍBRIDO'
  };

  let atual = 0;
  const respostas = [];

  const render = () => {
    if (atual >= dados.length) {
      const contagem = {};
      respostas.forEach(r => { contagem[r] = (contagem[r] || 0) + 1; });
      const melhor = Object.keys(contagem).reduce((a, b) => contagem[a] >= contagem[b] ? a : b);
      box.innerHTML = `
        <div class="quiz-result">
          <h3>✅ Recomendação da IA</h3>
          <p style="color:var(--gray);">Com base nas suas respostas, o sistema ideal para você é:</p>
          <div class="result-badge">${melhor}</div>
          <p style="color:var(--gray); margin-bottom:1.5rem;">Fale com nosso time para um projeto detalhado.</p>
          <a href="cadastro.html" class="btn btn-primary">Solicitar Orçamento</a>
          <button class="btn btn-outline" style="margin-left:0.5rem; border-color:var(--primary); color:var(--primary);" onclick="location.reload()">Refazer Quiz</button>
        </div>
      `;
      return;
    }
    const d = dados[atual];
    box.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width:${((atual) / dados.length) * 100}%"></div>
      </div>
      <p style="font-size:0.85rem; color:var(--gray); margin-bottom:0.6rem;">Pergunta ${atual + 1} de ${dados.length}</p>
      <div class="quiz-question">${d.q}</div>
      <div class="quiz-options">
        ${d.ops.map(o => `<div class="quiz-option" data-opt="${o}">${o}</div>`).join('')}
      </div>
    `;
    box.querySelectorAll('.quiz-option').forEach(el => {
      el.addEventListener('click', () => {
        respostas.push(rec[el.dataset.opt]);
        atual++;
        render();
      });
    });
  };
  render();
}

/* ===== CHAT BOT ===== */
function setupChat() {
  const toggle = document.getElementById('chatToggle');
  const win = document.getElementById('chatWindow');
  if (!toggle) return;
  const msgs = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');

  toggle.addEventListener('click', () => win.classList.toggle('open'));

  const add = (text, who) => {
    const d = document.createElement('div');
    d.className = `chat-msg ${who}`;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const responder = (txt) => {
    const t = txt.toLowerCase();
    let r = 'Posso te ajudar com: orçamento, ON GRID, OFF GRID, HÍBRIDO, BESS, economia e agendamento. O que você gostaria?';
    if (t.includes('orçamento') || t.includes('preço') || t.includes('custo') || t.includes('valor'))
      r = 'Para um orçamento personalizado, acesse a página "Cadastro" e preencha seus dados. Respondemos em até 24h!';
    else if (t.includes('on grid'))
      r = 'O sistema ON GRID conecta-se à rede elétrica. Você gera energia e injeta o excedente, ganhando créditos na conta.';
    else if (t.includes('off grid'))
      r = 'O OFF GRID é independente, usando baterias. Ideal para locais sem acesso à rede.';
    else if (t.includes('híbrido') || t.includes('hibrido'))
      r = 'O HÍBRIDO combina rede + baterias, oferecendo segurança contra quedas e flexibilidade.';
    else if (t.includes('bess') || t.includes('bateria'))
      r = 'BESS é armazenamento em baterias de lítio — ótimo para backup e melhor aproveitamento.';
    else if (t.includes('economia') || t.includes('economizo'))
      r = 'Clientes ON GRID economizam em média até 95% da conta de luz. Faça uma simulação no cadastro!';
    else if (t.includes('visita') || t.includes('agendar'))
      r = 'Podemos agendar uma visita gratuita. Envie seu contato em "Contato" ou pelo formulário de cadastro.';
    else if (t.includes('obrigado') || t.includes('obrigada'))
      r = 'Por nada! ☀️ Qualquer dúvida, estou aqui.';
    setTimeout(() => add(r, 'bot'), 600);
  };

  const enviar = () => {
    const t = input.value.trim();
    if (!t) return;
    add(t, 'user');
    input.value = '';
    responder(t);
  };
  send.addEventListener('click', enviar);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') enviar(); });
}
