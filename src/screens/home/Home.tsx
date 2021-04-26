import moment from 'moment';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ContentLoader, {Rect, Facebook} from 'react-content-loader/native';
import {Box, Gap, ImgIcon, Padder, ScaledText, utils} from 'urip-rn-kit';
import Icons from '../../assets/icons';
import Images from '../../assets/images';
import UserService from '../../services/UserService';
const _ = utils._;

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

  const WelcomeLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 340);
    const height = (45 / 340) * width;
    if (props.show) {
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 340 45"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <Rect x="0" y="0" rx="5" ry="5" width="67" height="11" />
          <Rect x="1" y="19" rx="5" ry="5" width="132" height="16" />
        </ContentLoader>
      );
    } else {
      return props.children;
    }
  };

  const CardLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 364);
    const height = (150 / 364) * width;
    if (props.show) {
      return (
        <Padder top>
          <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 364 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect x="17" y="1" rx="16" ry="16" width="256" height="143" />
          </ContentLoader>
        </Padder>
      );
    } else {
      return props.children;
    }
  };

  const HistoryLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 364);
    const height = (50 / 364) * width;
    const Loader = () => (
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox="0 0 364 50"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="10" y="3" rx="10" ry="10" width="47" height="44" />
        <Rect x="65" y="9" rx="7" ry="7" width="147" height="14" />
        <Rect x="66" y="29" rx="5" ry="5" width="114" height="11" />
        <Rect x="278" y="12" rx="9" ry="9" width="84" height="17" />
      </ContentLoader>
    );
    if (props.show) {
      return (
        <>
          <Gap vertical />
          <Loader />
          <Gap vertical />
          <Loader />
          <Gap vertical />
          <Loader />
          <Gap vertical />
          <Loader />
          <Gap vertical />
          <Loader />
          <Gap vertical />
          <Loader />
        </>
      );
    } else {
      return props.children;
    }
  };

  const QuickLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 340);
    const height = (60 / 225) * width;
    if (props.show) {
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 255 60"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <Rect x="135" y="5" rx="15" ry="15" width="50" height="50" />
          <Rect x="200" y="5" rx="15" ry="15" width="50" height="50" />
          <Rect x="5" y="5" rx="15" ry="15" width="50" height="50" />
          <Rect x="70" y="5" rx="15" ry="15" width="50" height="50" />
        </ContentLoader>
      );
    } else {
      return props.children;
    }
  };

  const TitleLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 225);
    const height = (30 / 225) * width;
    if (props.show) {
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 255 30"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}>
          <Rect x="8" y="3" rx="10" ry="10" width="167" height="23" />
        </ContentLoader>
      );
    }
    return props.children;
  };

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
                <QuickButton name={'Transfer'} icon={Icons.send} />
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
        {/* <Spinner visible={loading} /> */}
      </SafeAreaView>
    </>
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
