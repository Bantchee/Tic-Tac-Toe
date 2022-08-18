const Player = (symbol, name, avatar, avatarFilter) => {
    let state = {
        symbol,
        name,
        avatar,
        avatarFilter,
    };

    return Object.assign(
        {state}
    );
};

const AIPlayer = (symbol, name, avatar, avatarFilter, difficulty) => {
    let state = {
        symbol,
        name,
        avatar,
        avatarFilter,
        difficulty,
    };

    return Object.assign(
        {state}
    );
};