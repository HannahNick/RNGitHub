/**
 * Created by nick on 2018/8/27
 */

import {StackActions,NavigationActions} from 'react-navigation';
import CustomKeyActivity from "../../activity/CustomKeyActivity";

export default class NavigationUtil {

    /**
     * 返回到上级页面
     * @param params
     * 需要参数:
     * 1.navigation对象
     */
    static goBack(params){
        const {navigation} = params;
        navigation.goBack();
    }

    /**
     * 跳转页面
     * @param arg
     * 需要参数:
     * 1.navigation对象
     * 2.路由名
     * 3.携带参数
     */
    static goPage(arg){
        const {navigation,routeName,params} = arg;
        navigation.navigate(routeName,params);

    }

    /**
     * 跳到首页并作为第一页面
     * @param arg
     * 1.navigation对象
     * 2.携带参数
     */
    static resetToHomePage(arg){
        const {navigation} = arg;
        const resetAction = StackActions.reset({
            index: 1,
            actions:[NavigationActions.navigate({routeName:"MainActivity"}),NavigationActions.navigate({routeName:"FirstActivity"})]
        });
        navigation.dispatch(resetAction);
    }

    /**
     * 回到栈顶
     * @param arg
     */
    static popToPopPage(arg){
        const {navigation} = arg;
        navigation.popToTop();
    }

    /**
     * 干掉当前页并跳到下一个页面
     * @param arg
     */
    static replace(arg){
        const {navigation,routeName,params} = arg;
        navigation.replace(routeName,params);
    }

}