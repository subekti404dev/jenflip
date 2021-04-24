import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../constants/StorageKeyConstant';
import CredentialUtil from './CredentialUtil';
const JeniusSDK = require('jenius-sdk');
const {FlipSDK} = require('flip-sdk');

export default class VendorUtil {
  public static async jenius() {
    const jeniusData = await CredentialUtil.jenius();
    const jenius = new JeniusSDK(jeniusData.userId, jeniusData.device);
    await jenius.refreshToken();
    return jenius;
  }

  public static async flip() {
    const flipData = await CredentialUtil.flip();
    const flip = new FlipSDK({accessToken: flipData.token});
    const {token} = await flip.refreshToken();
    flipData.token = token;
    await AsyncStorage.setItem(StorageKey.Flip, JSON.stringify(flipData));
    return flip;
  }
}
