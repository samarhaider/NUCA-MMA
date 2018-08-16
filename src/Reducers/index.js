import { combineReducers } from 'redux';
import NavigationReducer from  './NavigationReducer';
import AuthReducer from './AuthReducer';
import MatchReducer from "./MatchReducer";
import MatchDetailReducer from "./PostDetailReducer";
import ResultRoundsReducer from "./ResultRoundsReducer";
import SelectWinnerReducer from "./SelectWinnerReducer";

export default combineReducers({
  nav: NavigationReducer,
  auth: AuthReducer,
  matchList: MatchReducer,
  matchDetail: MatchDetailReducer,
  resultRounds: ResultRoundsReducer,
  selectWinner: SelectWinnerReducer,
});
