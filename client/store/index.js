import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import allCharacters from './allCharacters';
import singleCharacter from './singleCharacter';
import cart from './cart';
import allCategories from './allCategories';
import singleCategory from './singleCategory';
import filteredCharacters from './filteredCharacters.js';
import searchTerms from './searchTerms.js';

const reducer = combineReducers({user, allCharacters, singleCharacter, cart, allCategories, singleCategory, searchTerms});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './allCharacters';
export * from './singleCharacter';
export * from './cart';
export * from './allCategories';
export * from './singleCategory';
export * from './searchTerms';