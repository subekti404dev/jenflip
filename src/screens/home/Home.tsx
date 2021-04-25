import moment from 'moment';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Box, Gap, ImgIcon, Padder, ScaledText, utils} from 'urip-rn-kit';
import Icons from '../../assets/icons';
import Images from '../../assets/images';
import UserService from '../../services/UserService';
const _ = utils._;

export default function Home(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser]: [user: any, setUser: any] = React.useState(null);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data = await UserService.getUser();
    setUser(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <Padder top={35}>
      <View>
        <Padder top horizontal={15}>
          <ScaledText size={14}>{'Welcome,'}</ScaledText>
          <ScaledText size={20} bold>
            {_.get(user, 'jeniusUser.nickname')}
          </ScaledText>
        </Padder>
        <ScrollView
          //  onScroll={event => {
          //    const positionX = event.nativeEvent.contentOffset.x;
          //    const positionY = event.nativeEvent.contentOffset.y;
          //    console.log(positionX, positionY);
          //  }}
          snapToInterval={240} //your element width
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <Card
            bg={Images.jenius_bg}
            name={'Jenius'}
            balance={_.get(user, 'jeniusCard[0].balance.current', 0).toRupiah(
              true,
            )}
          />
          <Card
            bg={Images.flip_bg}
            name={'Flip'}
            balance={_.get(user, 'flipUser.saldo', 0).toRupiah(true)}
            color={'#FD6342'}
          />
          <Gap size={30} />
        </ScrollView>
        <Padder all>
          <Padder horizontal={5}>
            <ScaledText size={20} bold>
              {'Quick Operations'}
            </ScaledText>
          </Padder>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <QuickButton name={'Transfer'} icon={Icons.send} />
            <QuickButton name={'Wallet'} icon={Icons.wallet} />
            <QuickButton name={'Pulsa'} icon={Icons.phone} />
            <QuickButton name={'Listrik'} icon={Icons.electric} />
          </View>
        </Padder>
        <Padder all>
          <Padder horizontal={5}>
            <ScaledText size={20} bold>
              {'History'}
            </ScaledText>
          </Padder>
          <View style={{justifyContent: 'center'}}>
            <ScrollView>
              <ListItem />
              <ListItem />
              <ListItem />
              <ListItem />
              <ListItem />
            </ScrollView>
          </View>
        </Padder>
      </View>
      <Spinner visible={loading} />
    </Padder>
  );
}

const QuickButton = (props: any) => {
  const width = 63;
  return (
    <Padder horizontal={10} top={10}>
      <TouchableOpacity>
        <Box width={width} height={width} borderRadius={20} color={'#42B14C'}>
          <Padder horizontal vertical={8}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ImgIcon source={props.icon} size={30} tintColor={'white'} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ScaledText size={10} color={'#FFF'}>
                {props.name}
              </ScaledText>
            </View>
          </Padder>
        </Box>
      </TouchableOpacity>
    </Padder>
  );
};

const Card = (props: any) => {
  return (
    <Padder left vertical>
      <TouchableOpacity>
        <Box
          backgroundImage={props.bg}
          color={props.color || '#03ABE8'}
          width={240}
          height={140}
          borderRadius={20}>
          <Padder all={15}>
            <View style={{height: '50%'}}>
              <ScaledText size={18} color="#FFF" bold>
                {props.name}
              </ScaledText>
            </View>
            <View
              style={{
                height: '50%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <ScaledText size={23} color="#FFF">
                {props.balance}
              </ScaledText>
            </View>
          </Padder>
        </Box>
      </TouchableOpacity>
    </Padder>
  );
};

const ListItem = (props: any) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#D4DCE7',
          borderBottomWidth: 1,
          paddingVertical: utils.sizeMatters.scale(15),
          flexDirection: 'row',
          paddingHorizontal: utils.sizeMatters.scale(5),
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#42B14C',
              width: utils.sizeMatters.scale(40),
              height: utils.sizeMatters.scale(40),
              borderRadius: utils.sizeMatters.scale(10),
              marginRight: utils.sizeMatters.scale(10),
            }}></View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScaledText size={16}>Starbuck Coffe</ScaledText>
          <ScaledText size={12} color={'grey'}>
            {moment().format('DD MMM YYYY - HH:mm')}
          </ScaledText>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ScaledText size={17}>{(10000).toRupiah(true)}</ScaledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
