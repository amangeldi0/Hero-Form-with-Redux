import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";
import ReduxThunk from 'redux-thunk'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const stringMiddleware = (store) => (next) => (action) =>{
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

const store = createStore(
    combineReducers({heroes, filters}),
    compose(applyMiddleware(ReduxThunk, stringMiddleware), reduxDevTools)

);

export default store;