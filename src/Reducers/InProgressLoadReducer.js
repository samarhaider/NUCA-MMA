import * as CONSTANTS from '../Constants';

const INITIAL_STATE = {
  data: [],
  // LocationHistory: {},
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.IN_PROGRESS_LOAD_FETCH:
      return { ...INITIAL_STATE, loading: true, error: "" };
    case CONSTANTS.IN_PROGRESS_LOAD_FETCH_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload, loading: false, error: "" };
    case CONSTANTS.IN_PROGRESS_LOAD_FETCH_FAIL:
      return { ...state, error: "List can not be fetched", loading: false };
    default:
      return state;
  }
};