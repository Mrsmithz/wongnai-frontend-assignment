import { SEARCH } from "../actions/searchActions"
const initialState = {
    search: null
}

const searchReducers = (state = initialState, action: any) => {
    switch(action.type){
        case SEARCH:
            state.search = action.keyword
            return {
                search: state.search
            }
        default:
            return state
    }
}
export default searchReducers