import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    View,
} from 'react-native';
import { ScaledText } from 'urip-rn-kit';
import TransferService from '../../../services/TransferService';
import RenderIf from '../../../shareds/RenderIf';
import JeniusContact from './JeniusContact';
import AddNewJeniusContact from './AddNewJeniusContact';

export default function TransferViaJenius() {
    const [activeMenuIndex, setActiveMenuIndex] = React.useState(0);

    return (
        <>
            <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
            <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1, paddingTop: (20).scale() }}>
                <Switch
                    data={['Add New', 'Contact']}
                    initialIndex={0}
                    onChange={x => setActiveMenuIndex(x)}
                />
                <RenderIf condition={activeMenuIndex === 0}>
                    <AddNewJeniusContact />
                </RenderIf>
                <RenderIf condition={activeMenuIndex === 1}>
                    <JeniusContact />
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
