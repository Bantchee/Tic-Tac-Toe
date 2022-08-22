// Module
const homePage = (() => {
    const state = {
        page: null,
        container: null,
        playerX: null,
        vs: null,
        PlayerO: null,
        playBtn: null,
        modal: null,
    };

    // Public Methods
    const public = Object.assign(
        getter(state),
        setter(state),
        render(state),
        createPage(state),
        createHomeContainer(state),
        createPlayBtn(state),
        createHomePlayer(state),
        createVs(state),
        playGame(state),
        createModal(state),
        toggleModal(state),
        populateModal(state),
    );

    // Private Methods
    const private = Object.assign(
        testPrivateFunc(state),
    );
    // Private Method Test
    // private.testPrivateFunc(5);

    // Cache DOM
    state.page = public.createPage('home-page');
    state.container = public.createHomeContainer();
    state.playerX = public. createHomePlayer(gamePage.get('playerX'));
    state.vs = public.createVs();
    state.PlayerO = public.createHomePlayer(gamePage.get('playerO'));
    state.playBtn = public.createPlayBtn();
    state.modal = public.createModal();

    // Binding DOM Elements
    state.playerX.querySelector('button').addEventListener('click', (event) => public.toggleModal('avatar-x'));
    // state.playerX.querySelector('.inputs').addEventListener('click', () => public.playGame());
    // state.playerO.querySelector('button').addEventListener('toggle', (event) => public.toggleModal(event, 'avatar-o'));
    // state.playerO.querySelector('.inputs').addEventListener('click', () => public.playGame());
    state.playBtn.addEventListener('click', () => public.playGame());

    return public;
})();


// // Module / Factory Declaration
//     // publicState
//     // privateState = publicState + privateStates
//     // Public = publicState + publicFuncs(privateState)
//     // Private = Public + privateState + privateFuncs(privateState)

// // Module
// const homePage = (() => {
//     const state = {
//         page: null,
//         container: null,
//         playerX: null,
//         vs: null,
//         PlayerO: null,
//         playBtn: null,
//     };

//     const privateState = Object.assign(
//         {
//             privateProperty: "I'm a private property",
//         }, 
//         state,
//     );

//     const private = Object.assign(
//         {privateState},
//         testPrivateFunc(privateState),
//     );

//     const public = Object.assign(
//         {state},
//         getter(state),
//         setter(state),
//         render(privateState),
//         createPage(privateState),
//         createHomeContainer(privateState),
//         createPlayBtn(privateState),
//         createHomePlayer(privateState),
//         createVs(privateState),
//     );

//     console.log(private.privateState.privateProperty);
//     console.log(private.privateState);

//     private.testPrivateFunc(5);

//     return public;
// })();
    