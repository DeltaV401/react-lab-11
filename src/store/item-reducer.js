export const DETAILS = 'details';

export const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case TOGGLE_DETAILS: {
      let item = state.todoList.find(item => item._id === action.payload);
        return {
          details: item || {},
          showDetails: !!item,
        }
      }
    default:
      return state;
  }
}