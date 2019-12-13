import { SET_CONFIG } from './beersActions';

const initialState = {
    apiBase: 'https://api.punkapi.com/v2/beers',
    perPage: 10
}

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIG:
            {
                return {
                    ...state,
                    ...action.payload
                }
            }
        default:
            return state;
    }

}