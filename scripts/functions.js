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
    render: () => {
        // remove all elements of body
        let article = document.querySelector('article');
        while(article.firstChild) {
            article.removeChild(article.firstChild);
        }

        // add page
        article.appendChild(state['page']);
    },
});

// Create Page
const createPage = (state) => ({
    createPage: (id) => {
        let page = document.createElement('div');
        page.id = id;
        state['page'] = page;

        // Create Children
        if(id === 'home-page') {
            homePage.createHomeContainer();
            homePage.createPlayBtn();
        } else if(id === 'game-page') {

        }
    },
});

const createHomeContainer = (state) => ({
    createHomeContainer: () => {
        let container = document.createElement('div');
        container.classList.add('container')
        state['page'].appendChild(container);
        state['container'] = container;

        // Create Children
        // homePage.createHomePlayer(gamePage.get('playerX'));
        homePage.createVs();
        // homePage.createHomePlayer(gamePage.get('playerO'));
    },
});

const createPlayBtn = (state) => ({
    createPlayBtn: () => {
        let playBtn = document.createElement('button');
        state['page'].appendChild(playBtn);
        playBtn.textContent = 'Play';
        state['play'] = playBtn;
    },
});
const createHomePlayer = (state) => ({
    createHomePlayer: (player) => {
        // Div : Player Container
            // P : Player Symbol + Player Name
            // Div : Player Customizer Container
                // Btn : Avatr Picker
                // Div : Inputs
                    // Input : Name
                    // Input : Human, Easy AI, Normal AI, Hard AI
                    // Input : Color Picker
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
        state['vs'] = vsDiv;
    },
});
// createVs
// - Home Page
    // - Div Container
        // Div Player X
            // Para Vs
        // Div Player O
    // Btn Play

const testPrivateFunc = (state) => ({
    testPrivateFunc: (num) => {
        console.log(num);
    },
});
