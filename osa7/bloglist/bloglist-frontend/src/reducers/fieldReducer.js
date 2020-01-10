const initialState = {
    username: '',
    password: '',
    title: '',
    author: '',
    url: ''
}

export const changeUsername = (input) => {
    return {
        type: 'CHANGE_USERNAME',
        data: input
    }
}

export const changePassword = (input) => {
    return {
        type: 'CHANGE_PASSWORD',
        data: input
    }
}

export const changeTitle= (input) => {
    return {
        type: 'CHANGE_TITLE',
        data: input
    }
}

export const changeAuthor = (input) => {
    return {
        type: 'CHANGE_AUTHOR',
        data: input
    }
}

export const changeUrl= (input) => {
    return {
        type: 'CHANGE_URL',
        data: input
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'CHANGE_USERNAME': return {...state, username: action.data}
        case 'CHANGE_PASSWORD': return {...state, password: action.data}
        case 'CHANGE_TITLE': return {...state, title: action.data}
        case 'CHANGE_AUTHOR': return {...state, author: action.data}
        case 'CHANGE_URL': return {...state, url: action.data}
        default: return state
    }
}

export default reducer