// Array of avatars
const avatarArr = [1, 2];

// Renders Home Page
const article = document.querySelector('article');

// Module - Game Board Object
const gameBoard = (() => {
    const resetBoard = (b) => {
        gameBoard.board.forEach((row, rowIndex) => {
            row.forEach((square, squareIndex) => {
                gameBoard.board[rowIndex][squareIndex] = '';
            })
        })
    };

    return {
        board:[
        ['', '', ''],
        ['', '', ''],
        ['', '', '']],
        resetBoard,
    }
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
const playerFactory = (symbol, avatar, name, type, filter, difficulty) => {
    return {symbol, avatar, name, type, filter, difficulty};
};

let playerX = playerFactory('X', '1', 'Default X', 'HUMAN', '', 0);
let playerO = playerFactory('O', '1', 'Default O', 'AI', '', 1);

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
                    avatarImg.classList.add(player.symbol === 'X' ? 'x-img' : 'o-img');
                    avatarImg.setAttribute('src', `./icons/${player.type.toLowerCase() + '_' + player.symbol + player.avatar}.svg`);
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
                    inputColorPicker.classList.add(player.symbol === 'X' ? 'x-color' : 'o-color');
                    inputColorPicker.setAttribute('type', 'color');
                    divColor.appendChild(inputColorPicker);

                    inputColorPicker.addEventListener('change', changeSvgColor, false);

                    // Label : Color
                    const labelColorPicker = document.createElement('label');
                    labelColorPicker.textContent = "Color";
                    divColor.appendChild(labelColorPicker);
                divInputs.appendChild(divColor);

            divContainer.appendChild(divInputs);
        divPlayer.appendChild(divContainer);
    container.appendChild(divPlayer);
}

// Changes the color of SVG images
function changeSvgColor(event) {
    const rgb = hexToRgb(event.target.value);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();

    if(event.target.classList.contains('x-color')) {
        img = document.querySelector('.x-img');
        playerX.filter = result.filter;
    } else {
        img = document.querySelector('.o-img');
        playerO.filter = result.filter;
    }

    img.style = result.filter;
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
            ava.setAttribute('src', `./icons/${player.type.toLowerCase() + '_' + player.symbol + value}.svg`);
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

    // Current Round
    const paraCurrentRound = document.createElement('p');
    paraCurrentRound.classList.add('current-round');
    paraCurrentRound.textContent = "Round: " + gameState.currentRound;
    article.appendChild(paraCurrentRound);

    // Div : Contents
    const divContents = document.createElement('div');
    divContents.classList.add('contents');


        // Player X
        const divPlayerX = document.createElement('div');
        divPlayerX.classList.add('div-player-x');

            // Para : Player X Wins
            const paraPlayerXName = document.createElement('p');
            paraPlayerXName.classList.add('player-x-name');
            paraPlayerXName.textContent = playerX.name;
            divPlayerX.appendChild(paraPlayerXName);

            // Img : Turn Indicator SVG
            const imgPlayerXTurnIndicator = document.createElement('img');
            imgPlayerXTurnIndicator.classList.add('player-x-turn', 'visible');
            imgPlayerXTurnIndicator.setAttribute('src', './icons/turn_indicator.svg');
            divPlayerX.appendChild(imgPlayerXTurnIndicator);

            // Img : Player X Avatar SVG
            const imgPlayerXAvatar = document.createElement('img');
            imgPlayerXAvatar.classList.add('player-x-avatar', 'avatar-img');
            imgPlayerXAvatar.setAttribute('src', `./icons/${playerX.type.toLowerCase() + '_' + playerX.symbol + playerX.avatar}.svg`);
            divPlayerX.appendChild(imgPlayerXAvatar);

            // Para : Player X Wins
            const paraPlayerXWins = document.createElement('p');
            paraPlayerXWins.classList.add('player-x-wins');
            paraPlayerXWins.textContent = gameState.xWins;
            divPlayerX.appendChild(paraPlayerXWins);

            // Btn : Forfeit
            const btnPlayerXForfeit = document.createElement('button');
            btnPlayerXForfeit.classList.add('player-x-wins');
            btnPlayerXForfeit.textContent = 'Forfeit';
            divPlayerX.appendChild(btnPlayerXForfeit);

        divContents.appendChild(divPlayerX);

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

                    // Game Loop That Updates Article
                    divSquare.addEventListener('click', () => {
                        addMarkToBoard(rowIndex,colIndex);
                            // Check if Round Over
                            checkRoundOver();

                            // Do Something when Round Over
                            if(gameState.roundOver) {
                                gameState.currentRound += 1;
                                gameBoard.resetBoard();
                                gameState.roundOver = false;
                            }
                            console.log("X Wins: " + gameState.xWins + ", O Wins: " + gameState.oWins + ", Current Round: " + gameState.currentRound);
                        clearArticle();
                        renderGame();
                    });
                    divGameBoard.appendChild(divSquare);
                });
            });
        divContents.appendChild(divGameBoard);

        // Player O
        const divPlayerO = document.createElement('div');
        divPlayerO.classList.add('div-player-o');
                  // Para : Player X Wins
                  const paraPlayerOName = document.createElement('p');
                  paraPlayerOName.classList.add('player-o-name');
                  paraPlayerOName.textContent = playerO.name;
                  divPlayerO.appendChild(paraPlayerOName);
      
                  // Img : Turn Indicator SVG
                  const imgPlayerOTurnIndicator = document.createElement('img');
                  imgPlayerOTurnIndicator.classList.add('player-o-turn', 'visible');
                  imgPlayerOTurnIndicator.setAttribute('src', './icons/turn_indicator.svg');
                  divPlayerO.appendChild(imgPlayerOTurnIndicator);
      
                  // Img : Player X Avatar SVG
                  const imgPlayerOAvatar = document.createElement('img');
                  imgPlayerOAvatar.classList.add('player-o-avatar', 'avatar-img');
                  imgPlayerOAvatar.setAttribute('src', `./icons/${playerO.type.toLowerCase() + '_' + playerO.symbol + playerO.avatar}.svg`);
                  divPlayerO.appendChild(imgPlayerOAvatar);
      
                  // Para : Player X Wins
                  const paraPlayerOWins = document.createElement('p');
                  paraPlayerOWins.classList.add('player-o-wins');
                  paraPlayerOWins.textContent = gameState.oWins;
                  divPlayerO.appendChild(paraPlayerOWins);
      
                  // Btn : Forfeit
                  const btnPlayerOForfeit = document.createElement('button');
                  btnPlayerOForfeit.classList.add('player-o-wins');
                  btnPlayerOForfeit.textContent = 'Forfeit';
                  divPlayerO.appendChild(btnPlayerOForfeit);
        divContents.appendChild(divPlayerO);
    article.appendChild(divContents);
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

renderHome();
// renderGame();





/* Not My Code */
'use strict';

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}