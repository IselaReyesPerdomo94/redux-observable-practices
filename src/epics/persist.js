import { ofType } from 'redux-observable';
import { SET_CONFIG, setConfig } from '../reducer/beersActions';
import { pluck, withLatestFrom, tap, ignoreElements } from 'rxjs/operators'
import { of, EMPTY } from 'rxjs';

const CACHE_KEY = 'ro-config';

export const persistEpic = (action$, state$) => {
    return action$.pipe(
        ofType(SET_CONFIG),
        withLatestFrom(state$.pipe(pluck('config'))),
        tap(([action, config]) => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(config))
        }),
        ignoreElements()
    )
}

export const hydrateEpic = () => {
    const maybeConfig = localStorage.getItem(CACHE_KEY)
    if (typeof maybeConfig === 'string') {
        try {
            const parsed = JSON.parse(maybeConfig);
            return of(setConfig(parsed))
        } catch (e) {
            return EMPTY
        }
    }
    return EMPTY;
}