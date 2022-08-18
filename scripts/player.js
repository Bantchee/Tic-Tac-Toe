// Factory
const Player = (symbol, type, name, avatar, avatarFilter) => {
    let state = {
        symbol,
        type,
        name,
        avatar,
        avatarFilter,
    };

    return Object.assign(
        {state},
    );
};

// Factory
const AIPlayer = (symbol, type, name, avatar, avatarFilter, difficulty) => {
    let state = {
        symbol,
        type,
        name,
        avatar,
        avatarFilter,
        difficulty,
    };

    return Object.assign(
        {state}
    );
};