

export const setUser = (userJSON) => {
    return {
        type: 'SET_USER',
        data: userJSON
    }
}

export const emptyUser = () => {
    return {
        type: 'EMPTY_USER'
    }
}

const reducer = (state = null, action) => {
    console.log(action)

    switch (action.type){

        case 'SET_USER': return action.data

        case 'EMPTY_USER': return null

        default: return state
    }
}

export default reducer