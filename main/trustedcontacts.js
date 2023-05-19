//Screen showing a list of hard coded names
//
import React from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';


const TrustedContacts = () => {

    const nav = useNavigation();

    contacts = [{name: 'John Doe', id: 1}, {name: 'Jane Doe', id:2}]
    suggestedContacts = [{name: 'Fred Smith', id: 1}, {name: 'Jane Smith', id:2}]

    return (
        <View style={styles.containerListView}>
            <Text style={styles.heading}>Trusted Contacts</Text>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                style={{width: '100%'}}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => {nav.navigate('KeywordsSelector', {contact: item})}}
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
