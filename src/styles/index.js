const textColor = '#FFFF';
const themeColor = "#FAFAFA";
// const backGroundColor = "#16364f";
const testImageURL =
  "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/18581627_10209170464286529_2111883646500482439_n.jpg?oh=030374ea4eb7c64bb594034021c1116e&oe=5AA007B9";

const styles = {
  testImageURL: testImageURL,
  containerBgColor: "#000",
  fooButtonText: {fontSize: 20, color: '#fff'},
  authHeader: { backgroundColor: "#020203", alignItems: "center" },
  authSubmitButton: { borderRadius: 5},
  vs: {color: "#CECECE", fontSize: 30, fontWeight:"bold", marginTop: -40,},
  loginIcons: {marginLeft: 10, marginRight: 10, color: '#FFF', fontSize: 20},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 10,
    height: 250,
    width: 300,
    // backgroundColor: "#3B5998"
  },
  successText: { color: "#da0011", marginTop: 15,},
  modalText: {color: "#848484", textAlign: 'center', paddingHorizontal: 30,},
  timerRow: {
    marginTop: -12,
    marginLeft: -16,
    marginRight: -17,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEECEC"
  },
  horizontalLine: {
    borderBottomColor: '#848484',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10
  },
  timerNormalText: { color: "#006DF0" },
  timerDangerText: { color: "#E42323" },
  // favorDetailCardItem: { borderWidth: 1, borderColor: "grey", marginTop: 10 },
  headerBody: { justifyContent: "center", alignItems: "center" },
  authFooterText: { color: textColor },
  background: {
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerContainer: { paddingTop: 50, backgroundColor: "#575655" },
  drawerItem: { fontSize: 20, color: "white", marginBottom: 10, marginLeft: 20, height: 25 },
  listRow: { paddingTop: 5, paddingBottom: 5, paddingLeft: 10 },
  listRowText: { alignSelf: "flex-start" ,marginBottom:3},
  listRowTextEnd: { alignSelf: "flex-end" ,marginBottom:3},
  label: { color: textColor, marginLeft: 5 },
  picker: { color: textColor, flex: 1 },
  submitButton: { marginTop: 5, marginBottom: 10, height: 35 },
  submitButtonText: { fontSize: 15 },
  navigationOptions: {
    headerStyle: { backgroundColor: "#FAFAFA" },
    headerTitleStyle: { alignSelf: "center" }
  },
  icons: {
    conversationSpeechBubbles:
      "../../assets/icons/conversation-speech-bubbles.png",
  }
};

export default styles;
