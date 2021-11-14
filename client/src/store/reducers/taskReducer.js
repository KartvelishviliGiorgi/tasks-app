const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return action.payload
        case 'SET_TASK':
            return [...state, action.payload]
        default:
            return state
    }
}

export default reducer
