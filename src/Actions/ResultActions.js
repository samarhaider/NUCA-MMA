import * as CONSTANTS from '../Constants';

export const addRound = () => {
  return { type: CONSTANTS.ROUND_ADD };
};
export const removeRound = (payload) => {
  return { type: CONSTANTS.ROUND_REMOVE, payload };
};

export const controlChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_TITLE_CHANGED, payload };
};
export const knockdownsChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_DESCRIPTION_CHANGED, payload };
};
export const totalStrikeChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_PICKUP_CHANGED , payload}
}
export const significantStrikeChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_POINTS_CHANGED, payload };
};
export const takeDownChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_CITY_CHANGED, payload };
};
export const subAttemptsChanged = payload => {
  return { type: CONSTANTS.SHIPMENT_FRIEND_CHANGED, payload };
};
// export const completeTimeChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_COMPLETE_TIME_CHANGED, payload: text };
// };
// export const friendChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_FRIEND_CHANGED, payload: text };
// };
// export const statusChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_STATUS_CHANGED, payload: text };
// };
// export const ratingChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_RATING_CHANGED, payload: text };
// };
// export const typeChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_TYPE_CHANGED, payload: text}
// }
// export const favourPhoneChanged = text => {
//   return { type: CONSTANTS.SHIPMENT_PHONE_CHANGED , payload: text}
// }

export const getShipments = (payload) => {
  return { type: CONSTANTS.SHIPMENT_LIST_FETCH, payload };
};

// export const favourDetailEmpty = (payload) => {
//   return { type: CONSTANTS.SHIPMENT_DETAIL_EMPTY, payload };
// };

export const getShipmentDetail = (payload) => {
  return { type: CONSTANTS.SHIPMENT_DETAIL, payload };
};
// export const saveShipment = (payload) => {
//   return { type: CONSTANTS.SHIPMENT_SAVE, payload };
// };
// export const updateShipment = (payload) => {
//   return { type: CONSTANTS.SHIPMENT_UPDATE, payload };
// };
