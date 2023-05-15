//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../component.style.js';

const Reputation = () => {
    const [showText, setShowText] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.score}>
                <Text style={styles.heading}>Reputation:</Text>
                <View style={styles.circle}>
                    <Text style={styles.number}>25</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={() => setShowText(!showText)}>
                    <Text>How is this calculated?</Text>
                </TouchableOpacity>
                {showText && 
                    <View>
                        <Text>Your reputation is made up of two components</Text>
                        <Text>Firstly the contacts that you trust. 
                            This is both the number and quality of the contacts. 
                            You should only trust people you know and whose professional judgement you trust.
                            Adding more contacts will not always increase your reputation as your reputation 
                            is not just based on the number of your contacts, but also on their reputation.</Text>
                        <Text>Secondly the contacts that trust you.
                            Again, this is both the number and quality of the contacts.
                            The best way to increase the number of people who trust you is to trust other people</Text>
                    </View>
                }
            </View>

            <View style={styles.score}>
                <Text style={styles.label}>Average reputation in your network:</Text>
                <View style={styles.circle}>
                    <Text style={styles.number}>30</Text>
                </View>
            </View>        
        </View>

    );
}

export default Reputation;