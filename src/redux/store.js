import { combineReducers, createStore } from 'redux';
import counterReducer from './reducers/counterReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(rootReducer);

export default store;
