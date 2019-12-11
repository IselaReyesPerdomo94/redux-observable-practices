export const FETCH_FULFILLED = 'FETC_FULTILLED';
export const SET_STATUS = 'SET_STATUS';
export const SEARCH = 'SEARCH';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_FAILED = 'FETCH_FAILED';

export const fetchFulFilled = (beers) => {
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        payload: status
    }
}

export const fetchData = () => {
    return {
        type: FETCH_DATA
    }
}

export const search = (input) => {
    return {
        type: SEARCH,
        payload: input
    }
}

export const fetchFailed = (message) => {
    return {
        type: FETCH_FAILED,
        payload: message
    }
}