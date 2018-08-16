import * as CONSTANTS from '../Constants';

const INITIAL_STATE = {  
  data:[1, 2, 3,4,5],
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.MATCH_LIST_FETCH:
      return { ...INITIAL_STATE, loading: true, error: "" };
    case CONSTANTS.MATCH_LIST_FETCH_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case CONSTANTS.MATCH_LIST_FETCH_FAIL:
      return { ...state, error: "List can not be fetched", loading: false };
    default:
      return state;
  }
};
