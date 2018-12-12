import * as CONSTANTS from '../Constants';

const roundData = {
  // 1: {},
  // 2: {},
};
const INITIAL_STATE = {
  // rounds: [roundData],
  rounds: [],
  roundsLimit: 5,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ROUND_ERROR_EMPTY:
      return { ...state, error: '' };
    case CONSTANTS.ROUND_ERROR_SET:
      return { ...state, error: action.payload };
    case CONSTANTS.ROUND_SET_INITIAL:
      return {...INITIAL_STATE};
    case CONSTANTS.ROUND_ADD:
      return {...state, rounds: [ ...state.rounds, action.payload ]};
    // case CONSTANTS.MATCH_DETAIL_SUCCESS:
    //   // roundData = [];
    //   roundData[action.payload.athlete_one_data.user_id] =  {};
    //   roundData[action.payload.athlete_two_data.user_id] =  {};
    //   return {...state};
    case CONSTANTS.ROUND_REMOVE:
      const rounds = state.rounds;
      rounds.splice(action.payload, 1);
      // let rounds = state.rounds.filter(item => item !== action.payload)
      return {...state, rounds };
    case CONSTANTS.RESULT_CHANGED:
      const {payload} = action;
      const rounds2 = state.rounds;
      rounds2[payload.index][payload.player_id][payload.field] = payload.text;
      return {...state, rounds: rounds2 };
    default:
      return state;
  }
};