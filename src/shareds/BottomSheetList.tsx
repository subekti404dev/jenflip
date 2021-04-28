import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Padder, ScaledText, utils} from 'urip-rn-kit';

const _ = utils._;
import RBSheet from 'react-native-raw-bottom-sheet';

interface Data {
  name: string;
  logo?: any;
  onPress?: () => void;
}

interface BottomSheetListProps {
  bsRef: (ref: any) => void;
  data: Data[];
  title?: string;
  height?: number;
}

export default function BottomSheetList(props: BottomSheetListProps) {
  const bsHeight = 85 + (props.data || []).length * 35;
  return (
    <RBSheet
      ref={ref => props.bsRef(ref)}
      height={(props.height || bsHeight).scale()}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: (20).scale(),
          borderTopRightRadius: (20).scale(),
        },
      }}
      dragFromTopOnly
      closeOnDragDown>
      <Padder horizontal={20} top={1} bottom={10}>
        <ScaledText color={'grey'} size={15} bold>
          {props.title}
        </ScaledText>
      </Padder>
      {(props.data || []).map((d: any, i: number) => {
        const isLast = (props.data || []).length - 1 === i;
        return (
          <View key={i}>
            <TouchableOpacity onPress={d.onPress}>
              <Padder horizontal={20} vertical={5}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <ScaledText>{d.name}</ScaledText>
                  </View>
                  {d.logo && (
                    <Image
                      source={d.logo}
                      style={{
                        width: (70).scale(),
                        height: (23).scale(),
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>
              </Padder>
            </TouchableOpacity>
            {!isLast && (
              <Padder horizontal={20} vertical={5}>
                <View
                  style={{backgroundColor: '#dedede', height: (0.5).scale()}}
                />
              </Padder>
            )}
          </View>
        );
      })}
    </RBSheet>
  );
}
