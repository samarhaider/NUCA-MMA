import React, { Component } from "react";
import { Platform, StatusBar, Text } from "react-native";
import { Icon } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import LoginContainer from "./Containers/LoginContainer";
import SendCodeContainer from "./Containers/SendCodeContainer";
import DrawerContainer from './Containers/DrawerContainer';
import HomeContainer from "./Containers/HomeContainer";
import ResultAddContainer from "./Containers/ResultAddContainer";
import SelectWinnerContainer from "./Containers/SelectWinnerContainer";
import styles from "./styles";

const DrawerStack = StackNavigator(
  {
    home: { screen: HomeContainer },
    resultAdd: { screen: ResultAddContainer },
    selectWinner: { screen: SelectWinnerContainer },
  },
  {
    initialRouteName: "home",
    gesturesEnabled: false,
    navigationOptions: {
      header: null
    }
  }
);

const DrawerNavigation = DrawerNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    contentComponent: props => <DrawerContainer {...props} />,
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.navigationOptions.headerStyle,
      headerTitleStyle: styles.navigationOptions.headerTitleStyle,
      // title: "Logged In to your app!",
      headerLeft: (
        <Text
          onPress={() => navigation.navigate("DrawerToggle")}
          style={{ paddingLeft: 10 }}
        >
          <Icon name="menu" />
        </Text>
      )
    })
  }
);

// login stack
const LoginStack = StackNavigator(
  {
    login: { screen: LoginContainer },
    sendCode: { screen: SendCodeContainer }
  },
  {
    headerMode: "float",
    navigationOptions: {
      header: null
    },
    initialRouteName: "login"
  }
);

const Router = StackNavigator(
  {
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "loginStack",
    // cardStyle: {
    //   paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    // }
  }
);

export default Router;
