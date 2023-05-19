//app stylesheets

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerListView:{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 25,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 8,
        alignSelf: 'center',
    },
    fieldInput: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B6B6B',
        paddingBottom: 7,
        alignContent: 'flex-start',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    checkboxText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6B6B6B',
        paddingLeft: 7,
    },
    text: {
        fontSize: 15,
        paddingBottom: 5,
    },
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
    },
    imgCon: {
        marginLeft: 15,
    },
    contactImageTextCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
      },
    contactImgTxt: {
        fontSize: 18,
      },
    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    contactName: {
        fontSize: 16,
    },
    contactAdd: {
        justifyContent: 'center',
    },
    smallButton: {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#F0F4F7',
        borderWidth: 0,
        marginBottom: 15,
        borderRadius: 7,
        padding: 10,
        paddingLeft: 10, //Needed for autocomplete
    },
    disabledInput: {
        backgroundColor: '#E5E8F0',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    floatingButton: {
        //Button positioned at bottom of screen
        position: 'absolute',
        backgroundColor: 'white',
        paddingBottom: 15,
        bottom: 0,
        width: '100%',
        zIndex: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    circle: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    number: {
        fontSize: 18,
        color: 'white',
    },
    score: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    smallPrint: {
        fontSize: 12,
        color: '#888',
        marginTop: 10,
    },
    autoCompleteContainer: {    
        borderWidth: 0,
    }
});