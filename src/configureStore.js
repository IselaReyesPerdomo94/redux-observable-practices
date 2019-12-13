import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { appReducer } from './reducer/appReducer';
import { beerReducers } from './reducer/beersReducer';
import { configReducer } from './reducer/configReducer';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchBeersEpic } from './epics/fetchBeers';
import { persistEpic, hydrateEpic } from './epics/persist';

export const configureStore = () => {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic)

    const epicMiddleware = createEpicMiddleware()

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beerReducers,
        config: configReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

    epicMiddleware.run(rootEpic);

    return store
}