import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { appReducer } from './reducer/appReducer';
import { beerReducers } from './reducer/beersReducer';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchBeersEpic } from './epics/fetchBeers';

export const configureStore = () => {

    const rootEpic = combineEpics(fetchBeersEpic)

    const epicMiddleware = createEpicMiddleware()

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beerReducers
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

    epicMiddleware.run(rootEpic);

    return store
}