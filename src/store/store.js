import { createStore } from 'redux';

const defaultState = {
  token: "",
  role: "",
  isLogin: false,
  api: 'http://127.0.0.1:8000/',
  activeSidebar: false,
  currentItem: '',
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {...state, token: action.payload}
    case "SET_ROLE":
      return {...state, role: action.payload}
    case "SET_ISLOGIN":
      return {...state, isLogin: action.payload}
    case "ACTIVATE_SIDEBAR":
      return {...state, activeSidebar: action.payload}
    case "SET_CURRENTITEM":
      return {...state, currentItem: action.payload}
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;