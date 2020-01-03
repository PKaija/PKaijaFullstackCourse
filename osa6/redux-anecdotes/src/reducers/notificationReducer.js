const initialState = {
    message: '',
    visible: false
}

export const empty = () => {
    return {
        type: 'EMPTY'
    }
}

//Default duration is 5 seconds
export const createNotification = (message, time = 5) => {
    return async dispatch => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                data: message
            })
            setTimeout(() => {
                dispatch({
                    type: 'EMPTY'
                })
            }, time*1000)
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION': return {
                message: action.data,
                visible: true
            }
        case 'EMPTY': return {
            message: '',
            visible: false
        }
        default:
            return state
    }
}

export default reducer