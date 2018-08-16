import variable from "./../variables/platform";
import styles from "../../src/styles";

export default (variables = variable) => {
  const contentTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: styles.containerBgColor,   // added by samar 07-Dec-17
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "transparent"
    }
  };

  return contentTheme;
};
