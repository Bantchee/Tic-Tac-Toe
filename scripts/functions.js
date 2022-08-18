// get a property of state
const getter = (state) => ({
    get: (name) => state[name],
});

// set a property of state
const setter = (state) => ({
    set: (name, value) => {
        state[name] = value
    },
});
