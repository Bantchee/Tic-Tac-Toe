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
        // if(id === 'game-page') {
            
        // } else if(id === 'home-page') {
        //     state['page'] = homePage.createPage(id);
        //     state['container'] = homePage.createHomeContainer();
        //     state['playerX'] = homePage.createHomePlayer(gamePage.get('playerX'));
        //     state['vs'] = homePage.createVs();
        //     state['PlayerO'] = homePage.createHomePlayer(gamePage.get('playerO'));
        //     state['playBtn'] = homePage.createPlayBtn();
        // }

        // add page
        article.appendChild(state['page']);
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
        divPlayer.classList.add(`player`, 'player-' + player.symbol);
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
                    btnAvatar.append(avatarImg);
                
                // Div : Inputs
                const divInputs = document.createElement('div');
                divInputs.classList.add('inputs');
                divContainer.appendChild(divInputs);

                    // Input : Name
                    const inputName = document.createElement('input');
                    inputName.setAttribute('placeholder', 'Name');
                    divInputs.appendChild(inputName);

                    // Input : Human, Easy AI, Hard AI
                    const selectHumanAI = document.createElement('select');
                    selectHumanAI.setAttribute('type', 'selector');
                    divInputs.appendChild(selectHumanAI);

                        // First Option : Human
                        const firstOption = document.createElement('option');
                        if (player.get('type') === 'AI') {
                            firstOption.setAttribute('value', (player.get('difficulty') === '1' ? "Easy " : "Hard ") + player.get('type'));
                            firstOption.textContent = (player.get('difficulty') === '1' ? "Easy " : "Hard ") + player.get('type');
                        } else {
                            firstOption.setAttribute('value', player.get('type'));
                            firstOption.textContent = player.get('type');
                        }
                        selectHumanAI.appendChild(firstOption);

                        // Second Option : Easy AI
                        const secondOption = document.createElement('option');
                        if (player.get('type') === 'AI') {
                            // secondOption.setAttribute('value', 'Human');
                            // secondOption.textContent = "Human";

                            secondOption.setAttribute('value', (player.get('difficulty') === 1 ? "Hard " : "Easy ") + player.get('type'));
                            secondOption.textContent = (player.get('difficulty') === 1 ? "Hard " : "Easy ") + player.get('type');
                        } else {
                            secondOption.setAttribute('value', 'Easy AI');
                            secondOption.textContent = 'Easy AI';
                        }
                        
                        selectHumanAI.appendChild(secondOption);

                        // Third Option : Hard AI
                        const thirdOption = document.createElement('option');
                        if (player.get('type')=== 'AI') {
                            // thirdOption.setAttribute('value', (player.difficulty === 1 ? "Hard " : "Easy ") + player.type);
                            // thirdOption.textContent = (player.difficulty === 1 ? "Hard " : "Easy ") + player.type;

                            thirdOption.setAttribute('value', 'Human');
                            thirdOption.textContent = "Human";
                        } else {
                            thirdOption.setAttribute('value', 'Hard AI');
                            thirdOption.textContent = 'Hard AI';
                        }

                        selectHumanAI.appendChild(thirdOption);

                    // Div : Color Wheel Picker
                    const divColor = document.createElement('divColor');
                    divColor.classList.add("div-color");
                    divInputs.appendChild(divColor);

                        // Input : Color Wheel Picker
                        const inputColorPicker = document.createElement('input');
                        inputColorPicker.classList.add(player.get('symbol') === 'X' ? 'x-color' : 'o-color');
                        inputColorPicker.setAttribute('type', 'color');
                        divColor.appendChild(inputColorPicker);

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
        gamePage.render();
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
        switch(value) {
            case 'avatar-x':
                let contents = modal.querySelector('.contents');
                contents.classList.add('avatar-modal');
                gamePage.get('avatarArr').forEach((i) => {
                    const ava = document.createElement('img');
                    ava.setAttribute('src', `./icons/${gamePage.get('playerX').get('type').toLowerCase() + '_' + gamePage.get('playerX').get('symbol').toLowerCase() + i}.svg`);
                    contents.appendChild(ava);
                    // Event Listner
                    // ava.addEventListener('click', () => {
                    //     player.avatar = value;
                    //     document.body.removeChild(background);
                    //     clearArticle();
                    //     renderHome();
                    // });

                // Add Current-avatar class
                if(gamePage.get('playerX').get('avatar') == value) {
                    ava.classList.add('current-avatar');
                }
                });
        }
    }
});