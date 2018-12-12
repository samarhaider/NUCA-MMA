import * as CONSTANTS from '../Constants';

const INITIAL_STATE = {  
  data: [],
  current_page: 0,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.MATCH_LIST_FETCH:
      console.tron.log(action.payload.page);
      const { page } = action.payload;
      if (page > 1) {
        return { ...state, loading: true, error: "" };  
      }
      return { ...INITIAL_STATE, loading: true, error: "" };
    case CONSTANTS.MATCH_LIST_FETCH_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload, data: [...state.data, ...action.payload.data] };
    case CONSTANTS.MATCH_LIST_FETCH_FAIL:
      return { ...state, error: "List can not be fetched", loading: false };
    default:
      return state;
  }
};
