export const FETCH_FULFILLED = 'FETC_FULTILLED';
export const SET_STATUS = 'SET_STATUS';
export const SEARCH = 'SEARCH';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_FAILED = 'FETCH_FAILED';
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';
export const SET_CONFIG = 'SET_CONFIG';
export const RANDOM = 'RANDOM';

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

export const random = () => {
    return {
        type: RANDOM
    }
}

export const fetchFailed = (message) => {
    return {
        type: FETCH_FAILED,
        payload: message
    }
}

export const cancel = () => {
    return {
        type: CANCEL
    }
}

export const reset = () => {
    return {
        type: RESET,
    }
}

export const setConfig = (partialObject) => {
    return {
        type: SET_CONFIG,
        payload: partialObject
    }
}