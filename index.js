import {AppRegistry, Image, YellowBox} from 'react-native';
import App from './App';
import FirstActivity from "./activity/FirstActivity";
import {createStackNavigator,createBottomTabNavigator} from "react-navigation";
import StackViewStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import SecondActivity from "./activity/SecondActivity";
import MainActivity from "./activity/MainActivity";
import PhoneLoginActivity from "./activity/PhoneLoginActivity";
import ListViewActivity from './activity/ListViewActivity';
import NickListActivity from './activity/NickListActivity';
import NickListActivity2 from './activity/NickListActivity2';
import FetchActivity from './activity/FetchActivity';
import PopularFragment from './activity/fragment/PopularFragment';
import PopularFragment2 from './activity/fragment/PopularFragment2';
import MeFragment from './activity/fragment/MeFragment';
import CustomKeyActivity from './activity/CustomKeyActivity';
import SortKeyActivity from "./activity/SortKeyActivity";
import RepositoryDetailActivity from "./activity/RepositoryDetailActivity";
import FlatListActivity from "./activity/FlatListActivity";
import FlatListActivity2 from "./activity/FlatListActivity2";
import HeyGuysHome from "./activity/HeyGuysHome";
import SwipeableFlatListActivity from "./activity/SwipeableFlatListActivity";
import SectionListActivity from "./activity/SectionListActivity";
import Boy from "./Boy";
import Girl from "./Girl";
import React from "react";
import {bottomTabNavigator} from './navigators/AppStackNavigator'



const Nick = createStackNavigator({
    App:{screen:App},
    PhoneLoginActivity:{screen:PhoneLoginActivity},
    FirstActivity:{screen:FirstActivity},
    SecondActivity:{screen:SecondActivity},
    MainActivity:{screen:MainActivity,navigationOptions:{title:"最热"}},
    ListViewActivity:{screen:ListViewActivity},
    NickListActivity:{screen:NickListActivity},
    NickListActivity2:{screen:NickListActivity2},
    FetchActivity:{screen:FetchActivity},
    PopularFragment:{screen:PopularFragment},
    PopularFragment2:{screen:PopularFragment2},
    MeFragment:{screen:MeFragment},
    CustomKeyActivity:{screen:CustomKeyActivity},
    SortKeyActivity:{screen:SortKeyActivity},
    RepositoryDetailActivity:{screen:RepositoryDetailActivity},
    FlatListActivity:{screen:FlatListActivity},
    FlatListActivity2:{screen:FlatListActivity2},
    HeyGuysHome:{screen:HeyGuysHome},
    SwipeableFlatListActivity:{screen:SwipeableFlatListActivity},
    SectionListActivity:{screen:SectionListActivity},
    Boy:{screen:Boy,navigationOptions: {title:"Boy"}},
    Girl:{screen:Girl,navigationOptions: ({navigation})=>({title:navigation.state.params.word})},
    BottomTestMenu:{screen:bottomTabNavigator},//把Tab页作为一个Activity,也可以把它当做一个根节点
},{
    initialRouteName:'MainActivity',
    headerMode:'none'

});


AppRegistry.registerComponent('GithubProject',()=>Nick);

// AppRegistry.registerComponent('GithubProject', () => FirstActivity);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);