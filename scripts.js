const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const addCardButton = document.getElementById('addCardButton');
const clearCardsButton = document.getElementById('clearCardsButton');
const editCardButton = document.getElementById('editCardButton');
const saveEditButton = document.getElementById('saveEditButton');
const shuffleButton = document.getElementById('shuffleButton');
const searchButton = document.getElementById('searchButton');
const feedbackButton = document.getElementById('feedbackButton');
const settingsButton = document.getElementById('settingsButton');

const editCardModal = document.getElementById('editCardModal');
const searchModal = document.getElementById('searchModal');
const feedbackModal = document.getElementById('feedbackModal');
const settingsModal = document.getElementById('settingsModal');

const editQuestion = document.getElementById('editQuestion');
const editAnswer = document.getElementById('editAnswer');
const searchQuery = document.getElementById('searchQuery');
const searchResults = document.getElementById('searchResults');
const feedbackText = document.getElementById('feedbackText');
const feedbackStatus = document.getElementById('feedbackStatus');
const themeSelect = document.getElementById('themeSelect');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const applySettingsButton = document.getElementById('applySettingsButton');
const darkModeButton = document.createElement('button');

darkModeButton.textContent = 'Toggle Dark Mode';
darkModeButton.className = 'dark-mode-button';
document.body.appendChild(darkModeButton);

let cards = JSON.parse(localStorage.getItem('cards')) || [];
let currentCardIndex = 0;

function displayCard(index) {
    if (cards.length === 0) return;
    flashcard.querySelector('.front').textContent = cards[index].question;
    flashcard.querySelector('.back').textContent = cards[index].answer;
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
        if (cards.length === 1) displayCard(0);
    }
}

function clearCards() {
    if (confirm('Are you sure you want to clear all cards?')) {
        cards = [];
        updateCardList();
        saveCards();
        flashcard.querySelector('.front').textContent = 'Question?';
        flashcard.querySelector('.back').textContent = 'Answer';
    }
}

function editCard() {
    if (cards.length === 0) return;
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
    const cardList = document.getElementById('cardList');
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

function applySettings() {
    document.body.className = themeSelect.value;
    document.documentElement.style.fontSize = `${fontSize.value}px`;
    fontSizeValue.textContent = `${fontSize.value}px`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
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
feedbackButton.addEventListener('click', () => feedbackModal.style.display = 'block');
settingsButton.addEventListener('click', () => settingsModal.style.display = 'block');
darkModeButton.addEventListener('click', toggleDarkMode);

document.querySelectorAll('.modal .close').forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

window.onload = () => {
    if (cards.length) {
        displayCard(currentCardIndex);
        updateCardList();
    }
};
