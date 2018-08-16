// import { Toast } from "native-base";
import { NavigationActions } from 'react-navigation';
import Toast from "react-native-root-toast";
import Modal from "react-native-modalbox";
import * as CONSTANTS from "../Constants";
import validate from "./validate";
import { store } from "../../App";

export default function validateRules(
  fields,
  rules,
  options
  // options = { format: "flat" }
) {
  const errors = validate(fields, rules, options);
  if (errors) {
    showErrors(errors);
  }
  return errors;
}

export function showErrors(errors) {
  let errorString = "";
  if (typeof errors === 'string' || errors instanceof String) {
    errorString = errors;
  } else {
    Object.keys(errors).forEach(function(key) {
      errors[key].forEach(function(value) {
        errorString += `${value}
  `;
      });
    });
  }

  // Toast.show({ text: errorString, type: "danger", duration: 3000 });
  Toast.show(errorString.trim(), {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });
}

export function showErrorsAndReturnPayload(response) {
  const { problem } = response;
  let payload = {};
  let errors = null;
  switch (problem) {
    case CONSTANTS.API_CLIENT_ERROR:
      // if(response.status) {
      //   store.dispatch(NavigationActions.reset({
      //       index: 0,
      //       key: null,
      //       actions: [
      //           NavigationActions.navigate({ routeName: 'loginStack' })
      //       ]
      //     })
      //   );
      // }
      payload = response.data;
      errors = payload.errors || payload.message;
      break;
    case CONSTANTS.API_NETWORK_ERROR:
      errors = 'Network Error';
      break;
    case CONSTANTS.API_TIMEOUT_ERROR:
    case CONSTANTS.API_CONNECTION_ERROR:
      errors = 'Server not found';
      break;
      case CONSTANTS.API_SERVER_ERROR:
      errors = 'Internal server error';
      break;
  default:

  }
  if(errors) {
    showErrors(errors);
  }
  return payload;
}
// export function showErrorsModal(errors) {
//   let errorString = "";
//   Object.keys(errors).forEach(function(key) {
//     errors[key].forEach(function(value) {
//       errorString += `
// ${value}`;
//     });
//   });
//   <Modal style={[styles.modal, styles.modal2]} backdrop={false} position={"top"} ref={"modal2"}>
//     <Text style={[styles.text, { color: "white" }]}>errorString</Text>
//   </Modal>;
// }
const phoneRegix = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const loginValidation = {
  // phone: {
  //   presence: {
  //     message: "^Please enter an phone"
  //   },
  //   format: {
  //     pattern: phoneRegix,
  //     message: '^Please enter a valid phone'
  //   }
  // },
  // password: {
  //   presence: true,
  //   // presence: {
  //   //   message: '^Please enter a password'
  //   // },
  //   length: {
  //     minimum: 5,
  //     message: "must be at least 5 characters"
  //   }
  // }
};

export const registerValidation = {
  firstname: {
    presence: {
      message: "^Please enter an first name"
    }
  },
  lastname: {
    presence: {
      message: "^Please enter an last name"
    }
  },
  phone: {
    presence: {
      message: "^Please enter an phone"
    },
    format: {
      pattern: phoneRegix,
      message: '^Please enter a valid phone'
    }
  },

  email: {
    presence: {
      message: "^Please enter an email address"
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "^Please enter a valid email address"
    }
  },

  password: {
    presence: {
      message: "^Please enter a password"
    },
    length: {
      minimum: 5,
      message: "^Your password must be at least 5 characters"
    }
  },
  password_confirmation: {
    presence: {
      message: "^Please enter a confirmconfirm password"
    },
    equality: "password"
  }
};

export const sendCodeValidation = {
  //  phone: {
  //   presence: {
  //     message: "^Please enter an phone"
  //   },
  //   format: {
  //     pattern: phoneRegix,
  //     message: '^Please enter a valid phone'
  //   }
  // },
};

export const resetPasswordValidation = {
  // code: {
  //   presence: true,
  //   length: {
  //     is: 4,
  //     message: "must be 4 characters"
  //   }
  // },
  // password: {
  //   presence: {
  //     message: "^Please enter a password"
  //   },
  //   length: {
  //     minimum: 5,
  //     message: "^Your password must be at least 5 characters"
  //   }
  // },
  // password_confirmation: {
  //   presence: {
  //     message: "^Please enter a confirmconfirm password"
  //   },
  //   equality: "password"
  // }
};

export const addFavour = {
  ttile: {
    presence: true,
  },
  description: {
    presence: true,
  },
  points: {
    presence: true,
  },
};
