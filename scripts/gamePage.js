// Module
const gamePage = (() => {
    let state = {
        page: null,
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        currentRound: 1,
        xTurn: true,
        xWins: 0, 
        oWins: 0,
        roundOver: false,
        roundWinner: null,
        gameWinnder: null,
        playerX : Player('x', 'human', 'Player X', '', ''),
        playerO : Player('o', 'human', 'Player O', '', ''),
    }

    const resetBoard = () => {
        gamePage.board =[
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    };

    return Object.assign(
        {state},
        getter(state),
        setter(state),
        render(state),
        createPage(state)
    )
})();