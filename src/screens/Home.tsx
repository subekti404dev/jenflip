import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {ScaledText} from 'urip-rn-kit';
import UserService from '../services/UserService';
import VendorUtil from '../utils/VendorUtil';

export default function Home(props: any) {
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await UserService.getUser();
    console.log(data);
  };

  return (
    <SafeAreaView>
      <View>
        <ScaledText>Home</ScaledText>
      </View>
    </SafeAreaView>
  );
}
