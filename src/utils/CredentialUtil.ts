import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../constants/StorageKeyConstant';

export default class CredentialUtil {
  public static async jenius() {
    try {
      const str = await AsyncStorage.getItem(StorageKey.Jenius);
      if (str) {
        return JSON.parse(str);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public static async flip() {
   try {
     const str = await AsyncStorage.getItem(StorageKey.Flip);
     if (str) {
       return JSON.parse(str);
     } else {
       return null;
     }
   } catch (error) {
     return null;
   }
 }
}
