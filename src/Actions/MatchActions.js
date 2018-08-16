import * as CONSTANTS from '../Constants';

export const favourImangeChanged = text => {
  return { type: CONSTANTS.POST_IMAGE_CHANGED, payload: text };
};
export const titleChanged = text => {
  return { type: CONSTANTS.POST_TITLE_CHANGED, payload: text };
};
export const descriptionChanged = text => {
  return { type: CONSTANTS.POST_DESCRIPTION_CHANGED, payload: text };
};
export const pickupChanged = text => {
  return { type: CONSTANTS.POST_PICKUP_CHANGED , payload: text}
}
export const pointsChanged = text => {
  return { type: CONSTANTS.POST_POINTS_CHANGED, payload: text };
};
export const cityChanged = text => {
  return { type: CONSTANTS.POST_CITY_CHANGED, payload: text };
};
export const passwordResetChanged = text => {
  return { type: CONSTANTS.POST_FRIEND_CHANGED, payload: text };
};
export const completeTimeChanged = text => {
  return { type: CONSTANTS.POST_COMPLETE_TIME_CHANGED, payload: text };
};
export const friendChanged = text => {
  return { type: CONSTANTS.POST_FRIEND_CHANGED, payload: text };
};
export const statusChanged = text => {
  return { type: CONSTANTS.POST_STATUS_CHANGED, payload: text };
};
export const ratingChanged = text => {
  return { type: CONSTANTS.POST_RATING_CHANGED, payload: text };
};
export const typeChanged = text => {
  return { type: CONSTANTS.POST_TYPE_CHANGED, payload: text}
}
export const favourPhoneChanged = text => {
  return { type: CONSTANTS.POST_PHONE_CHANGED , payload: text}
}

export const getPosts = (payload) => {
  return { type: CONSTANTS.POST_LIST_FETCH, payload };
};

export const favourDetailEmpty = (payload) => {
  return { type: CONSTANTS.POST_DETAIL_EMPTY, payload };
};

export const getPostDetail = (payload) => {
  return { type: CONSTANTS.POST_DETAIL, payload };
};
export const savePost = (payload) => {
  return { type: CONSTANTS.POST_SAVE, payload };
};
export const updatePost = (payload) => {
  return { type: CONSTANTS.POST_UPDATE, payload };
};

export const inProgressLoad = (payload) => {
  return { type: CONSTANTS.IN_PROGRESS_LOAD_FETCH, payload };
};

export const saveTrackingLocation = (payload) => {
  return { type: CONSTANTS.TRACKING_LOCATION_SAVE, payload };
};
