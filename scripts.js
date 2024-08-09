const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');
const addCardButton = document.getElementById('addCardButton');

const cards = [
    { question: 'What is HTML?', answer: 'HyperText Markup Language' },
    { question: 'What is CSS?', answer: 'Cascading Style Sheets' },
    { question: 'What is JavaScript?', answer: 'A programming language for the web' },
];

let currentCardIndex = 0;

function displayCard(index) {
    const card = cards[index];
    flashcard.querySelector('.front').textContent = card.question;
    flashcard.querySelector('.back').textContent = card.answer;
}

function flipCard() {
    flashcard.classList.toggle('flip');
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    displayCard(currentCardIndex);
    flashcard.classList.remove('flip');
}

function addCard() {
    const question = prompt('Enter the question:');
    const answer = prompt('Enter the answer:');
    if (question && answer) {
        cards.push({ question, answer });
    }
}

flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);
addCardButton.addEventListener('click', addCard);

displayCard(currentCardIndex);
