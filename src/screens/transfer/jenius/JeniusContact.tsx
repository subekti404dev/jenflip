import React from 'react';
import {View} from 'react-native';
import ContactService from '../../../services/ContactService';

export default function JeniusContact() {
  React.useEffect(() => {
     getData();
  }, []);

  const getData = async () => {
     const data = await ContactService.getJeniusContact();
     console.log(data);
     
  };

  return <View></View>;
}
