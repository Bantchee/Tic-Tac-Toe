// get a property of state
const getter = (state) => ({
    get: (name) => state[name],
});

// set a property of state
const setter = (state) => ({
    set: (name, value) => {
        state[name] = value
    },
});

// Render Elements to screen
const render = (state) => ({
    render: (id) => {
        // remove all elements of body
        let article = document.querySelector('article');
        while(article.firstChild) {
            article.removeChild(article.firstChild);
        }

        // Create Children
        if(id === 'game-page') {
            state['page'] = gamePage.createPage(id);
            state['roundElement'] = gamePage.createRoundElement();
            state['containerElement'] = gamePage.createGameContainer();
            state['playerXElement'] = gamePage.createGamePlayerElement(gamePage.get('playerX'));
            // state['boardElement'] = gamePage.createBoardElement();
            state['playerOElement'] = gamePage.createGamePlayerElement(gamePage.get('playerO'));
            
        } else if(id === 'home-page') {
            state['page'] = homePage.createPage(id);
            state['container'] = homePage.createHomeContainer();
            state['playerX'] = homePage.createHomePlayer(gamePage.get('playerX'));
            state['vs'] = homePage.createVs();
            state['playerO'] = homePage.createHomePlayer(gamePage.get('playerO'));
            state['playBtn'] = homePage.createPlayBtn();
            state['modal'] = homePage.createModal();
        }

        // add page
        article.appendChild(state['page']);
    },
});

// Update Elements on screen
const update = (state) => ({
    update: (id) => {
        if(id === 'game-page') {
            
        } else if(id === 'home-page') {
            // Binding DOM Elements
            state['playerX'].querySelector('button').addEventListener('click', () => homePage.toggleModal('playerX'));
            state['playerO'].querySelector('button').addEventListener('click', () => homePage.toggleModal('playerO'));
            state['playBtn'].addEventListener('click', () => homePage.playGame());
        }
    },
});

// Create Page
const createPage = (state) => ({
    createPage: (id) => {
        let page = document.createElement('div');
        page.id = id;
        return page;
    },
});

const createHomeContainer = (state) => ({
    createHomeContainer: () => {
        let container = document.createElement('div');
        container.classList.add('container')
        state['page'].appendChild(container);
        return container;
    },
});

const createPlayBtn = (state) => ({
    createPlayBtn: () => {
        const playBtn = document.createElement('button');
        state['page'].appendChild(playBtn);
        playBtn.textContent = 'Play';
        return playBtn;
    },
});
const createHomePlayer = (state) => ({
    createHomePlayer: (player) => {
        // Div : Player Container
        const divPlayer = document.createElement('div');
        divPlayer.classList.add(`player`, 'player-' + player.get('symbol'));
        state['container'].appendChild(divPlayer);

            // P : Player Symbol + Player Name
            const para = document.createElement('p');
            para.textContent = `Player ${player.get('symbol').toUpperCase()} : ${player.get('name')}`;
            para.classList.add("player-title");
            divPlayer.appendChild(para);

            // Div : Player Customizer Container
            const divContainer = document.createElement('div');
            divContainer.classList.add('player-boarder');
            divPlayer.appendChild(divContainer);

                // Btn : Avatar Picker
                const btnAvatar = document.createElement('button');
                btnAvatar.classList.add('avatar-btn');
                divContainer.appendChild(btnAvatar);

                    // Img
                    const avatarImg = document.createElement('img');
                    avatarImg.setAttribute('src', `./icons/${player.get('type').toLowerCase() + '_' + player.get('symbol').toLowerCase() + player.get('avatar')}.svg`);
                    avatarImg.classList.add(player.get('symbol') === 'x' ? 'x-img' : 'o-img');
                    btnAvatar.append(avatarImg);
                
                // Div : Inputs
                const divInputs = document.createElement('div');
                divInputs.classList.add('inputs');
                divContainer.appendChild(divInputs);

                    // Input : Name
                    const inputName = document.createElement('input');
                    inputName.setAttribute('placeholder', 'Name');
                    divInputs.appendChild(inputName);

                    // Event Listner 
                    inputName.addEventListener('focusout', () => {
                        player.set('name', inputName.value);
                        homePage.render('home-page');
                        homePage.update('home-page');
                    });
                    inputName.addEventListener('keydown', (event) => {
                        if(event.key === 'Enter') {
                            player.set('name', inputName.value);
                            homePage.render('home-page');
                            homePage.update('home-page');
                        }  
                    });

                    // Input : Human, Easy AI, Hard AI
                    const selectHumanAI = document.createElement('select');
                    selectHumanAI.setAttribute('type', 'selector');
                    divInputs.appendChild(selectHumanAI);

                        // First Option : Human
                        const firstOption = document.createElement('option');
                        if (player.get('type') === 'AI') {
                            firstOption.setAttribute('value', (player.get('difficulty') === 1 ? "Easy " : "Hard ") + player.get('type'));
                            firstOption.textContent = (player.get('difficulty') === 1 ? "Easy " : "Hard ") + player.get('type');
                        } else {
                            firstOption.setAttribute('value', player.get('type'));
                            firstOption.textContent = player.get('type');
                        }
                        selectHumanAI.appendChild(firstOption);

                        // Eventlistner
                        firstOption.addEventListener('click', () => {
                            player.set('type', firstOption.textContent.includes('Human') ? 'HUMAN' : 'AI');
                            player.set('difficulty', firstOption.textContent.includes('Easy') ? 1 : 2);
                            homePage.render('home-page');
                            homePage.update('home-page');
                        });

                        // Second Option : Easy AI
                        const secondOption = document.createElement('option');
                        if (player.get('type') === 'AI') {
                            secondOption.setAttribute('value', (player.get('difficulty') === 1 ? "Hard " : "Easy ") + player.get('type'));
                            secondOption.textContent = (player.get('difficulty') === 1 ? "Hard " : "Easy ") + player.get('type');
                        } else {
                            secondOption.setAttribute('value', 'Easy AI');
                            secondOption.textContent = 'Easy AI';
                        }
                        selectHumanAI.appendChild(secondOption);
                        // Eventlistner
                        secondOption.addEventListener('click', () => {
                            player.set('type', secondOption.textContent.includes('Human') ? 'HUMAN' : 'AI');
                            player.set('difficulty', secondOption.textContent.includes('Easy') ? 1 : 2);
                            homePage.render('home-page');
                            homePage.update('home-page');
                        });

                        // Third Option : Hard AI
                        const thirdOption = document.createElement('option');
                        if (player.get('type')=== 'AI') {
                            thirdOption.setAttribute('value', 'Human');
                            thirdOption.textContent = "Human";
                        } else {
                            thirdOption.setAttribute('value', 'Hard AI');
                            thirdOption.textContent = 'Hard AI';
                        }
                        selectHumanAI.appendChild(thirdOption);
                        // Eventlistner
                        thirdOption.addEventListener('click', () => {
                            player.set('type', thirdOption.textContent.includes('Human') ? 'HUMAN' : 'AI');
                            player.set('difficulty', thirdOption.textContent.includes('Easy') ? 1 : 2);
                            homePage.render('home-page');
                            homePage.update('home-page');
                        });

                    // Div : Color Wheel Picker
                    const divColor = document.createElement('divColor');
                    divColor.classList.add("div-color");
                    divInputs.appendChild(divColor);

                        // Input : Color Wheel Picker
                        const inputColorPicker = document.createElement('input');
                        inputColorPicker.classList.add(player.get('symbol') === 'x' ? 'x-color' : 'o-color');
                        inputColorPicker.setAttribute('type', 'color');
                        divColor.appendChild(inputColorPicker);

                        // Event Listner
                        inputColorPicker.addEventListener('change', changeSvgColor, false);

                        // Label : Color
                        const labelColorPicker = document.createElement('label');
                        labelColorPicker.textContent = "Color";
                        divColor.appendChild(labelColorPicker);

        
         return divPlayer;
    },
});

const createVs = (state) => ({
    createVs: () => {
        let vsDiv = document.createElement('div');
        vsDiv.classList.add('vs-div');
        let vsPara = document.createElement('p');
        vsPara.textContent = 'vs';
        vsDiv.appendChild(vsPara);
        state['container'].appendChild(vsDiv);
        return vsDiv;
    },
});

const testPrivateFunc = (state) => ({
    testPrivateFunc: (num) => {
        console.log(num);
    },
});

// When play btn on homePage is clicked load gamePage
const playGame = (state) => ({
    playGame: () => {
        gamePage.render('game-page');
    },
});

const createModal = (state) => ({
    createModal: (player) => {
        // Div Background
        const background = document.createElement('div');
        background.classList.add('background', 'hidden');

            // Div : Avatar Content
            const contents = document.createElement('div');
            contents.classList.add('contents'); 
            background.appendChild(contents);
        document.body.appendChild(background);

    return background;
    },
});

// Switch statement for different modals?
const toggleModal = (state) => ({
    toggleModal: (value) => {
        let modal = state['modal'];
        homePage.populateModal(value);
        modal.classList.toggle('hidden');
    }
});

const populateModal = (state) => ({
    populateModal: (value) => {
        let modal = state['modal'];
        if(value === 'playerX' || value === 'playerO') {
            let contents = modal.querySelector('.contents');
            contents.classList.add('avatar-modal');
            gamePage.get('avatarArr').forEach((i) => {
                const ava = document.createElement('img');
                ava.setAttribute('src', `./icons/${gamePage.get(value).get('type').toLowerCase() + '_' + gamePage.get(value).get('symbol').toLowerCase() + i}.svg`);
                contents.appendChild(ava);
                
                // Event Listner
                ava.addEventListener('click', () => {
                    gamePage.get(value).set('avatar', i);
                    modal.classList.toggle('hidden');
                    document.body.removeChild(modal);
                    homePage.render('home-page');
                    homePage.update('home-page');
                });

                // Add Current-avatar class
                if(gamePage.get(value).get('avatar') === i) {
                    ava.classList.add('current-avatar');
                }
            });
        }
    }
});

// Changes the color of SVG images
function changeSvgColor(event) {
    const rgb = hexToRgb(event.target.value);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();
    
    if(event.target.classList.contains('x-color')) {
        img = document.querySelector('.x-img');
        gamePage.get('playerX').set('filter', result.filter);
    } else {
        img = document.querySelector('.o-img');
        gamePage.get('playerO').set('filter', result.filter);
    }

    img.style = result.filter;
}

const createGameContainer = (state) => ({
    createGameContainer: () => {
        console.log('dsfasdfsdf');
        let container = document.createElement('div');
        container.classList.add('container')
        state['page'].appendChild(container);
        return container;
    }
});

const createRoundElement = (state) => ({
    createRoundElement: () => {
        let round = document.createElement('p');
        round.textContent = 'Round: ' + state['currentRound'];
        round.classList.add('current-round')
        state['page'].appendChild(round);
        return round;
    },
});

const createGamePlayerElement = (state) => ({
    createGamePlayerElement: (player) => {
        // Div : Player
        const divPlayer = document.createElement('div');
        divPlayer.classList.add('div-player', `div-player-${player.get('symbol')}`);
        state['containerElement'].appendChild(divPlayer);

            // Img : Turn Indicator SVG
            const imgPlayerTurnIndicator = document.createElement('img');
            imgPlayerTurnIndicator.classList.add('turn-indicator');
            if(gamePage.get('xTurn')) {
                if(player.get('symbol') === 'x') {
                    imgPlayerTurnIndicator.classList.remove('hidden');
                } else {
                    imgPlayerTurnIndicator.classList.add('hidden');
                }
              } else {
                if(player.get('symbol') === 'x') {
                    imgPlayerTurnIndicator.classList.add('hidden');
                } else {
                    imgPlayerTurnIndicator.classList.remove('hidden');
                }
              }
            imgPlayerTurnIndicator.setAttribute('src', './icons/turn_indicator.svg');
            divPlayer.appendChild(imgPlayerTurnIndicator);

            // Para : Player Name
            const paraPlayerName = document.createElement('p');
            paraPlayerName.classList.add('player-name');
            paraPlayerName.textContent = player.get('name');
            divPlayer.appendChild(paraPlayerName);

            // Img : Player Avatar SVG
            const imgPlayerAvatar = document.createElement('img');
            imgPlayerAvatar.classList.add('player-x-avatar', 'avatar-img');
            imgPlayerAvatar.style = player.get('filter');
            imgPlayerAvatar.setAttribute('src', `./icons/${player.get('type').toLowerCase() + '_' + player.get('symbol').toLowerCase() + player.get('avatar')}.svg`);
            divPlayer.appendChild(imgPlayerAvatar);

            // Para : Player X Wins
            const paraPlayerWins = document.createElement('p');
            paraPlayerWins.classList.add('player-wins');
            paraPlayerWins.textContent = gamePage.get('xWins');
            divPlayer.appendChild(paraPlayerWins);

            // Btn : Forfeit
            const btnPlayerForfeit = document.createElement('button');
            btnPlayerForfeit.classList.add('forfeit');
            btnPlayerForfeit.textContent = 'Forfeit';
            // btnPlayerForfeit.addEventListener('click', () => {
            //     gameBoard.gameOverModal(player);
            //   });
            divPlayer.appendChild(btnPlayerForfeit);
    },
});