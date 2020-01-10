import userService from '../services/users'

export const getUsers = () => {
    return async dispatch => {
        const response = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: response
        })
    }
}

const reducer = (state = [], action) => {
    switch (action.type){

        case 'INIT_USERS': return action.data.sort((a, b) => b.blogs.length - a.blogs.length)
        
        default: return state
    }
}

export default reducer