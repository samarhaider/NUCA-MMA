import React from 'react';
import { Provider } from "react-redux";
import { AppLoading, Asset, Font } from "expo";
import { FontAwesome } from '@expo/vector-icons';
import { AsyncStorage, Image } from "react-native";
import { StyleProvider, Root, ActionSheet } from 'native-base';
import { NavigationActions } from 'react-navigation';

// import Router from "./src/Router";
import './src/Config/ReactotronConfig';
import ReduxNavigation from "./src/ReduxNavigation";
import configureStore from "./src/Redux/createStore";
import * as CONSTANTS from "./src/Constants";
// import { getProfile, inProgressLoad } from "./src/Actions";
import getTheme from "./native-base-theme/components";
import commonColor from "./native-base-theme/variables/commonColor";

// create our store
export const store = configureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }

  componentWillUnmount() {
    // ActionSheet.actionsheetInstance = null;
  }

  async _loadAssetsAsync() {
    const token = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEY);
    const imageAssets = cacheImages([
      require('./assets/bg.png'),
      require('./assets/icon.png'),
    ]);    
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    if(token) {
      // store.dispatch(setlProfile(JwtDecode(token));
      store.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: 'drawerStack' })
        ]
      }));
    }

  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />;
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          <Root>
            <ReduxNavigation />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }

}
