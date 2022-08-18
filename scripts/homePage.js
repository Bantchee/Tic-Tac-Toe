// Module
const homePage = (() => {
    let state = {
        page: null,
        container: null,
        playerX: null,
        vs: null,
        PlayerO: null,
        playBtn: null,
    };

    return Object.assign(
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
})();