//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../component.style.js';

const Reputation = () => {
    const [showText, setShowText] = useState(false);
    contactsTrustingYou = [{name: 'Fred Smith', id: 1}, {name: 'Jane Smith', id:2}]

    return (
        <View style={styles.container}>
            <View style={styles.score}>
                <Text style={styles.heading}>Reputation:</Text>
                <View style={styles.circle}>
                    <Text style={styles.number}>5</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={() => setShowText(!showText)}>
                    <Text style={styles.smallPrint}>How is this calculated?</Text>
                </TouchableOpacity>
                {showText && 
                    <View>
                        <Text style={styles.text}>Your reputation shows the number of people who trust you.</Text>
                    </View>
                }
            </View>  
            <Text style={styles.heading}>People who trust you</Text>
            <FlatList
                data={contactsTrustingYou}
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

export default Reputation;