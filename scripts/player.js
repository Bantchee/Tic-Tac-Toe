// Factory
const Player = (symbol, type, name, avatar, avatarFilter, difficulty) => {
    let state = {
        symbol,
        type,
        name,
        avatar,
        avatarFilter,
        difficulty,
    };

    return Object.assign(
        getter(state),
        setter(state),
    );
};