// Module
const homePage = (() => {
    const publicState = {
        page: null,
        container: null,
        playerX: null,
        vs: null,
        PlayerO: null,
        playBtn: null,
    };

    // Need private funcions for getting private state
    const privateState = Object.assign(
        {
            privateProperty: "I'm a private property",
        }, 
        publicState,
    );

    const private = Object.assign(
        {privateState},
        testPrivateFunc(privateState),
    );

    const public = Object.assign(
        {publicState},
        getter(publicState),
        setter(publicState),
        render(privateState),
        createPage(privateState),
        createHomeContainer(privateState),
        createPlayBtn(privateState),
        createHomePlayer(privateState),
        createVs(privateState),
    );

    console.log(private.privateState.privateProperty);
    console.log(private.privateState);

    private.testPrivateFunc(5);

    return public;

    // return Object.assign(
    //     {state},
    //     getter(state),
    //     setter(state),
    //     render(state),
    //     createPage(state),
    //     createHomeContainer(state),
    //     createPlayBtn(state),
    //     createHomePlayer(state),
    //     createVs(state),
    // );
})();


// Module / Factory Declaration
    // publicState
    // privateState = publicState + privateStates
    // Public = publicState + publicFuncs(privateState)
    // Private = Public + privateState + privateFuncs(privateState)
    