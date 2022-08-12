// Array of avatars
const avatarArr = [1, 2];

// Renders Home Page
const article = document.querySelector('article');

// Module - Game Board Object
const gameBoard = (() => {
    return {board:[
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],}
})();

// Module - Game State
// Num, Boolean, Num, Num
const gameState = ((currentRound, playerXTurn, xWins, oWins) => {
    return {currentRound: 1, 
        xTurn: true, 
        xWins: 0, 
        yWins: 0,
    };
})();

//Factory - Player Object Constructor
// IN > OUT: String String-URL-Num String String-Human-Computer String > Object
const playerFactory = (symbol, avatar, name, type, color, difficulty) => {
    return {symbol, avatar, name, type, color, difficulty};
};

let playerX = playerFactory('x', '1', '', 'HUMAN', '#000', 0);
let playerO = playerFactory('o', '1', '', 'AI', '#000', 1);

// Renders home page
function renderHome() {
    // Div : contianing Player x VS Player O
    const divContainer = document.createElement('div');
    divContainer.classList.add('container');

        // Player X 
        renderPlayerPicker(divContainer, playerX);
        
        // Div : Vis
        const divVS = document.createElement('div');
        divVS.classList.add('vs-div');
            // P : VS
            const paraVS = document.createElement('p');
            paraVS.classList.add('vs-text');
            paraVS.textContent = "VS";
            divVS.appendChild(paraVS);
        divContainer.appendChild(divVS);
        
        // O Player
        renderPlayerPicker(divContainer, playerO);

     article.appendChild(divContainer);

    // Btn : Play
    const btnPlay = document.createElement('button');
    btnPlay.classList.add("play-btn");
    btnPlay.textContent = "Play";
    btnPlay.addEventListener('click', () => {
        clearArticle();
        renderGame();
    });
    article.appendChild(btnPlay);  
}

// Renders Player Picker
function renderPlayerPicker(container, player) {

    // Div : Player
    const divPlayer = document.createElement('div');
    divPlayer.classList.add(`player`);

        // P : Player X
        const paraPlayer = document.createElement('p');
        paraPlayer.textContent = `Player ${player.symbol.toUpperCase()} : ${player.type}`;
        paraPlayer.classList.add("player-title");
        divPlayer.appendChild(paraPlayer);

        // Div : Boarder
        const divContainer = document.createElement('div');
        divContainer.classList.add('player-boarder');

            // Btn : Avatar Picker
            const BtnAvatar = document.createElement('button');
            BtnAvatar.classList.add('avatar-btn');

                // Img
                    const avatarImg = document.createElement('img');
                    avatarImg.classList.add('avatar-img');
                    avatarImg.setAttribute('src', `icons/${player.type.toLowerCase() + '_' + player.symbol + player.avatar}.svg`);
                    BtnAvatar.append(avatarImg);

                // Modal : Avatar Picker
                BtnAvatar.addEventListener('click', () => {
                    renderAvatarModal(player);
                });

            divContainer.appendChild(BtnAvatar);
            
            // Div : Input Fields
            const divInputs = document.createElement('div');
            divInputs.classList.add('inputs');

                // Input : Name
                const inputName = document.createElement('input');
                inputName.setAttribute('placeholder', 'Name');
                divInputs.appendChild(inputName);

                // Input : Human, Easy AI, Hard AI
                const selectHumanAI = document.createElement('select');
                selectHumanAI.setAttribute('type', 'selector');
                    // First Option : Human
                    const firstOption = document.createElement('option');
                    if (player.type === 'AI') {
                        firstOption.setAttribute('value', (player.difficulty === 1 ? "Easy " : "Hard ") + player.type);
                        firstOption.textContent = (player.difficulty === 1 ? "Easy " : "Hard ") + player.type;
                    } else {
                        firstOption.setAttribute('value', player.type);
                        firstOption.textContent = player.type;
                    }
                    firstOption.addEventListener('click', () => {
                        player.type = firstOption.textContent.includes('Human') ? 'HUMAN' : 'AI';
                        player.difficulty = firstOption.textContent.includes('Easy') ? 1 : 2;
                        clearArticle();
                        renderHome();
                    });
                    selectHumanAI.appendChild(firstOption);
                    
                    // Second Option : Easy AI
                    const secondOption = document.createElement('option');
                    if (player.type === 'AI') {
                        // secondOption.setAttribute('value', 'Human');
                        // secondOption.textContent = "Human";

                        secondOption.setAttribute('value', (player.difficulty === 1 ? "Hard " : "Easy ") + player.type);
                        secondOption.textContent = (player.difficulty === 1 ? "Hard " : "Easy ") + player.type;
                    } else {
                        secondOption.setAttribute('value', 'Easy AI');
                        secondOption.textContent = 'Easy AI';
                    }
                    secondOption.addEventListener('click', () => {
                        player.type = secondOption.textContent.includes('Human') ? 'HUMAN' : 'AI';
                        player.difficulty = secondOption.textContent.includes('Easy') ? 1 : 2;
                        clearArticle();
                        renderHome();
                    });
                    selectHumanAI.appendChild(secondOption);

                    // Third Option : Hard AI
                    const thirdOption = document.createElement('option');
                    if (player.type === 'AI') {
                        // thirdOption.setAttribute('value', (player.difficulty === 1 ? "Hard " : "Easy ") + player.type);
                        // thirdOption.textContent = (player.difficulty === 1 ? "Hard " : "Easy ") + player.type;

                        thirdOption.setAttribute('value', 'Human');
                        thirdOption.textContent = "Human";
                    } else {
                        thirdOption.setAttribute('value', 'Hard AI');
                        thirdOption.textContent = 'Hard AI';
                    }
                    thirdOption.addEventListener('click', () => {
                        player.type = thirdOption.textContent.includes('Human') ? 'HUMAN' : 'AI';
                        player.difficulty = thirdOption.textContent.includes('Easy') ? 1 : 2;
                        clearArticle();
                        renderHome();
                    });
                    selectHumanAI.appendChild(thirdOption);

                divInputs.appendChild(selectHumanAI);

                // Div : Color Wheel Picker
                const divColor = document.createElement('divColor');
                divColor.classList.add("div-color");

                    // Input : Color Wheel Picker
                    const inputColorPicker = document.createElement('input');
                    inputColorPicker.setAttribute('type', 'color');
                    divColor.appendChild(inputColorPicker);
                
                    const labelColorPicker = document.createElement('label');
                    labelColorPicker.textContent = "Color";
                    divColor.appendChild(labelColorPicker);
                divInputs.appendChild(divColor);

            divContainer.appendChild(divInputs);
        divPlayer.appendChild(divContainer);
    container.appendChild(divPlayer);
}

// Create modal to select an avatar
function renderAvatarModal(player) {
    // Div Background
    const background = document.createElement('div');
    background.classList.add('background');

        // Div : Avatar Modal
        const avaModal = document.createElement('div');
        avaModal.classList.add('avatar-modal');
        avatarArr.forEach((value) => {
            const ava = document.createElement('img');
            ava.setAttribute('src', `icons/${player.type.toLowerCase() + '_' + player.symbol + value}.svg`);
            ava.addEventListener('click', () => {
                player.avatar = value;
                document.body.removeChild(background);
                clearArticle();
                renderHome();
            });

            // Add Current-avatar class
            if(player.avatar == value) {
                ava.classList.add('current-avatar');
            }
            avaModal.appendChild(ava);
        });
        background.appendChild(avaModal);
    document.body.appendChild(background);
}

// Clear home page 
function clearArticle() {
    while(article.firstChild) {
        article.removeChild(article.firstChild);
    }
}

// Render Game Page
function renderGame() {
    const div = document.createElement('div');
    div.innerHTML = 'hi';
    article.appendChild(div);

    // Player X

    // Div : Board Container
    const divGameBoard = document.createElement('div');
    divGameBoard.classList.add('game-board')
    // Use gameBoard object;
        // 3 by 3 divs
        gameBoard.board.forEach((row, rowIndex) => {
            row.forEach((squareValue, colIndex) => {
                console.log('work');
                const divSquare = document.createElement('div');
                divSquare.classList.add('square');
                divSquare.textContent = squareValue;
                divSquare.addEventListener('click', () => {
                    // Update gameBoard.board[rowIndex, colIndex] with squareValue
                    squareValue = gameState.xTurn ? 'X' : 'O';
                    gameBoard.board[rowIndex][colIndex] = squareValue;

                    // Change player turn
                    gameState.xTurn = !gameState.xTurn;

                    clearArticle();
                    renderGame();
                });
                divGameBoard.appendChild(divSquare);
            });
        });
    article.appendChild(divGameBoard);
}

renderHome();
// renderGame();