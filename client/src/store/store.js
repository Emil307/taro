import { createStore } from 'redux';

const defaultState = {
  token: "",
  role: "",
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {...state, token: action.payload}
    case "SET_ROLE":
      return {...state, role: action.payload}
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;