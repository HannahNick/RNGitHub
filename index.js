import { AppRegistry ,YellowBox} from 'react-native';
import App from './App';
import FirstActivity from "./activity/FirstActivity";
import {StackNavigator} from "react-navigation";
import SecondActivity from "./activity/SecondActivity";
import MainActivity from "./activity/MainActivity";
import PhoneLoginActivity from "./activity/PhoneLoginActivity";
import ListViewActivity from './activity/ListViewActivity';
import NickListActivity from './activity/NickListActivity';
import NickListActivity2 from './activity/NickListActivity2';
import FetchActivity from './activity/FetchActivity';
import PopularFragment from './activity/fragment/PopularFragment';


const Nick = StackNavigator({
    App:{screen:App},
    PhoneLoginActivity:{screen:PhoneLoginActivity},
    FirstActivity:{screen:FirstActivity},
    SecondActivity:{screen:SecondActivity},
    MainActivity:{screen:MainActivity},
    ListViewActivity:{screen:ListViewActivity},
    NickListActivity:{screen:NickListActivity},
    NickListActivity2:{screen:NickListActivity2},
    FetchActivity:{screen:FetchActivity},
    PopularFragment:{screen:PopularFragment},
},{
    initialRouteName:'PopularFragment',
    headerMode:'none',
});

AppRegistry.registerComponent('GithubProject',()=>Nick);

// AppRegistry.registerComponent('GithubProject', () => FirstActivity);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);