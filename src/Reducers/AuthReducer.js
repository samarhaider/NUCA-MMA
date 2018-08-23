import { NavigationActions } from 'react-navigation';
import * as CONSTANTS from '../Constants';

const INITIAL_STATE = {
  grant_type: 'password',
  client_id: 2,
  client_secret: 'rLZHSvoujOhm1OQiDJiInnsP25YXlrYoKJJJ9nve',
  username: "",
  // password: "dummy",
  // email: "eino41@example.net",
  password: "",
  email: "",
  modalSuccess: false,
  // user: null,
  token: null,
  error: '',
  loading: false,
  updateProfile:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case CONSTANTS.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case CONSTANTS.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONSTANTS.PASSWORD_RESET_CODE_CHANGED:
      return { ...state, code: action.payload };
    case CONSTANTS.LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case CONSTANTS.LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: "", loading: false };
    case CONSTANTS.REGISTER_USER:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case CONSTANTS.REGISTER_USER_FAIL:
      return { ...state, error: action.payload, password: "", loading: false };
    case CONSTANTS.VERIFICATION_CODE_CHANGED:
      return { ...state, verification_code: action.payload };
    case CONSTANTS.SEND_VERIFICATION_CODE:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.SEND_VERIFICATION_CODE_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case CONSTANTS.SEND_VERIFICATION_CODE_FAIL:
      return { ...state, error: action.payload, verification_code: "", loading: false };
    case CONSTANTS.RESEND_VERIFICATION_CODE:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.RESEND_VERIFICATION_CODE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case CONSTANTS.RESEND_VERIFICATION_CODE_FAIL:
      return { ...state, error: action.payload, verification_code: "", loading: false };
    case CONSTANTS.MODAL_SUCCESS_RESEND_PASSWORD:
      return { ...state, modalSuccess: action.payload };
    case CONSTANTS.SEND_PASSWORD_RESET_CODE:
      return { ...state, loading: true, error: "", modalSuccess: false  };
    case CONSTANTS.SEND_PASSWORD_RESET_CODE_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload, modalSuccess: true };
    case CONSTANTS.SEND_PASSWORD_RESET_CODE_FAIL:
      return { ...state, error: action.payload, loading: false, modalSuccess: false };
    case CONSTANTS.CHANGE_PASSWORD:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.CHANGE_PASSWORD_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case CONSTANTS.CHANGE_PASSWORD_FAIL:
      return { ...state, error: action.payload, code: "", password: "", password_confirmation: "", loading: false };
    case CONSTANTS.LOGOUT_USER:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.LOGOUT_USER_FAIL:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.LOGOUT_USER_SUCCESS:
      return { ...INITIAL_STATE, loading: false, error: "" };
    case CONSTANTS.PROFILE_FETCH:
      return { ...state, loading: true, error: "" };
    case CONSTANTS.PROFILE_FETCH_SUCCESS:
      return { ...state, loading: false, error: "", ...action.payload , updateProfile:action.payload};
    case CONSTANTS.PROFILE_FETCH_FAIL:
      return { ...state, loading: false, error: "" };
    case CONSTANTS.FETCH_DATA_FROM_STORAGE_SUCCESS:
      return { ...INITIAL_STATE, loading: false, error: "", ...action.payload };
    case CONSTANTS.FETCH_DATA_FROM_STORAGE_FAIL:
      return { ...INITIAL_STATE, loading: false, error: "" };
    case CONSTANTS.PROFILE_AVATAR_UPDATE:
      return { ...state, loading: true};
    case CONSTANTS.PROFILE_AVATAR_UPDATE_SUCCESS:
      return { ...state, profile: action.payload , loading: false, error: ""};
    case CONSTANTS.PROFILE_AVATAR_UPDATE_FAIL:
      return { ...state, error: action.payload, password: "", loading: false};
    default:
      return state;
  }
};
