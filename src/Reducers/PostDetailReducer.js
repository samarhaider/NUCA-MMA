import * as CONSTANTS from "../Constants";

const INITIAL_STATE = {
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.POST_DETAIL_EMPTY:
      return { ...INITIAL_STATE, loading: false  };
    case CONSTANTS.POST_TYPE_CHANGED:
      return { ...state, type: action.payload };
    case CONSTANTS.POST_TITLE_CHANGED:
      return { ...state, title: action.payload };
    case CONSTANTS.POST_DESCRIPTION_CHANGED:
      return { ...state, description: action.payload };
    case CONSTANTS.POST_CITY_CHANGED:
      return { ...state, city_id: action.payload };
    case CONSTANTS.POST_FRIEND_CHANGED:
      return { ...state, friend_id: action.payload };
    case CONSTANTS.POST_IMAGE_CHANGED:
      return { ...state, image: action.payload };
    case CONSTANTS.POST_POINTS_CHANGED:
      return { ...state, points: action.payload };
    case CONSTANTS.POST_PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case CONSTANTS.POST_PICKUP_CHANGED:
      return { ...state, pickup: action.payload };
    case CONSTANTS.POST_COMPLETE_TIME_CHANGED:
      return { ...state, duration: action.payload };
    case CONSTANTS.POST_RATING_CHANGED:
      return { ...state, rating: action.payload };
    case CONSTANTS.POST_SAVE:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.POST_SAVE_SUCCESS:
      return { ...INITIAL_STATE, loading: false  };
    case CONSTANTS.POST_SAVE_FAIL:
      return { ...state, error: action.payload, loading: false };
    case CONSTANTS.POST_DETAIL:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.POST_DETAIL_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case CONSTANTS.POST_DETAIL_FAIL:
      return { ...state, error: "Post can not be fetched", loading: false };
    default:
      return state;
  }
};