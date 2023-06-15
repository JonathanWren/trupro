//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import { recommendedContacts, recommendedByContacts } from '../setup/names';

const Reputation = () => {
    const [showText, setShowText] = useState(false);
    const nav = useNavigation();

    return (
        <View style={styles.containerListView}>
            <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, width: '100%'}}>
                <View style={styles.score}>
                    <View>
                        <Text style={styles.heading}>Reputation:</Text>
                    </View>
                    <View style={styles.reputationCircle}>
                        <Text style={styles.reputationNumber}>5</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity onPress={() => setShowText(!showText)}>
                        <Text style={styles.smallPrint}>TruPro uses reputation to showcase your ability to potential employers and match you with hidden jobs 
                        that may not be publicly advertised. It is also used to tell potential employees your excellence as a manager. Read more.</Text>
                    </TouchableOpacity>
                    {showText && 
                        <View>
                            <Text style={styles.text}>Your reputation score is key to allow you to showcase your excellence as a professional based on how your colleagues view you. It is calculated based on the number of people who recommend you.</Text>
                            <Text style={styles.text}>Only you can view your reputation score. 
                            However, a similar score, based on how much their recommended colleages recommend you 
                            (or recommend people who recommend you etc) is shown to potential employees and you will get to see the same score for potential employees so you can see what they are like to work for.</Text>
                            
                            <Text style={styles.text}>Your reputation is also used to link you up with hidden roles that are not advertised, where an employer is searching for candidates that can be recommended by someone they trust.</Text>
                            
                            <Text style={styles.text}>The best way to increase your reputation is to recommend other people. The ideal people to recommend are colleagues that you have worked with and are good at their job. 
                            Try to recommend people that work in roles related to yours where you can objectively assess how good they are at their jobs. </Text>
                        </View>
                    }
                </View>  
                <Text style={styles.smallPrint}>Reputation is made up of two parts. Who you recommend and who recommends you.</Text>
                <TouchableOpacity onPress={() => nav.navigate("Recommended By")} style={styles.score}>
                    <View>
                        <Text style={styles.text}>Recommended By:</Text>
                    </View>
                    <View style={styles.contactsCircle}>
                        <Text style={styles.contactsNumber}>{recommendedByContacts.length}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.score, {paddingTop: 20}]}>
                    <View>
                        <Text style={styles.text}>Recommended:</Text>
                    </View>
                    <View style={styles.contactsCircle}>
                        <Text style={styles.contactsNumber}>{recommendedContacts.length}</Text>
                    </View>
                </View>
                <Text style={styles.smallPrint}>You have recommended {recommendedContacts.length} of 25 possible contacts.
                Click on a contact to add keywords to make the recommendation more specific.</Text>
            </View>

            <View style={styles.containerListView}>
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
            <View style={localstyles.actionButton}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Contacts List');}}>
                <Text style={styles.buttonText}>Add Recommended Contact</Text>
            </TouchableOpacity>
            </View>
        </View>

    );
}


const localstyles = StyleSheet.create({
    actionButton: {
      width: '100%',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 10,
      paddingBottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
    },
  });

export default Reputation;