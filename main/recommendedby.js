//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../component.style.js';
import { recommendedByContacts as recommendedByContacts } from '../setup/names.js';

const RecommendedBy = () => {
    return (
        <View style={styles.containerListView}>
            <Text style={[styles.heading, {paddingTop: 20}]}>People who recommend you</Text>
            <FlatList
                data={recommendedByContacts}
                keyExtractor={(item) => item.id}
                style={{width: '100%'}}
                renderItem={({ item }) => (
                    <View style={styles.contactCon} >
                        <View style={styles.imgCon}>
                            <View style={styles.contactImageTextCircle}>
                                <Text style={styles.contactImgTxt}>{item?.name[0]}</Text>
                            </View>
                        </View>
                        <View style={styles.contactDat}>
                            <Text style={styles.contactName}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                )} 
            />     
        </View>

    );
}

export default RecommendedBy;