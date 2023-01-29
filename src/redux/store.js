import counterReducer from './reducers/counterReducer.js';
import { combineReducers, createStore } from 'redux';

export const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(rootReducer);

export default store;
