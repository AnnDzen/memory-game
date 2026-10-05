const header = document.createElement('header');
header.classList.add('game-header');

const headerTitle = document.createElement('div');
headerTitle.classList.add('header-title');
headerTitle.textContent = '🎃 Memory Game';

const headerNav = document.createElement('nav');
headerNav.classList.add('header-nav');

const newGameBtn = document.createElement('button');
newGameBtn.classList.add('btn');
newGameBtn.textContent = 'Новая игра';

const leaderboardBtn = document.createElement('button');
leaderboardBtn.classList.add('btn', 'btn-secondary');
leaderboardBtn.textContent = 'Таблица лидеров';

headerNav.appendChild(newGameBtn);
headerNav.appendChild(leaderboardBtn);
header.appendChild(headerTitle);
header.appendChild(headerNav);
document.body.appendChild(header);

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');

const statsPanel = document.createElement('div');
statsPanel.classList.add('stats-panel');

const movesDisplay = document.createElement('span');
movesDisplay.classList.add('stat-item');
movesDisplay.textContent = 'Ходы: 0';

const pairsDisplay = document.createElement('span');
pairsDisplay.classList.add('stat-item');
pairsDisplay.textContent = 'Пары: 0 из 8';

statsPanel.appendChild(movesDisplay);
statsPanel.appendChild(pairsDisplay);

const gameBoard = document.createElement('div');
gameBoard.classList.add('memory-game');

gameContainer.appendChild(statsPanel);
gameContainer.appendChild(gameBoard);
document.body.appendChild(gameContainer);

const winModal = document.createElement('div');
winModal.classList.add('modal-overlay');

const winContent = document.createElement('div');
winContent.classList.add('modal-content');

const winTitle = document.createElement('h2');
winTitle.textContent = 'Победа! 🎉';

const winText = document.createElement('p');

const winButtonsContainer = document.createElement('div');
winButtonsContainer.style.display = 'flex';
winButtonsContainer.style.gap = '15px';
winButtonsContainer.style.justifyContent = 'center';

const modalNewGameBtn = document.createElement('button');
modalNewGameBtn.classList.add('btn');
modalNewGameBtn.textContent = 'Новая игра';

const modalCloseWinBtn = document.createElement('button');
modalCloseWinBtn.classList.add('btn', 'btn-secondary');
modalCloseWinBtn.textContent = 'Закрыть';

winButtonsContainer.appendChild(modalNewGameBtn);
winButtonsContainer.appendChild(modalCloseWinBtn);
winContent.appendChild(winTitle);
winContent.appendChild(winText);
winContent.appendChild(winButtonsContainer);
winModal.appendChild(winContent);
document.body.appendChild(winModal);


const leaderModal = document.createElement('div');
leaderModal.classList.add('modal-overlay');

const leaderContent = document.createElement('div');
leaderContent.classList.add('modal-content');

const leaderTitle = document.createElement('h2');
leaderTitle.textContent = '🏆 Топ игроков';

const leaderboardList = document.createElement('ul');
leaderboardList.classList.add('leaderboard-list');

const closeLeaderBtn = document.createElement('button');
closeLeaderBtn.classList.add('btn');
closeLeaderBtn.textContent = 'Закрыть';

leaderContent.appendChild(leaderTitle);
leaderContent.appendChild(leaderboardList);
leaderContent.appendChild(closeLeaderBtn);
leaderModal.appendChild(leaderContent);
document.body.appendChild(leaderModal);

const images = [
    'assets/pampkin_1.jpg',
    'assets/pampkin_2.jpg',
    'assets/pampkin_3.jpg',
    'assets/pampkin_4.jpg',
    'assets/pampkin_5.jpg',
    'assets/pampkin_6.jpg',
    'assets/pampkin_7.jpg',
    'assets/pampkin_8.jpg'

];
let cards = [...images, ...images];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesCount = 0;
let movesCount = 0;

function updateStats() {
    movesDisplay.textContent = `Ходы: ${movesCount}`;
    pairsDisplay.textContent = `Пары: ${matchesCount} из 8`;
}

function createBoard() {
    
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    matchesCount = 0;
    movesCount = 0;
    updateStats();

    closeWinModal();



    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

   
    cards.forEach((imageSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.image = imageSrc;

        card.style.animationDelay = `${index * 40}ms`;
        const col = index % 4;
        const row = Math.floor(index / 4);
        const offsetX = (1.5 - col) * 140;
        const offsetY = (1.5 - row) * 140;
        card.style.setProperty('--deal-x', `${offsetX}px`);
        card.style.setProperty('--deal-y', `${offsetY}px`);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Card image';
        cardFront.appendChild(img);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');

        const backImg = document.createElement('img');
        backImg.src = 'assets/autumn.jpg';
        backImg.alt = 'Рубашка карты';
        backImg.classList.add('card-back-image');

        cardBack.appendChild(backImg);
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    movesCount++;
    updateStats();
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchesCount++;
    updateStats();

    if (matchesCount === images.length) {
        saveScoreAutomatically(); 

        setTimeout(() => {
            winText.textContent = `Вы нашли все пары за ${movesCount} ходов!`;
            openWinModal();
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function openWinModal() {
    winModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeWinModal() {
    winModal.classList.remove('show');
    document.body.style.overflow = '';
}

function openLeaderModal() {
    showLeaderboard();
    leaderModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLeaderModal() {
    leaderModal.classList.remove('show');
    document.body.style.overflow = '';
}


modalCloseWinBtn.addEventListener('click', closeWinModal);


winModal.addEventListener('click', (e) => {
    if (e.target === winModal) closeWinModal();
});
leaderModal.addEventListener('click', (e) => {
    if (e.target === leaderModal) closeLeaderModal();
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (winModal.classList.contains('show')) closeWinModal();
        if (leaderModal.classList.contains('show')) closeLeaderModal();
    }
});


createBoard();


newGameBtn.addEventListener('click', createBoard);
modalNewGameBtn.addEventListener('click', createBoard);


leaderboardBtn.addEventListener('click', openLeaderModal);
closeLeaderBtn.addEventListener('click', closeLeaderModal);