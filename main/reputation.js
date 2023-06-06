//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import { commendedContacts, commendedByContacts } from '../setup/names';

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
                        <Text style={styles.smallPrint}>What is Reputation?</Text>
                    </TouchableOpacity>
                    {showText && 
                        <View>
                            <Text style={styles.text}>Your reputation score is key to allow you to showcase your excellence as a professional based on how your colleagues view you. It is calculated based on the number of people who commend you.</Text>
                            <Text style={styles.text}>Only you can view your reputation score. 
                            However, a similar score, based on how much their commended colleages commend you 
                            (or commend people who commend you etc) is shown to potential employees and you will get to see the same score for potential employees so you can see what they are like to work for.</Text>
                            
                            <Text style={styles.text}>Your reputation is also used to link you up with hidden roles that are not advertised, where an employer is searching for candidates that can be recommended by someone they trust.</Text>
                            
                            <Text style={styles.text}>The best way to increase your recommendation is to commend other people. The ideal people to commend are colleagues that you have worked with and are good at their job. 
                            Try to commend people that work in roles related to yours where you can objectively assess how good they are at their jobs. </Text>
                        </View>
                    }
                </View>  
                <TouchableOpacity onPress={() => nav.navigate("Commended")} style={[styles.score, {paddingTop: 20}]}>
                    <View>
                        <Text style={styles.text}>Commended:</Text>
                    </View>
                    <View style={styles.contactsCircle}>
                        <Text style={styles.contactsNumber}>{commendedContacts.length}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>You have commended {commendedContacts.length} of 25 possible contacts. </Text>
                <TouchableOpacity onPress={() => nav.navigate("Commended By")} style={styles.score}>
                    <View>
                        <Text style={styles.text}>Commended By:</Text>
                    </View>
                    <View style={styles.contactsCircle}>
                        <Text style={styles.contactsNumber}>{commendedByContacts.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default Reputation;