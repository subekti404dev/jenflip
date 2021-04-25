import React from 'react';
import {Alert, Image, SafeAreaView} from 'react-native';
import {Button, Col, Gap, Input, Padder, Row} from 'urip-rn-kit';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../../constants/StorageKeyConstant';
import NavigationUtil from '../../utils/NavigationUtil';
const {FlipSDK} = require('flip-sdk');

interface Props {
  navigation: any;
}

export default function Flip(props: Props) {
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLogin = async () => {
    try {
      const flip = new FlipSDK();
      setLoading(true);
      const {token} = await flip.login(email, password);
      const data = {token, email, password};
      await AsyncStorage.setItem(StorageKey.Flip, JSON.stringify(data));
      setLoading(false);
      NavigationUtil.reset(props.navigation, 'Home');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <>
      <SafeAreaView>
        <Padder all={20}>
          <Col alignCenter>
            <Image
              source={Images.flip_logo}
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
              secureTextEntry
              onChangeText={x => setPassword(x)}
            />
            <Gap vertical size={25} />

            <Button
              color="#FD6342"
              label="Login"
              disabled={!email || !password}
              onPress={onLogin}
            />
          </Col>
        </Padder>
      </SafeAreaView>

      <Spinner visible={loading} />
    </>
  );
}
