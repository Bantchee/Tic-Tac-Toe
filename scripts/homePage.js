// Module
const homePage = (() => {
    const state = {
        page: null,
        container: null,
        playerX: null,
        vs: null,
        PlayerO: null,
        playBtn: null,
    };

    const public = Object.assign(
        {state},
        getter(state),
        setter(state),
        render(state),
        createPage(state),
        createHomeContainer(state),
        createPlayBtn(state),
        createHomePlayer(state),
        createVs(state),
    );

    const private = Object.assign(
        testPrivateFunc(state),
    );

    console.log(private);

    private.testPrivateFunc(5);

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
    