import moment from 'moment';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Box, Gap, ImgIcon, Padder, ScaledText, utils} from 'urip-rn-kit';
import Icons from '../../assets/icons';
import Images from '../../assets/images';
import UserService from '../../services/UserService';
const _ = utils._;
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  WelcomeLoader,
  CardLoader,
  TitleLoader,
  QuickLoader,
  HistoryLoader,
} from './HomeLoader';
import BottomSheetList from '../../shareds/BottomSheetList';

export default function Home(props: any) {
  const [loading, setLoading] = React.useState(true);
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

  let bsRef: any = null;

  return (
    <>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: '#FFF'}}>
        <View>
          <Padder top horizontal={15}>
            <WelcomeLoader show={loading}>
              <ScaledText size={14}>{'Welcome,'}</ScaledText>
              <ScaledText size={20} bold>
                {_.get(user, 'jeniusUser.nickname')}
              </ScaledText>
            </WelcomeLoader>
          </Padder>
          <CardLoader show={loading}>
            <ScrollView
              snapToInterval={240}
              snapToAlignment={'center'}
              showsHorizontalScrollIndicator={false}
              horizontal>
              <Card
                bg={Images.jenius_bg}
                name={'Jenius'}
                balance={_.get(
                  user,
                  'jeniusCard[0].balance.current',
                  0,
                ).toRupiah(true)}
              />
              <Card
                bg={Images.flip_bg}
                name={'Flip'}
                balance={_.get(user, 'flipUser.saldo', 0).toRupiah(true)}
                color={'#FD6342'}
              />
              <Gap size={30} />
            </ScrollView>
          </CardLoader>

          <Padder all>
            <Padder horizontal={5}>
              <TitleLoader show={loading}>
                <ScaledText size={20} bold>
                  {'Quick Operations'}
                </ScaledText>
              </TitleLoader>
            </Padder>
            <QuickLoader show={loading}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <QuickButton
                  name={'Transfer'}
                  icon={Icons.send}
                  onPress={() => {
                    if (bsRef) {
                      bsRef.open();
                    }
                  }}
                />
                <QuickButton name={'Wallet'} icon={Icons.wallet} />
                <QuickButton name={'Pulsa'} icon={Icons.phone} />
                <QuickButton name={'Listrik'} icon={Icons.electric} />
              </View>
            </QuickLoader>
          </Padder>
          <Padder all>
            <Padder horizontal={5}>
              <TitleLoader show={loading}>
                <ScaledText size={20} bold>
                  {'History'}
                </ScaledText>
              </TitleLoader>
            </Padder>
            <View style={{justifyContent: 'center'}}>
              <HistoryLoader show={loading}>
                <ScrollView>
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <Gap size={20} vertical />
                </ScrollView>
              </HistoryLoader>
            </View>
          </Padder>
        </View>
        <BottomSheetList
          bsRef={(ref: any) => {
            bsRef = ref;
          }}
          title={'Transfer via'}
          data={[
            {name: 'Jenius', logo: Images.jenius_logo},
            {name: 'Flip', logo: Images.flip_logo},
          ]}
        />
      </SafeAreaView>
    </>
  );
}

const QuickButton = (props: any) => {
  const width = 63;
  return (
    <Padder horizontal={10} top={10}>
      <TouchableOpacity onPress={props.onPress}>
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
      <TouchableWithoutFeedback>
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
      </TouchableWithoutFeedback>
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
