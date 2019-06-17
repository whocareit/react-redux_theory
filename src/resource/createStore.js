function createStore(stateChange){
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = stateChange(state,action)
        listeners.forEach((listener) => (listener()))
    }
    dispatch({});
    return {subscribe, getState, dispatch}
}

module.exports = {
    createStore
}