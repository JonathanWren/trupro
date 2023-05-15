//Screen showing a list of hard coded names
//
import React from 'react';
import { View, Text, FlatList} from 'react-native';
import styles from '../component.style.js';

const TrustedContacts = () => {

    contacts = [{name: 'John Doe', id: 1}, {name: 'Jane Doe', id:2}]
    suggestedContacts = [{name: 'Fred Smith', id: 1}, {name: 'Jane Smith', id:2}]

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Trusted Contacts</Text>
            <FlatList
                data={contacts}
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
            <Text style={styles.heading}>People you may know and trust</Text>
            <FlatList
                data={suggestedContacts}
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

export default TrustedContacts;
