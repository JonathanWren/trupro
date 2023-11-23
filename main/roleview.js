import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MarkdownView } from 'react-native-markdown-view';


function RoleView() {
    const title = useSelector(state => state.profile.viewRole.title);
    const salary = useSelector(state => state.profile.viewRole.salary);
    const location = useSelector(state => state.profile.viewRole.location);
    const jobType = useSelector(state => state.profile.viewRole.jobType);
    const description = useSelector(state => state.profile.viewRole.description);
    const nav = useNavigation();

    const handleApplyButtonPress = () => {
        nav.navigate('Apply');
    };

    // Render role view
    return (
        <View style={styles.container}>
            <View style={styles.roleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{salary}</Text>
                <Text style={styles.text}>{location}</Text>
                <Text style={styles.text}>{jobType}</Text>
                <Button title="Apply" onPress={handleApplyButtonPress} />
                <MarkdownView style={styles.description}>{description}</MarkdownView>
                <Button title="Apply" onPress={handleApplyButtonPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    roleContainer: {
        backgroundColor: 'white',
        maxWidth: 1000,
        padding: 10,
        borderRadius: 5,
    },
    description: {
        fontSize: 16,
    },
});

export default RoleView;
