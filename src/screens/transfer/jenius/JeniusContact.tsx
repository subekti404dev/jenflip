import React from 'react';
import * as _ from 'lodash';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Gap, Padder, Row, ScaledText} from 'urip-rn-kit';
import JENIUS_ACTION_TYPE from '../../../actions/JeniusActionType';
import ContactService from '../../../services/ContactService';

export default function JeniusContact() {
  const jenius = useSelector((state: any) => state.jenius);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await ContactService.getJeniusContact();
    dispatch({type: JENIUS_ACTION_TYPE.ASSIGN_CONTACT, payload: response.data});
  };

  return (
    <Padder vertical>
      <FlatList
        keyExtractor={(_item, index) => index.toString()}
        data={jenius.contacts}
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
      />
    </Padder>
  );
}
