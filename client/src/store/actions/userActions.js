export const saveUserInformation = (user) => {
    return {
        type: 'SAVE_USER_INFORMATION',
        payload: user,
    }
}

export const clearUserInformation = () => {
    return {
        type: 'CLEAR_USER_INFORMATION',
    }
}
