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
const gameState = (() => {
    return {
        currentRound: 1, 
        xTurn: true, 
        xWins: 0, 
        oWins: 0,
        roundOver: false,
    };
})();

//Factory - Player Object Constructor
// IN > OUT: String String-URL-Num String String-Human-Computer String > Object
const playerFactory = (symbol, avatar, name, type, color, difficulty) => {
    return {symbol, avatar, name, type, color, difficulty};
};

let playerX = playerFactory('X', '1', '', 'HUMAN', '#000', 0);
let playerO = playerFactory('O', '1', '', 'AI', '#000', 1);

// Renders home page
function renderHome() {
    article.removeAttribute('class');
    article.classList.add('home-article');

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
    article.removeAttribute('class');
    article.classList.add('game-article');
    // Player X

    // Div : Board Container
    const divGameBoard = document.createElement('div');
    divGameBoard.classList.add('game-board')
    // Use gameBoard object;
        // 3 by 3 divs
        gameBoard.board.forEach((row, rowIndex) => {
            row.forEach((squareValue, colIndex) => {
                const divSquare = document.createElement('div');
                divSquare.classList.add('square');
                    // Para : Symbol
                    const paraSymbol = document.createElement('para');
                    paraSymbol.classList.add('symbol');
                    paraSymbol.textContent = squareValue;
                    divSquare.appendChild(paraSymbol);
                divSquare.addEventListener('click', () => {
                    addMarkToBoard(rowIndex,colIndex);
                    clearArticle();
                    renderGame();
                });
                divGameBoard.appendChild(divSquare);
            });
        });
    article.appendChild(divGameBoard);

    console.log(checkRoundOver());
    console.log("X Wins: " + gameState.xWins + ", O Wins: " + gameState.oWins);

    //Check if Round Over
    // if(checkRoundOver()) {

    // }
}

// Adds a Mark to the Board
// In > Out : Num Num > Undefined
function addMarkToBoard(x,y) {
    // Determing the Symbol to be assigned
    squareValue = gameState.xTurn ? 'X' : 'O'

    if(gameBoard.board[x][y] != 'X' && gameBoard.board[x][y] != 'O') {
        // ad squareValue to board
        gameBoard.board[x][y] = squareValue;

        // Other play's turn
        gameState.xTurn = !gameState.xTurn;
    }
}

// Function that determines if round is over
// In > Out :
// Round over Options :
    // Player X Wins (Three X in a row)
    // Player O Wins (Three O in a row)
    // Tie (All board squares are full)
function checkRoundOver() {
    // set game board to alt variable
    let b = gameBoard.board;

    // Arr of symbols to each
    let symbolArr = [playerO.symbol, playerX.symbol];

    symbolArr.forEach((symbol) => {
        // b[y][x]
        // Left to Right
        if(b[0][0] === symbol && b[0][1] === symbol && b[0][2] === symbol) {
            // (0,0) (0,1) (0,2)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        } else if(b[1][0] === symbol && b[1][1] === symbol && b[1][2] === symbol) {
            // (1,0) (1,1) (1,2)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        } else if(b[2][0] === symbol && b[2][1] === symbol && b[2][2] === symbol) {
            // (2,0) (2,1) (2,2)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        }

        // Up to Down
        else if(b[0][0] === symbol && b[1][0] === symbol && b[2][0] === symbol) {
            // (0,0) (1,0) (2,0)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        } else if(b[0][1] === symbol && b[1][1] === symbol && b[2][1] === symbol) {
            // (0,1) (1,1) (2,1)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        } else if(b[0][2] === symbol && b[1][2] === symbol && b[2][2] === symbol) {
            // (0,2) (1,2) (2,2)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        }

        // Back Slash
        else if(b[0][2] === symbol && b[1][1] === symbol && b[2][0] === symbol) {
            // (0,2) (1,1) (2,0)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        }
        
        // Forward Slash
        else if(b[0][0] === symbol && b[1][1] === symbol && b[2][2] === symbol) {
            // (0,0) (1,1) (2,2)
            // increase Player's Score
            playerWins(symbol);
            // Break  Out of Every
            gameState.roundOver = true;
        }
    });
}

// Increase the Win score of a player by 1
// In > Out : Character > Void
function playerWins(symbol) {
    symbol === 'X' ? gameState.xWins += 1: gameState.oWins += 1;
}

// renderHome();
renderGame();