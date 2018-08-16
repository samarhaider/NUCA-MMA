import * as CONSTANTS from '../Constants';

const INITIAL_STATE = {
  data: {},
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.PROFILE:
      return { ...state, loading: true, error: '' };
    case CONSTANTS.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload
      };
    case CONSTANTS.PROFILE_FETCH_FAIL:
      return {
        ...state,
        error: 'List can not be fetched',
        loading: false
      };
    default:
      return state;
  }
};
