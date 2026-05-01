const NumberGenerator = {
  generate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

/*
O que faz: Sorteia um número inteiro entre min e max.
Como funciona o cálculo:
Math.random() gera um número decimal entre 0 e 0.999...
Multiplicar por (max - min + 1) estica esse intervalo (ex: para 1–10, multiplica por 10)
Math.floor() arredonda para baixo, eliminando a parte decimal
Somar min garante que o número nunca fique abaixo do mínimo
*/

const GameState = {
  secretNumber: null,  // o número que o jogador precisa adivinhar
  attempts: 0,         // quantas tentativas já foram feitas
  isGameOver: false,   // se o jogo acabou ou não
  min: 1,              // menor número possível
  max: 10,             // maior número possível

  init() {
    this.secretNumber = NumberGenerator.generate(this.min, this.max);
    this.attempts = 0;
    this.isGameOver = false;
  },

  /*
  O que faz: Reinicia o jogo do zero — sorteia um novo número secreto e zera o contador de tentativas.
  */

  registerAttempt(guess) {
    this.attempts++;
    if (guess === this.secretNumber) {
      this.isGameOver = true;
      return "win";
    }
    return guess < this.secretNumber ? "low" : "high";
  },
};

/*
O que faz: Registra uma tentativa do jogador e devolve o resultado.
Incrementa (++) o contador de tentativas
Se acertou → marca o jogo como encerrado e retorna "win"
Se errou → retorna "low" (chute muito baixo) ou "high" (chute muito alto)
💡 O operador ternário condição ? valorSeVerdadeiro : valorSeFalso é um if/else resumido numa linha.
*/

const FeedbackService = {
  getMessage(result, attempts, secretNumber) {
    const word = attempts === 1 ? "tentativa" : "tentativas";
    const map = {
      win: `Acertou! O número secreto era ${secretNumber} e você descobriu em ${attempts} ${word}!`,
      low: "O número secreto é maior! Tente novamente.",
      high: "O número secreto é menor! Tente novamente.",
      invalid: `Digite um número válido entre ${GameState.min} e ${GameState.max}.`,
    };
    return map[result];
  },
};

/*
O que faz: Recebe o resultado ("win", "low", "high" ou "invalid") e devolve a frase certa para o jogador.
O objeto map funciona como uma tabela de consulta — em vez de vários if/else, você acessa diretamente pelo nome da chave
map[result] busca a mensagem correspondente ao resultado
*/

const VoiceService = {
  speak(message) {
    if (typeof responsiveVoice !== "undefined") {
      if('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "pt-BR";
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn("Web speech API não é suportado neste navegador.");
      }
    }
  },
};

/*
O que faz: Lê a mensagem em voz alta usando a API de síntese de voz do navegador.
Antes de usar, verifica se o navegador suporta a funcionalidade ('speechSynthesis' in window)
lang = "pt-BR" define o sotaque brasileiro
rate = 1.2 deixa a fala um pouco mais rápida que o normal (1.0)
*/

const UI = {
  input: document.querySelector(".container__input"),
  paragraph: document.querySelector(".paragraph_text"),
  kickButton: document.getElementById("kick"),
  restartButton: document.getElementById("restart"),

  getInputValue() {
    return Number(this.input.value);
  },

  clearInput() {
    this.input.value = "";
    this.input.focus();
  },

  setMessage(message) {
    this.paragraph.textContent = message;
  },

  setGameOver(isOver) {
    this.input.disabled = isOver;
    this.kickButton.disabled = isOver;
    this.restartButton.disabled = !isOver;
  },

  reset() {
    this.clearInput();
    this.setMessage(`Escolha um número entre ${GameState.min} e ${GameState.max}`);
    this.setGameOver(false);
  },
};

/*
Centraliza tudo que aparece na tela e como o jogador interage.
getInputValue()Lê o número digitado pelo usuário
clearInput()Limpa o campo de texto e coloca o cursor nele
setMessage(msg)Exibe uma mensagem no parágrafo da tela
setGameOver(isOver)Desabilita/habilita botões conforme o estado do jogo
reset()Restaura a tela para o estado inicial
*/

const GameController = {
  start() {
    GameState.init();
    UI.reset();
  },

  handleGuess() {
    const guess = UI.getInputValue();
    const { min, max, attempts, secretNumber } = GameState;

    if (!guess || guess < min || guess > max) {
      const msg = FeedbackService.getMessage("invalid");
      UI.setMessage(msg);
      VoiceService.speak(msg);
      UI.clearInput();
      return;
    }

    const result = GameState.registerAttempt(guess);
    const msg = FeedbackService.getMessage(result, GameState.attempts, secretNumber);

    UI.setMessage(msg);
    VoiceService.speak(msg);
    UI.clearInput();

    if (result === "win") {
      UI.setGameOver(true);
    }
  },
};

/*
É o maestro — coordena o GameState e a UI sem misturar as responsabilidades de cada um.
Reinicia os dados
Reinicia a tela
Valida se o número é válido
Registra a tentativa e recebe o resultado
Gera e exibe a mensagem
Se ganhou, encerrar o jogo
*/

function restartGame() {
  GameController.start();
}

document.getElementById("kick").addEventListener("click", () => {
  GameController.handleGuess();
});

document.querySelector(".container__input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") GameController.handleGuess();
});

/*
O que são eventos? São "escutadores" que aguardam uma ação do usuário para executar uma função.
O primeiro escuta o clique no botão de chutar
O segundo escuta o teclado — se a tecla pressionada for Enter, também processa o chute
*/

GameController.start();
