//Screen showing a list of hard coded names
//
import React from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import { recommendedContacts } from '../setup/names';


const TrustedContacts = () => {

    const nav = useNavigation();

    return (
        <View style={styles.containerListView}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingRight: 25, paddingLeft: 25,
                    paddingTop: 25}}>
                <Text style={styles.heading}>Recommended Colleagues</Text>
                <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => {nav.navigate('Contacts List');}}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, {paddingRight: 25, paddingLeft: 25,}]}>Click on a contact to add keywords to make the recommendation more specific.</Text>
            <FlatList
                data={recommendedContacts}
                keyExtractor={(item) => item.id}
                style={{width: '100%'}}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => {nav.navigate('Keywords Selector', {contact: item})}}
                    >
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
                    </TouchableOpacity>
                )} 
            />
        </View>
    );
}

export default TrustedContacts;
