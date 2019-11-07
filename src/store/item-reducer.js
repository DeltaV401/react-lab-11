export const TOGGLE_DETAILS = 'toggle details';

export const initialState = {
  details: {},
  showDetails: false,
};

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case TOGGLE_DETAILS: {
        return {
          details: action.payload || {},
          showDetails: !!action.payload,
        }
      }
    default:
      return state;
  }
}

export function toggleDetails(item) {
  return {
    type: TOGGLE_DETAILS,
    payload: item,
  };
}
