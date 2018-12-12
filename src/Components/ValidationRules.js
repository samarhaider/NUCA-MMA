import { Toast } from "native-base";
// import Toast from "react-native-root-toast";
import * as CONSTANTS from "../Constants";
import validate from "./validate";

export default function validateRules(
  fields,
  rules,
  options
  // options = { format: "flat" }
) {
  const errors = validate(fields, rules, options);
  // if (errors) {
  //   showErrors(errors);
  // }
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

  Toast.show({ text: errorString.trim(), duration: 3000 });
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

const addRoundObj  = {
  presence: { 
    allowEmpty: false
  },
  numericality: {
    onlyInteger: true,
    greaterThanOrEqualTo: 0,
    lessThan: 100,
  }
};

export const addRoundValidation = {
  control: addRoundObj,
  knock_downs: addRoundObj,
  total_strike: addRoundObj,
  significant_strike: addRoundObj,
  take_downs: addRoundObj,
  sub_attempts: addRoundObj,
};

export const selectWinnerValidation = {
  winner: {
    presence: { 
      allowEmpty: false,
      message: "^Please select Winner",
    },
  },
  win_type: {
    presence: { 
      allowEmpty: false,
      message: "^Please select Win Type",
    },
  }
};
