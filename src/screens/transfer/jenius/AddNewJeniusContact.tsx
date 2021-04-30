import React from 'react';
import TransferService from '../../../services/TransferService';
import { FlatList } from 'react-native';
import { ScaledText } from 'urip-rn-kit';

export default function AddNewJeniusContact() {
    const [bankList, setBankList] = React.useState([]);
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const bankList = await TransferService.getJeniusBankList();
        setBankList(bankList);
    };

    return (

        <>
            <FlatList
                data={bankList}
                keyExtractor={(_v: any, i: number) => i.toString()}
                renderItem={({ item, index }: { item: any; index: number }) => {
                    return (
                        <ScaledText key={index} color={''}>
                            {item.displayName}
                        </ScaledText>
                    );
                }}
            /></>
    )
}