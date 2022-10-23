import { createStore, combineReducers, compose } from 'redux';
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    const oldDispatch= store.dispatch

    store.dispatch = (action) => {
        if(typeof action === 'string'){
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}

const store = createStore(
    combineReducers({heroes, filters}),
    compose( enchancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;