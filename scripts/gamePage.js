const gamePage = (() => {
    let state = {
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
    }

    const resetBoard = () => {
        gamePage.board =[
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    };

    const renderGame = () => {
        // Remove First Child of ArticleElement
        // Which is Div.game
        gamePage.articleElement.firstChild.remove();

        // Render Components of Game Page
    };

    const addRoundComponent = () => {

    };

    const addBoardComponent = () => {

    };

    const addPlayerComponents = () => {

    };

    return Object.assign(
        {state},
    )
})();