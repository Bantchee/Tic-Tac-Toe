// Module
const gamePage = (() => {
    let state = {
        page: null,
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
        gameWinnder: null,
        playerX : Player('x', 'human', 'Player X', 1, '', 0),
        playerO : Player('o', 'AI', 'Player O', 1, '', 1),
    }

    const public = Object.assign(
        getter(state),
        setter(state),
        render(state),
        createPage(state),
    );

    const resetBoard = () => {
        gamePage.board =[
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    };

    state.page = public.createPage('game-page');

    return public
})();