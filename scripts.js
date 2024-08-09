const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const addCardButton = document.getElementById('addCardButton');
const clearCardsButton = document.getElementById('clearCardsButton');
const editCardButton = document.getElementById('editCardButton');
const shuffleButton = document.getElementById('shuffleButton');
const cardList = document.getElementById('cardList');

const editCardModal = document.getElementById('editCardModal');
const closeModal = document.querySelector('.modal .close');
const editQuestion = document.getElementById('editQuestion');
const editAnswer = document.getElementById('editAnswer');
const saveEditButton = document.getElementById('saveEditButton');

let cards = JSON.parse(localStorage.getItem('cards')) || [
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

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    displayCard(currentCardIndex);
    flashcard.classList.remove('flip');
}

function addCard() {
    const question = prompt('Enter the question:');
    const answer = prompt('Enter the answer:');
    if (question && answer) {
        cards.push({ question, answer });
        updateCardList();
        saveCards();
    }
}

function clearCards() {
    if (confirm('Are you sure you want to clear all cards?')) {
        cards = [];
        updateCardList();
        saveCards();
        displayCard(0);
    }
}

function editCard() {
    editQuestion.value = cards[currentCardIndex].question;
    editAnswer.value = cards[currentCardIndex].answer;
    editCardModal.style.display = 'block';
}

function saveEdit() {
    if (editQuestion.value && editAnswer.value) {
        cards[currentCardIndex] = { question: editQuestion.value, answer: editAnswer.value };
        updateCardList();
        saveCards();
        displayCard(currentCardIndex);
        editCardModal.style.display = 'none';
    }
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    updateCardList();
    saveCards();
}

function updateCardList() {
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}: ${card.question}`;
        cardList.appendChild(li);
    });
}

function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);
prevButton.addEventListener('click', prevCard);
addCardButton.addEventListener('click', addCard);
clearCardsButton.addEventListener('click', clearCards);
editCardButton.addEventListener('click', editCard);
saveEditButton.addEventListener('click', saveEdit);
shuffleButton.addEventListener('click', shuffleCards);

closeModal.addEventListener('click', () => {
    editCardModal.style.display = 'none';
});

window.onclick = (event) => {
    if (event.target === editCardModal) {
        editCardModal.style.display = 'none';
    }
};

displayCard(currentCardIndex);
updateCardList();
