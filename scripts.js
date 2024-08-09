const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const addCardButton = document.getElementById('addCardButton');
const clearCardsButton = document.getElementById('clearCardsButton');
const editCardButton = document.getElementById('editCardButton');
const shuffleButton = document.getElementById('shuffleButton');
const searchButton = document.getElementById('searchButton');
const cardList = document.getElementById('cardList');
const searchModal = document.getElementById('searchModal');
const closeSearchModal = document.querySelector('.modal .close-search');
const searchQuery = document.getElementById('searchQuery');
const searchResults = document.getElementById('searchResults');
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackModal = document.querySelector('.modal .close-feedback');
const feedbackText = document.getElementById('feedbackText');
const submitFeedbackButton = document.getElementById('submitFeedbackButton');
const feedbackStatus = document.getElementById('feedbackStatus');

const editCardModal = document.getElementById('editCardModal');
const closeEditCardModal = document.querySelector('.modal .close');
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
    cards[currentCardIndex].question = editQuestion.value;
    cards[currentCardIndex].answer = editAnswer.value;
    updateCardList();
    saveCards();
    editCardModal.style.display = 'none';
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    updateCardList();
    displayCard(currentCardIndex);
    flashcard.classList.remove('flip');
}

function searchCards() {
    const query = searchQuery.value.toLowerCase();
    searchResults.innerHTML = '';
    cards.forEach(card => {
        if (card.question.toLowerCase().includes(query) || card.answer.toLowerCase().includes(query)) {
            const resultItem = document.createElement('li');
            resultItem.textContent = `Q: ${card.question} | A: ${card.answer}`;
            searchResults.appendChild(resultItem);
        }
    });
    searchModal.style.display = 'block';
}

function updateCardList() {
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Q: ${card.question} | A: ${card.answer}`;
        cardList.appendChild(listItem);
    });
}

function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function submitFeedback() {
    const feedback = feedbackText.value;
    if (feedback.trim()) {
        feedbackStatus.textContent = 'Feedback submitted successfully!';
        feedbackStatus.style.color = 'green';
        feedbackText.value = '';
    } else {
        feedbackStatus.textContent = 'Feedback cannot be empty.';
        feedbackStatus.style.color = 'red';
    }
}

flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);
prevButton.addEventListener('click', prevCard);
addCardButton.addEventListener('click', addCard);
clearCardsButton.addEventListener('click', clearCards);
editCardButton.addEventListener('click', editCard);
saveEditButton.addEventListener('click', saveEdit);
shuffleButton.addEventListener('click', shuffleCards);
searchButton.addEventListener('click', searchCards);
submitFeedbackButton.addEventListener('click', submitFeedback);

closeEditCardModal.addEventListener('click', () => {
    editCardModal.style.display = 'none';
});

closeSearchModal.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

closeFeedbackModal.addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

window.onload = () => {
    if (cards.length) {
        displayCard(currentCardIndex);
        updateCardList();
    }
};
