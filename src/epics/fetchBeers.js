import { concat, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, debounceTime, filter, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { fetchFulFilled, SEARCH, setStatus, fetchFailed } from '../reducer/beersActions'

const API = 'https://api.punkapi.com/v2/beers';
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`

export const fetchBeersEpic = (action$) => {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        // filter(({ payload }) => payload.trim() !== ''),
        switchMap(({ payload }) => {
            return concat(
                of(setStatus('pending')),
                ajax.getJSON(search(payload)).pipe(
                    map(resp => fetchFulFilled(resp)),
                    catchError(err => {
                        return of(fetchFailed(err.response.message))
                    })
                )
            )
        })
    )
}