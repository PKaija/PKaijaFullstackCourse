const initialState = {
    message: '',
    type: 'success'
}

export const empty = () => {
    return {
        type: 'EMPTY'
    }
}



//Default duration is 5 seconds
export const createNotification = (message, type, time = 5) => {
    return dispatch => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                data: {
                    message: message,
                    type: type
                }
            })
            setTimeout(() => {
                dispatch({
                    type: 'EMPTY'
                })
            }, time*1000)
    }
}


const reducer = (state = initialState, action) => {

    console.log(state)
    switch (action.type) {
        case 'NEW_NOTIFICATION': return action.data


        case 'EMPTY': return initialState


        default: return state
    }
}

export default reducer