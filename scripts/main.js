

// Renders Home Page
const article = document.querySelector('article');

// Module - Game Board Object
const GameBoard = (() => {
    return {board:[],}
})();

//Factory - Player Object Constructor
// IN > OUT: String String-URL-Num String String-Human-Computer String > Object
const playerFactory = (symbol, avatar, name, type, color) => {
    return {symbol, avatar, name, type, color};
};

let playerX = playerFactory('x', '1', '', 'human', '#000');
let playerO = playerFactory('o', '1', '', 'computer', '#000');

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
    article.appendChild(btnPlay);  
}

renderHome();

// Renders Player Picker
function renderPlayerPicker(container, player) {

    // Div : Player
    const divPlayer = document.createElement('div');
    divPlayer.classList.add(`player`);

        // P : Player X
        const paraPlayer = document.createElement('p');
        paraPlayer.textContent = `Player ${player.symbol.toUpperCase()} : ${player.type[0].toUpperCase() + player.type.slice(1)}`;
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
                    avatarImg.setAttribute('src', `icons/${player.type + '_' + player.symbol + 2}.svg`);
                    BtnAvatar.append(avatarImg);

                // Modal : Avatar Picker
            divContainer.appendChild(BtnAvatar);
            
            // Div : Input Fields
            const divInputs = document.createElement('div');
            divInputs.classList.add('inputs');

                // Input : Name
                const inputName = document.createElement('input');
                inputName.setAttribute('placeholder', 'Name');
                divInputs.appendChild(inputName);

                // Input : Player, Easy AI, Hard AI, Impossible AI
                const inputPlayerAI = document.createElement('select');
                inputName.setAttribute('type', 'selector');
                    // Option : Player
                    // Option : AI
                divInputs.appendChild(inputPlayerAI);

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

// Create a modal to select an avatar
function avatarPicker(player) {

}
