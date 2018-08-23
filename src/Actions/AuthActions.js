import * as CONSTANTS from "../Constants";

export const usernameChanged = text => {
  return { type:  CONSTANTS.USERNAME_CHANGED, payload: text };
};

export const emailChanged = text => {
  return {
    type:  CONSTANTS.EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type:  CONSTANTS.PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = text => {
  return {
    type:  CONSTANTS.CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const firstNameChanged = text => {
  return {
    type:  CONSTANTS.FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastNameChanged = text => {
  return {
    type:  CONSTANTS.LAST_NAME_CHANGED,
    payload: text
  };
};

export const cityNameChanged = text => {
  return { type:  CONSTANTS.CITY_NAME_CHANGED, payload: text };
};

export const verificationCodeChanged = text => {
  return { type:  CONSTANTS.VERIFICATION_CODE_CHANGED, payload: text };
};
export const passwordResetCodeChanged = text => {
  return { type:  CONSTANTS.PASSWORD_RESET_CODE_CHANGED, payload: text };
};

export const loginUser = payload => {
  return {
    type:  CONSTANTS.LOGIN_USER,
    payload
  };
};

export const logoutUser = payload => {
  return {
    type:  CONSTANTS.LOGOUT_USER,
    payload
  };
};

export const registerUser = payload => {
  return { type: CONSTANTS.REGISTER_USER, payload };
};

export const sendVerificationCode = payload => {
  return {
    type:  CONSTANTS.SEND_VERIFICATION_CODE,
    payload
  };
};

export const sendPasswordResetCode = payload => {
  return {
    type:  CONSTANTS.SEND_PASSWORD_RESET_CODE,
    payload
  };
};

export const modalSuccessPasswordResetCode = payload => {
  return {
    type:  CONSTANTS.MODAL_SUCCESS_RESEND_PASSWORD,
    payload
  };
};

export const changePassword = payload => {
  return {
    type:  CONSTANTS.CHANGE_PASSWORD,
    payload
  };
};

export const getloginUserDetail = payload => {
  return {
    type:  CONSTANTS.LOGIN_USER_DETAIL,
    payload
  };
};

export const getProfile = payload => {
  return {
    type:  CONSTANTS.PROFILE_FETCH,
    payload
  };
};
export const avatarImageChanged = text => {
  return { 
    type: CONSTANTS.PROFILE_AVATAR_UPDATE,
    payload: text
  };
};

export const resendVerificationCode = payload => {
  return {
    type:  CONSTANTS.RESEND_VERIFICATION_CODE,
    payload
  };
};

export const goRegisterScene = () => {
  // Actions.register();
};
export const goLoginScene = () => {
  // Actions.login();
};
export const goBackScene = () => {
  // Actions.pop();
};
