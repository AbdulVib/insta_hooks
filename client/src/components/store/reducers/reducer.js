export const initialState = {
    photoData: []
};


const reducer = (state, action) => {
    switch (action.type) {

        case 'SET_CURRENT_TODO':
            return {
                ...state,
                // currentPhoto: action.payload
            }
        default:
            return state
    }
}

export default reducer
