import {
  SET_USER,
  RESET_USER,
  SET_PEOPLE,
  RESET_PEOPLE,
} from './actiontype';

//initial state of user
const initialState = {
  user: null,
  people: []
};

const reducer = (state = initialState, action) => {
  console.log(action.type, ": ", action.payload)
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload.user
    }
  }
  else if (action.type === RESET_USER) {
    return {
      ...state,
      user: null
    }
  }
  if (action.type === SET_PEOPLE) {
    return {
      ...state,
      people: action.payload.people
    }
  }
  else if (action.type === RESET_PEOPLE) {
    return {
      ...state,
      people: null
    }
  }
  else {
    return state;
  }
}

export default reducer;