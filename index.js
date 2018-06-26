import { AppRegistry ,YellowBox} from 'react-native';
import App from './App';
import FirstActivity from "./activity/FirstActivity";
import {StackNavigator} from "react-navigation";
import SecondActivity from "./activity/SecondActivity";


const Nick = StackNavigator({
    App:{screen:App},
    FirstActivity:{screen:FirstActivity},
    SecondActivity:{screen:SecondActivity},
});

AppRegistry.registerComponent('GithubProject',()=>Nick);

// AppRegistry.registerComponent('GithubProject', () => FirstActivity);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);