import { createStore, applyMiddleware } from 'redux';
import { namesReducer, namesState } from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(namesReducer,namesState, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;