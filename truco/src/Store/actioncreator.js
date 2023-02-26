import {
  SET_USER,
  RESET_USER,
  SET_PEOPLE,
  RESET_PEOPLE,
  SET_GAME,
  RESET_GAME,
} from './actiontype';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user: user,
    },
  };
};

export const resetUser = (user) => {
  return {
    type: RESET_USER,
    payload: {
      user: user,
    },
  };
};

export const setPeople = (people) => {
  return {
    type: SET_PEOPLE,
    payload: {
      people: people,
    },
  };
};

export const resetPeople = (people) => {
  return {
    type: RESET_PEOPLE,
    payload: {
      people: people,
    },
  };
};

export const setGame = (game) => {
  return {
    type: SET_GAME,
    payload: {
      game: game,
    },
  };
};

export const resetGame = (game) => {
  return {
    type: RESET_GAME,
    payload: {
      game: game,
    },
  };
};