import * as CONSTANTS from '../Constants';

export const setRoundInitial = () => {
  return { type: CONSTANTS.ROUND_SET_INITIAL };
};

export const addRound = payload => {
  return { type: CONSTANTS.ROUND_ADD, payload };
};
export const removeRound = (payload) => {
  return { type: CONSTANTS.ROUND_REMOVE, payload };
};

export const resultChanged = payload => {
  return { type: CONSTANTS.RESULT_CHANGED, payload };
};