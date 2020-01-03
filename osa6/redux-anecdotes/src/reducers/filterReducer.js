const initialState = ''

export const updateFilter = (term) => {
    return {
        type: 'UPDATE_FILTER',
        data: term
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'UPDATE_FILTER':
            return action.data 
        default:
            return state
    }
}

export default reducer
