import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledText} from 'urip-rn-kit';
import TransferService from '../../../services/TransferService';
import RenderIf from '../../../shareds/RenderIf';
import JeniusContact from './JeniusContact';

export default function TransferViaJenius() {
  const [bankList, setBankList] = React.useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = React.useState(0);
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const bankList = await TransferService.getJeniusBankList();
    setBankList(bankList);
  };

  return (
    <>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
        <Switch
          data={['Contacts', 'Favorites']}
          initialIndex={0}
          onChange={x => setActiveMenuIndex(x)}
        />
        <RenderIf condition={activeMenuIndex === 0}>
          <JeniusContact />
        </RenderIf>
        <RenderIf condition={activeMenuIndex === 1}>
          {/* <FlatList
            data={bankList}
            keyExtractor={(v, i) => i.toString()}
            renderItem={({item, index}: {item: any; index: number}) => {
              return (
                <ScaledText key={index} color={''}>
                  {item.displayName}
                </ScaledText>
              );
            }}
          /> */}
        </RenderIf>
      </SafeAreaView>
    </>
  );
}

const Switch = (props: {
  data: string[];
  initialIndex?: number;
  onChange?: (index: number) => void;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.initialIndex) setActiveIndex(props.initialIndex);
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#dedede',
          borderRadius: (20).scale(),
          padding: (4).scale(),
        }}>
        {props.data.map((x, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveIndex(i);
                if (props.onChange) props.onChange(i);
              }}
              style={{
                backgroundColor: isActive ? '#42B14C' : 'rgba(0,0,0,0)',
                paddingHorizontal: (20).scale(),
                paddingVertical: (8).scale(),
                borderRadius: (20).scale(),
              }}>
              <ScaledText bold color={isActive ? '#FFF' : 'grey'}>
                {x}
              </ScaledText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};