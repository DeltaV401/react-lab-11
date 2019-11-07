import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as todoList } from './todolist-reducer';
import { reducer as details } from './item-reducer';
import { reducer as form } from 'redux-form'

let reducer = combineReducers({
  todoList,
  details,
  form,
});

export default function() {
  return createStore(reducer, composeWithDevTools());
}
