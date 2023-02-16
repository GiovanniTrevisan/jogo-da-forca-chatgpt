// definir as variáveis globais
let secretWord;
let guessedLetters;
let guessesRemaining;
let message;
let guessInput;
let guessButton;
let resetButton;
let secretWordElement;
let guessesRemainingElement;
let messageElement;

// lista de palavras

let words = [];

fetch('https://api.dicionario-aberto.net/words')
    .then(response => response.json())
    .then(data => {
        const portugueseWords = data.map(word => word.word);
        words.push(...portugueseWords);
    })
    .catch(error => console.error(error));

// inicializar o jogo
function init() {
    // selecionar os elementos HTML
    secretWordElement = document.getElementById("secret-word");
    guessesRemainingElement = document.getElementById("guesses-remaining");
    messageElement = document.getElementById("message");
    guessInput = document.getElementById("guess-input");
    guessButton = document.getElementById("guess-button");
    resetButton = document.getElementById("reset-button");

    // adicionar listeners aos botões
    guessButton.addEventListener("click", makeGuess);
    resetButton.addEventListener("click", resetGame);

    // escolher uma palavra aleatória
    secretWord = words[Math.floor(Math.random() * words.length)];

    // inicializar o array de letras adivinhadas
    guessedLetters = [];

    // inicializar o número de tentativas restantes
    guessesRemaining = 6;

    // exibir o número de tentativas restantes
    displayGuessesRemaining();

    // exibir a palavra oculta
    displaySecretWord();
}

// exibir a palavra oculta
function displaySecretWord() {
    let displayWord = "";
    for (let i = 0; i < secretWord.length; i++) {
        if (guessedLetters.includes(secretWord[i])) {
            displayWord += secretWord[i];
        } else {
            displayWord += "_";
        }
    }
    secretWordElement.textContent = displayWord;
}

// exibir o número de tentativas restantes
function displayGuessesRemaining() {
    guessesRemainingElement.textContent = guessesRemaining;
}

// fazer uma tentativa de adivinhar uma letra
function makeGuess() {
    // obter a letra adivinhada
    const guess = guessInput.value.toLowerCase();


    // limpar o input de adivinhação
    guessInput.value = "";

    // validar a entrada do usuário
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        messageElement.textContent = "Por favor, digite uma letra válida.";
        return;
    }

    // verificar se a letra já foi adivinhada
    if (guessedLetters.includes(guess)) {
        messageElement.textContent = "Você já adivinhou essa letra.";
        return;
    }

    // adicionar a letra adivinhada ao array de letras adivinhadas
    guessedLetters.push(guess);

    // verificar se a letra adivinhada está na palavra secreta
    if (secretWord.includes(guess)) {

        // exibir a letra adivinhada na palavra oculta
        displaySecretWord();
        messageElement.textContent = "Você acertou!";
    }
    else {
        guessesRemaining--;
        displayGuessesRemaining();
        messageElement.textContent = "Você errou.";
        if (guessesRemaining === 0) {
            messageElement.textContent = "Você perdeu.A palavra era" + secretWord + ".";
            guessButton.disabled = true;
        }
    }
}

// reiniciar o jogo
function resetGame() {
    // escolher uma palavra aleatória
    secretWord = words[Math.floor(Math.random() * words.length)];

    // inicializar o array de letras adivinhadas
    guessedLetters = [];

    // inicializar o número de tentativas restantes
    guessesRemaining = 6;

    // exibir o número de tentativas restantes
    displayGuessesRemaining();

    // exibir a palavra oculta
    displaySecretWord();

    // reativar o botão de adivinhar
    guessButton.disabled = false;

    // limpar a mensagem de erro
    messageElement.textContent = "";
}

// inicializar o jogo
init();