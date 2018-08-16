import * as CONSTANTS from '../Constants';

export const winnerImageAdd = (payload) => {
  return { type: CONSTANTS.WINNER_IMAGES_ADD, payload };
};
export const winnerImageRemove = (payload) => {
  return { type: CONSTANTS.WINNER_IMAGES_REMOVE, payload };
};
