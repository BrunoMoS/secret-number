# 🎯 Jogo do Número Secreto

Um jogo interativo de navegador onde o jogador tenta adivinhar um número secreto gerado aleatoriamente, com feedback por voz utilizando o ResponsiveVoice.

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Jogar](#como-jogar)
- [Como Executar](#como-executar)

---

## Sobre

O Jogo do Número Secreto desafia o jogador a adivinhar um número entre 1 e 10. Após cada tentativa, o jogo fornece uma dica dizendo se o número secreto é maior ou menor. O jogo também registra quantas tentativas foram necessárias para encontrar a resposta correta.

---

## Funcionalidades

- 🔢 Geração de números aleatórios sem repetição até que todos os números tenham sido sorteados
- 🔊 Feedback por voz usando ResponsiveVoice (Português Brasileiro)
- 💡 Dicas de maior/menor após cada tentativa errada
- 🔄 Opção de reiniciar após acertar o número
- ♿ Interface acessível e responsiva

---

## Tecnologias

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura da página |
| CSS3 | Estilização e layout |
| JavaScript | Lógica do jogo |
| [ResponsiveVoice](https://responsivevoice.org/) | Feedback por texto em voz |

---

## Estrutura do Projeto

```
jogo-numero-secreto/
│
├── index.html       # Estrutura principal do HTML
├── style.css        # Estilos visuais
└── app.js           # Lógica do jogo (JavaScript)
```

---

## Como Jogar

1. Um número secreto entre **1 e 10** é escolhido aleatoriamente
2. Digite seu palpite no campo de entrada
3. Clique em **Chutar** para confirmar
4. O jogo informará se o número secreto é **maior** ou **menor**
5. Continue tentando até descobrir o número correto
6. Ao acertar, o jogo exibe quantas tentativas foram necessárias
7. Clique em **Novo Jogo** para jogar novamente

---

## Como Executar

Nenhuma instalação ou dependência é necessária. Basta clonar o repositório e abrir o arquivo no navegador:

```bash
git clone https://github.com/seu-usuario/jogo-numero-secreto.git
cd jogo-numero-secreto
```

Em seguida, abra o arquivo `index.html` em qualquer navegador moderno.

> ⚠️ É necessária conexão com a internet para que a biblioteca ResponsiveVoice funcione (carregada via CDN).

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).
