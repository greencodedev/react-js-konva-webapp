const imageElements = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ELEMENT':
            console.log("added element => " + JSON.stringify(action))
            return [
                ...state,
                {
                    id: action.id,
                    url: action.url,
                    code: action.code
                }
            ]
        case 'DEL_ELEMENT':
            return state.filter(element => element.id !== action.id)
        case 'GET_ALL':
            return state
        default:
            return state
    }
}

export default imageElements;