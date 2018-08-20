import { Platform, Dimensions } from "react-native";

import variable from "./../variables/platform";
import styles from "../../src/styles";

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
  const theme = {
    backgroundColor: variables.cardHeaderBg,
    // backgroundColor: "transparent",
    flex: 1,
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  };

  return theme;
};
