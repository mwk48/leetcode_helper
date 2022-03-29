export const initialState = {
    page: 1,
    limit: 100,
    tags: [],
    difficulty: "",
    paid: "",
    acceptance: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "PAGE":
            return {...state, page: action.data}
        case "LIMIT":
            return {...state, limit: action.data}
        case "TAGS":
            return {...state, tags: action.data}
        case "ACCEPTANCE":
            return {...state, acceptance: action.data}
        case "PAID":
            return {...state, paid: action.data}
        case "DIFFICULTY":
            return {...state, difficulty: action.data}
        case "CLEAR":
            return initialState
        default:
            return state
    }
}

export default reducer;