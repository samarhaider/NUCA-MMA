import * as CONSTANTS from '../Constants';

const roundData = {
  player1: {},
  player2: {},
};
const INITIAL_STATE = {
  rounds: [roundData],
  roundsLimit: 5,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ROUND_ADD:
      return {...state, rounds: [ ...state.rounds, roundData ]};
    case CONSTANTS.ROUND_REMOVE:
      const rounds = state.rounds;
      rounds.splice(action.payload, 1);
      // let rounds = state.rounds.filter(item => item !== action.payload)
      return {...state, rounds };
    default:
      return state;
  }
};