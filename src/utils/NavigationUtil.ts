import { CommonActions } from '@react-navigation/native';

class NavigationUtil {
  static reset(navigation: any, routeName: string) {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        { name: routeName }
      ],
    });
    navigation.dispatch(resetAction);
  }

  static push(navigation: any, routeName: string, params?: object) {
   navigation.navigate(routeName, params);
  }

  static back(navigation: any) {
     navigation.goBack();
  }
}

export default NavigationUtil;