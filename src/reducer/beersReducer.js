import { FETCH_FULFILLED, SET_STATUS, FETCH_FAILED, CANCEL } from './beersActions';

const initialState = {
    data: [],
    status: 'idle' //
};

export const beerReducers = (state = initialState, action) => {
    switch (action.type) {
        case CANCEL:
            {
                return {
                    ...state,
                    status: "idle",
                    messages: []
                }
            }
        case SET_STATUS:
            {
                return {
                    ...state,
                    status: action.payload
                }
            }
        case FETCH_FULFILLED:
            {
                return {
                    ...state,
                    status: 'success',
                    data: action.payload,
                    messages: []
                }
            }
        case FETCH_FAILED:
            {
                return {
                    ...state,
                    status: "Failure",
                    messages: [{
                        type: "error",
                        text: action.payload
                    }]
                }
            }
        default:
            return state;
    }
}