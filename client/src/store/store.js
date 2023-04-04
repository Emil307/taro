import { createStore } from 'redux';

const defaultState = {
  token: "",
  role: "",
  isLogin: false,
  api: 'http://localhost:8000/',
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {...state, token: action.payload}
    case "SET_ROLE":
      return {...state, role: action.payload}
    case "SET_ISLOGIN":
      return {...state, isLogin: action.payload}
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;