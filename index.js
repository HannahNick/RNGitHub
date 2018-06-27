import { AppRegistry ,YellowBox} from 'react-native';
import App from './App';
import FirstActivity from "./activity/FirstActivity";
import {StackNavigator} from "react-navigation";
import SecondActivity from "./activity/SecondActivity";
import MainActivity from "./activity/MainActivity";
import PhoneLoginActivity from "./activity/PhoneLoginActivity";


const Nick = StackNavigator({
    App:{screen:App},
    FirstActivity:{screen:FirstActivity},
    SecondActivity:{screen:SecondActivity},
    MainActivity:{screen:MainActivity},
    PhoneLoginActivity:{screen:PhoneLoginActivity},
},{
    initialRouteName:'PhoneLoginActivity',
    headerMode:'none',
});

AppRegistry.registerComponent('GithubProject',()=>Nick);

// AppRegistry.registerComponent('GithubProject', () => FirstActivity);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);