import React from 'react';
import * as _ from 'lodash';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Gap, Input, Padder, Row, ScaledText, utils} from 'urip-rn-kit';
import JENIUS_ACTION_TYPE from '../../../actions/JeniusActionType';
import ContactService from '../../../services/ContactService';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';

export default function JeniusContact() {
  const jenius = useSelector((state: any) => state.jenius);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (jenius.contacts.length === 0) setLoading(true);
    const response = await ContactService.getJeniusContact();
    dispatch({type: JENIUS_ACTION_TYPE.ASSIGN_CONTACT, payload: response.data});
    setLoading(false);
  };

  const ItemLoader = (props: any) => {
    const width = utils.sizeMatters.scale(props.width || 280);
    const height = (82 / 320) * width;
    const IL = () => {
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 320 82"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}>
          <Rect x="79" y="15" rx="10" ry="10" width="228" height="23" />
          <Circle cx="36" cy="41" r="28" />
          <Rect x="80" y="48" rx="10" ry="10" width="147" height="16" />
        </ContentLoader>
      );
    };
    if (props.show) {
      return (
        <>
          <IL />
          <IL />
          <IL />
          <IL />
          <IL />
          <IL />
          <IL />
          <IL />
        </>
      );
    } else {
      return props.children;
    }
  };

  return (
    <Padder horizontal vertical>
      <Padder all={5}>
        {!loading && (
          <Input
            placeholder={'Cari '}
            value={keyword}
            onChangeText={v => setKeyword(v)}
            borderColor={'#dedede'}
          />
        )}
      </Padder>
      <ItemLoader show={loading}>
        <FlatList
          keyExtractor={(_item, index) => index.toString()}
          extraData={keyword}
          data={jenius.contacts.filter((x: any) => {
            const bankName = _.get(x, 'title', '').toLowerCase();
            const accountNumber = _.get(
              x,
              'accounts[0].accountNumber',
              '',
            ).toLowerCase();
            const q = keyword.toLowerCase();
            console.log({bankName, accountNumber, q});

            return bankName.includes(q) || accountNumber.includes(q);
          })}
          renderItem={({item, index}) => {
            const bankName = _.get(item, 'accounts[0].bankName');
            const accountNumber = _.get(item, 'accounts[0].accountNumber');
            let initial: string[] = item.title
              .split(' ')
              .map((w: string) => w.split('')[0]);
            initial = initial.slice(0, 2);
            return (
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <View
                  style={{
                    margin: (5).scale(),
                    backgroundColor: 'green',
                    width: (40).scale(),
                    height: (40).scale(),
                    borderRadius: (20).scale(),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ScaledText bold color={'#FFF'}>
                    {initial.join('')}
                  </ScaledText>
                </View>
                <View style={{flex: 1}}>
                  <Padder horizontal vertical={5}>
                    <Col>
                      <Row>
                        <ScaledText key={index}>{item.title}</ScaledText>
                      </Row>
                      <Row>
                        <ScaledText size={14} color={'grey'} key={index}>
                          {`${bankName} ${accountNumber}`}
                        </ScaledText>
                      </Row>
                    </Col>
                    <Gap vertical />
                    <View
                      style={{
                        width: '100%',
                        height: (1).scale(),
                        backgroundColor: '#dedede',
                      }}
                    />
                  </Padder>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<Gap size={100} vertical />}
        />
      </ItemLoader>
    </Padder>
  );
}
