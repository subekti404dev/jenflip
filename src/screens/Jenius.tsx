import React from 'react';
import {Alert, Image, SafeAreaView} from 'react-native';
import {Button, Col, Gap, Input, Padder, Row} from 'urip-rn-kit';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../constants/StorageKeyConstant';
import NavigationUtil from '../utils/NavigationUtil';
const JeniusSDK = require('jenius-sdk');

interface Props {
  navigation: any;
}

export default function Jenius(props: Props) {
  const [loading, setLoading] = React.useState(false);
  const [screenIndex, setScreenIndex] = React.useState(0);
  const [data, setData]: [
    data: any,
    setData: (val: any) => void,
  ] = React.useState({});

  const onLogin = async (email: string, password: string) => {
    try {
      const jenius = new JeniusSDK();
      setLoading(true);
      const res = await jenius.setup.login(email, password);
      setData({
        email,
        password,
        authId: res.authId,
      });
      setLoading(false);
      setScreenIndex(1);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const onVerify = async (otp: string) => {
    try {
      const jenius = new JeniusSDK();
      setLoading(true);
      const res = await jenius.setup.otp(data.authId, otp, 'JenFlip Device');
      const credentials = {
        ...res,
        ...{email: data.email, password: data.password},
      };
      await AsyncStorage.setItem(
        StorageKey.Jenius,
        JSON.stringify(credentials),
      );
      setLoading(false);
      NavigationUtil.reset(props.navigation, 'Flip')
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <>
      {screenIndex === 0 && <JeniusLogin onSubmit={onLogin} />}
      {screenIndex === 1 && <JeniusOTP onSubmit={onVerify} />}

      <Spinner visible={loading} textContent={'Loading...'} textStyle={{}} />
    </>
  );
}

function JeniusLogin(props: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView>
      <Padder all={20}>
        <Col alignCenter>
          <Image
            source={Images.jenius_logo}
            style={{width: 150, height: 60}}
            resizeMode="contain"
          />
          <Gap size={30} vertical />

          <Input
            placeholder="Email"
            value={email}
            autoCapitalize={'none'}
            onChangeText={x => setEmail(x)}
          />
          <Gap vertical />
          <Input
            placeholder="Password"
            value={password}
            autoCapitalize={'none'}
            onChangeText={x => setPassword(x)}
          />
          <Gap vertical size={25} />

          <Button
            color="#03ABE8"
            label="Login"
            disabled={!email || !password}
            onPress={async () => {
              await props.onSubmit(email, password);
              //   setEmail('');
              setPassword('');
            }}
          />
        </Col>
      </Padder>
    </SafeAreaView>
  );
}

function JeniusOTP(props: any) {
  const [otp, setOtp] = React.useState('');

  return (
    <SafeAreaView>
      <Padder all={20}>
        <Col alignCenter>
          <Image
            source={Images.jenius_logo}
            style={{width: 150, height: 60}}
            resizeMode="contain"
          />
          <Gap size={30} vertical />

          <Input placeholder="OTP" value={otp} onChangeText={x => setOtp(x)} />

          <Gap vertical size={25} />

          <Button
            color="#03ABE8"
            label="Verify"
            disabled={!otp}
            onPress={async () => {
              await props.onSubmit(otp);
              setOtp('');
            }}
          />
        </Col>
      </Padder>
    </SafeAreaView>
  );
}
