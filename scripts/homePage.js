// Module
const homePage = (() => {
    const state = {
        page: null,
        container: null,
        playerX: null,
        vs: null,
        playerO: null,
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
        update(state),
    );

    // Private Methods
    const private = Object.assign(
        testPrivateFunc(state),
    );
    // Private Method Test
    // private.testPrivateFunc(5);

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
    