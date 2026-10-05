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
statsPanel.textContent = 'Ходы: 0';

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

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Ваше имя для таблицы лидеров';
nameInput.classList.add('leader-input');

const saveScoreBtn = document.createElement('button');
saveScoreBtn.classList.add('btn');
saveScoreBtn.textContent = 'Сохранить и закрыть';

winContent.appendChild(winTitle);
winContent.appendChild(winText);
winContent.appendChild(nameInput);
winContent.appendChild(saveScoreBtn);
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