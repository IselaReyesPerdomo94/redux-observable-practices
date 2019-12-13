import { concat, of, merge, fromEvent, race, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, debounceTime, filter, catchError, delay, takeUntil, mapTo, withLatestFrom, pluck } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { fetchFulFilled, SEARCH, setStatus, fetchFailed, CANCEL, reset, RANDOM } from '../reducer/beersActions'


const search = (apiBase, perPage, term) =>
    `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`

const random = (apiBase) => `${apiBase}/random`

export const fetchBeersEpic = (action$, state$) => {
    return action$.pipe(
        ofType(RANDOM),
        debounceTime(500),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{ payload }, config]) => {

            //adding complexity, by giving the user an option of random beers 
            const reqs = [...Array(config.perPage)].map(() => {
                    return ajax.getJSON(random(config.apiBase)).pipe(pluck(0))
                })
                //Separating the fetch from the blocker$
            const ajax$ = forkJoin(reqs).pipe(
                delay(2000),
                map(resp => fetchFulFilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message))
                })
            )

            //cancelling an action with a key event and click event
            const blocker$ = merge(
                action$.pipe(ofType(CANCEL)),
                fromEvent(document, "keyup").pipe(
                    filter(evt => evt.key === "Escape" || evt.key === "Esc")
                )
            ).pipe(mapTo(reset()))

            return concat(
                of(setStatus('pending')),
                race(ajax$, blocker$)
            )
        })
    )
}