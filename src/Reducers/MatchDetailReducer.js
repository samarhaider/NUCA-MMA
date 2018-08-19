import * as CONSTANTS from "../Constants";

const INITIAL_STATE = {
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.MATCH_DETAIL:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.MATCH_DETAIL_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case CONSTANTS.MATCH_DETAIL_FAIL:
      return { ...state, error: "Post can not be fetched", loading: false };
    default:
      return state;
  }
};