const perguntas = [
  {
    pergunta: "Química: qual é o produto tradicionalmente obtido ao misturar carbono com nitrato de potássio e outros componentes?",
    alternativas: ["Pólvora", "azeite", "nitrôxido de ferro", "sal de cozinha"],
    correta: 0
  },
  {
    pergunta: "QUÍMICA: Qual é a forma mais conhecida para a extração de metais como ouro e lítio ?",
    alternativas: ["acído sufurico", "bicarbonato de cobre", "mercurio", "agua sanitaria"],
    correta: 2
  },
  {
    pergunta: "QUÍMICA: o que é fusão nuclear?",
    alternativas: ["colisão de um atomo intavel", "jução de particula com aceleração/calor", "grande queima de carvão", "a morte de uma estrela de neutrons"],
    correta: 1

  },
  {
    pergunta: "QUÍMICA: Como as industrias conseguem apenas os materiais que querem apartir de elementos quimicos ?",
    alternativas: ["Acídos", "maquinas", "Bases", "Reações eletromagneticas "],
    correta: 0
  },
  {
    pergunta: "QUÍMICA: Qual elemento atomico é criado ARTIFICIALMENTE ?",
    alternativas: ["Tl", "Tc", "Tb", "Ti"],
    correta: 0
  }
];

const premios = [1000, 10000, 100000, 500000, 1000000];
let perguntaAtual = 0;
let premioAtual = 0;
let respondeu = false;
let acertos = 0;

const perguntaE = document.getElementById("pergunta");
const alternativasE = document.getElementById("alternativas");
const mensagemE = document.getElementById("mensagem");
const numeroPerguntaE = document.getElementById("numero-pergunta");
const premioE = document.getElementById("premio");
const proximaBtnE = document.getElementById("proxima");
const barraProgressoE = document.getElementById("barra-progresso");

function formatarDinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function carregarPergunta() {
  respondeu = false;
  proximaBtnE.disabled = true;
  proximaBtnE.textContent = "Próxima pergunta →";
  mensagemE.textContent = "";
  mensagemE.className = "mensagem";
  alternativasE.innerHTML = "";

  const item = perguntas[perguntaAtual];
  perguntaE.textContent = item.pergunta;
  numeroPerguntaE.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
  premioE.textContent = `Prêmio: ${formatarDinheiro(premioAtual)}`;
  barraProgressoE.style.width = `${(perguntaAtual / perguntas.length) * 100}%`;

  item.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "alternativo";
    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = String.fromCharCode(65 + indice);
    const resposta = document.createElement("span");
    resposta.textContent = texto;
    botao.append(letra, resposta);
    botao.addEventListener("click", () => verificarResposta(indice, botao));
    alternativasE.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
  if (respondeu) return;
  respondeu = true;

  const item = perguntas[perguntaAtual];
  const botoes = alternativasE.querySelectorAll(".alternativo");
  botoes.forEach(botao => { botao.disabled = true; });

  if (indiceEscolhido === item.correta) {
    botaoEscolhido.classList.add("correta");
    premioAtual = premios[perguntaAtual] ?? premioAtual;
    acertos++;
    mensagemE.textContent = "🎉 Resposta correta! Mandou muito bem!";
    mensagemE.classList.add("sucesso");
  } else {
    botaoEscolhido.classList.add("errada");
    botoes[item.correta].classList.add("correta");
    mensagemE.textContent = `❌ Não foi dessa vez! A resposta certa era: ${item.alternativas[item.correta]}.`;
    mensagemE.classList.add("falha");
  }

  premioE.textContent = `Prêmio: ${formatarDinheiro(premioAtual)}`;
  barraProgressoE.style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
  proximaBtnE.disabled = false;
  proximaBtnE.focus();
}

function finalizarJogo() {
  perguntaE.textContent = "Desafio concluído!";
  alternativasE.innerHTML = "";
  numeroPerguntaE.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas`;
  premioE.textContent = `Prêmio final: ${formatarDinheiro(premioAtual)}`;
  barraProgressoE.style.width = "100%";
  mensagemE.className = "mensagem sucesso";
  mensagemE.textContent = acertos === perguntas.length
    ? "🏆 Perfeito! Você gabaritou o quiz!"
    : "Valeu por jogar! Que tal tentar de novo para melhorar sua pontuação?";
  proximaBtnE.disabled = false;
  proximaBtnE.textContent = "Jogar novamente ↻";
  proximaBtnE.onclick = reiniciarJogo;
}

function reiniciarJogo() {
  perguntaAtual = 0;
  premioAtual = 0;
  acertos = 0;
  proximaBtnE.onclick = null;
  carregarPergunta();
}

proximaBtnE.addEventListener("click", () => {
  if (proximaBtnE.onclick) return;
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    finalizarJogo();
  }
});

carregarPergunta();
