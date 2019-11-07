import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as todoList } from './todolist-reducer';
import { reducer as details } from './item-reducer';

let reducer = combineReducers({
  todoList,
  details,
});

export default function() {
  return createStore(reducer, composeWithDevTools());
}
