import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import NavigationUtil from '../../utils/NavigationUtil';
import StorageKey from '../../constants/StorageKeyConstant';
import CredentialUtil from '../../utils/CredentialUtil';

type ProfileScreenNavigationProp = StackNavigationProp<any>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Boot = (props: Props) => {
  React.useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    const jeniusData = await CredentialUtil.jenius();
    if (!jeniusData) {
      NavigationUtil.reset(props.navigation, 'Jenius');
      return;
    }
    const flipData = await CredentialUtil.flip();
    if (!flipData) {
      NavigationUtil.reset(props.navigation, 'Flip');
      return;
    }
    NavigationUtil.reset(props.navigation, 'Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ActivityIndicator size={'large'} color="#42B14C" />
      <Text style={styles.loadingText}>Loading</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#FFF',
  },
  loadingText: {
    marginTop: 10,
  },
});

export default Boot;
