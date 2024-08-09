const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const addCardButton = document.getElementById('addCardButton');
const clearCardsButton = document.getElementById('clearCardsButton');
const editCardButton = document.getElementById('editCardButton');
const shuffleButton = document.getElementById('shuffleButton');
const searchButton = document.getElementById('searchButton');
const feedbackButton = document.getElementById('feedbackButton');
const settingsButton = document.getElementById('settingsButton');
const editCardModal = document.getElementById('editCardModal');
const searchModal = document.getElementById('searchModal');
const feedbackModal = document.getElementById('feedbackModal');
const settingsModal = document.getElementById('settingsModal');
const closeEditCardModal = editCardModal.querySelector('.close');
const closeSearchModal = searchModal.querySelector('.close');
const closeFeedbackModal = feedbackModal.querySelector('.close');
const closeSettingsModal = settingsModal.querySelector('.close');
const saveEditButton = document.getElementById('saveEditButton');
const searchQuery = document.getElementById('searchQuery');
const searchResults = document.getElementById('searchResults');
const submitFeedbackButton = document.getElementById('submitFeedbackButton');
const feedbackText = document.getElementById('feedbackText');
const feedbackStatus = document.getElementById('feedbackStatus');
const applySettingsButton = document.getElementById('applySettingsButton');
const themeSelect = document.getElementById('themeSelect');
const fontSizeRange = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');

let cards = []; // Store cards in an array
let currentIndex = 0;

// Add event listeners
flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateFlashcard();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateFlashcard();
});

addCardButton.addEventListener('click', () => {
    const question = prompt('Enter the question:');
    const answer = prompt('Enter the answer:');
    if (question && answer) {
        cards.push({ question, answer });
        updateCardList();
    }
});

clearCardsButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all cards?')) {
        cards = [];
        updateCardList();
    }
});

editCardButton.addEventListener('click', () => {
    editCardModal.style.display = 'block';
});

saveEditButton.addEventListener('click', () => {
    const question = document.getElementById('editQuestion').value;
    const answer = document.getElementById('editAnswer').value;
    if (question && answer) {
        cards[currentIndex] = { question, answer };
        updateFlashcard();
        updateCardList();
        editCardModal.style.display = 'none';
    }
});

shuffleButton.addEventListener('click', () => {
    cards.sort(() => Math.random() - 0.5);
    updateCardList();
});

searchButton.addEventListener('click', () => {
    const query = searchQuery.value.toLowerCase();
    const results = cards.filter(card => card.question.toLowerCase().includes(query) || card.answer.toLowerCase().includes(query));
    displaySearchResults(results);
    searchModal.style.display = 'block';
});

submitFeedbackButton.addEventListener('click', () => {
    const feedback = feedbackText.value;
    if (feedback) {
        feedbackStatus.textContent = 'Feedback submitted successfully!';
        feedbackText.value = '';
    }
});

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

applySettingsButton.addEventListener('click', () => {
    const theme = themeSelect.value;
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    document.body.style.fontSize = `${fontSizeRange.value}px`;
    fontSizeValue.textContent = `${fontSizeRange.value}px`;
    settingsModal.style.display = 'none';
});

fontSizeRange.addEventListener('input', () => {
    fontSizeValue.textContent = `${fontSizeRange.value}px`;
});

// Modal close functionality
closeEditCardModal.addEventListener('click', () => {
    editCardModal.style.display = 'none';
});

closeSearchModal.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

closeFeedbackModal.addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

closeSettingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Utility functions
function updateFlashcard() {
    const card = cards[currentIndex];
    flashcard.querySelector('.front').textContent = card.question;
    flashcard.querySelector('.back').textContent = card.answer;
}

function updateCardList() {
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = `${card.question} - ${card.answer}`;
        cardList.appendChild(li);
    });
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(card => {
        const li = document.createElement('li');
        li.textContent = `${card.question} - ${card.answer}`;
        searchResults.appendChild(li);
    });
}
