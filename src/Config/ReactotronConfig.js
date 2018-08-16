import Reactotron, { asyncStorage, trackGlobalErrors } from 'reactotron-react-native'
// //import Reactotron, { openInEditor } from 'reactotron-react-native'
// // const errorPlugin = require('reactotron-react-native').trackGlobalErrors
import apisaucePlugin from 'reactotron-apisauce';
import { reactotronRedux } from  'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  
//   // register apisauce so we can install a monitor later
    .use(apisaucePlugin())
    
//     // setup the redux integration with Reactotron
    .use(reactotronRedux())

//     // register the redux-saga plugin so we can use the monitor in CreateStore.js
    .use(sagaPlugin())

  // register the asyncStorage
    .use(asyncStorage())

    .use(trackGlobalErrors({
      veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
     }))

  .connect() // let's connect!
// // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

//     // Totally hacky, but this allows you to not both importing reactotron-react-native
//   // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
