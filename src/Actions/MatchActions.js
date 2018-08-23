import * as CONSTANTS from '../Constants';

export const favourImangeChanged = text => {
  return { type: CONSTANTS.MATCH_IMAGE_CHANGED, payload: text };
};
export const titleChanged = text => {
  return { type: CONSTANTS.MATCH_TITLE_CHANGED, payload: text };
};
export const descriptionChanged = text => {
  return { type: CONSTANTS.MATCH_DESCRIPTION_CHANGED, payload: text };
};
export const pickupChanged = text => {
  return { type: CONSTANTS.MATCH_PICKUP_CHANGED , payload: text}
}
export const pointsChanged = text => {
  return { type: CONSTANTS.MATCH_POINTS_CHANGED, payload: text };
};
export const cityChanged = text => {
  return { type: CONSTANTS.MATCH_CITY_CHANGED, payload: text };
};
export const passwordResetChanged = text => {
  return { type: CONSTANTS.MATCH_FRIEND_CHANGED, payload: text };
};
export const completeTimeChanged = text => {
  return { type: CONSTANTS.MATCH_COMPLETE_TIME_CHANGED, payload: text };
};
export const friendChanged = text => {
  return { type: CONSTANTS.MATCH_FRIEND_CHANGED, payload: text };
};
export const statusChanged = text => {
  return { type: CONSTANTS.MATCH_STATUS_CHANGED, payload: text };
};
export const ratingChanged = text => {
  return { type: CONSTANTS.MATCH_RATING_CHANGED, payload: text };
};
export const typeChanged = text => {
  return { type: CONSTANTS.MATCH_TYPE_CHANGED, payload: text}
}
export const favourPhoneChanged = text => {
  return { type: CONSTANTS.MATCH_PHONE_CHANGED , payload: text}
}

export const getMatches = (payload) => {
  return { type: CONSTANTS.MATCH_LIST_FETCH, payload };
};

export const favourDetailEmpty = (payload) => {
  return { type: CONSTANTS.MATCH_DETAIL_EMPTY, payload };
};

export const getMatchDetail = (payload) => {
  return { type: CONSTANTS.MATCH_DETAIL, payload };
};
export const saveMatch = (payload) => {
  return { type: CONSTANTS.MATCH_SAVE, payload };
};
export const updateMatch = (payload) => {
  return { type: CONSTANTS.MATCH_UPDATE, payload };
};


export const saveTrackingLocation = (payload) => {
  return { type: CONSTANTS.TRACKING_LOCATION_SAVE, payload };
};

export const winnerImageAdd = (payload) => {
  return { type: CONSTANTS.WINNER_IMAGES_ADD, payload };
};
export const winnerImageRemove = (payload) => {
  return { type: CONSTANTS.WINNER_IMAGES_REMOVE, payload };
};

export const onWinnerChanged = (payload) => {
  return { type: CONSTANTS.WINNER_CHANGED, payload };
};

export const onWinnerTypeChanged = (payload) => {
  return { type: CONSTANTS.WIN_TYPE_CHANGED, payload };
};

export const modalSuccessResultSubmit = payload => {
  return { type: CONSTANTS.MODAL_SUCCESS_RESULT_SUBMIT, payload };
};
