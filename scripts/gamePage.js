// Module
const gamePage = (() => {
    let state = {
        page: null,
        roundElement: null,
        containerElement: null,
        playerXElement: null,
        boardElement: null,
        playerOElement: null,
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        avatarArr: [1, 2],
        currentRound: 1,
        xTurn: true,
        xWins: 0, 
        oWins: 0,
        roundOver: false,
        roundWinner: null,
        gameWinner: null,
        playerX : Player('x', 'human', '', 1, '', 0),
        playerO : Player('o', 'AI', '', 1, '', 1),
    }

    const public = Object.assign(
        getter(state),
        setter(state),
        render(state),
        update(state),
        createPage(state),
        createGameContainer(state),
        createRoundElement(state),
        createGamePlayerElement(state),
        createBoardElement(state),
        addMarkToBoard(state),
        checkRoundOver(state),
        playerWins(state),
        createModal(state),
        toggleModal(state),
        populateModal(state),
        newRound(state),
        newGame(state),
    );

    state.page = public.createPage('game-page');

    return public
})();