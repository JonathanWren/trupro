//Screen showing three scores, one below the other, each with a label and next to it a number in a red circle
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../component.style.js';

const Reputation = () => {
    const [showText, setShowText] = useState(false);
    contactsTrustingYou = [{name: 'Fred Smith', id: 1}, {name: 'Jane Smith', id:2}]

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
                                <Text style={styles.smallPrint}>How is this calculated?</Text>
                            </TouchableOpacity>
                            {showText && 
                                <View>
                                    <Text style={styles.text}>Your reputation shows the number of people who commend you.</Text>
                                </View>
                            }
                        </View>  
            </View>
            <Text style={[styles.heading, {paddingTop: 20}]}>People who commend you</Text>
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