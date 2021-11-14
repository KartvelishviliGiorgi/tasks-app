const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SAVE_USER_INFORMATION':
            return {
                id: action.payload.id,
                fullname: action.payload.fullname,
                email: action.payload.email,
            }
        case 'CLEAR_USER_INFORMATION':
            return null
        default:
            return state
    }
}

export default reducer
