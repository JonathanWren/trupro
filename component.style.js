//app stylesheets

import { StyleSheet } from 'react-native';

export const colors = {
    appBackgroundColor: 'white',
    fieldLabelColor: '#6B6B6B',
    fieldTextColor: '#6B6B6B',
    fieldBackgroundColor: '#F0F4F7',
    circleBackgroundColor: '#d9d9d9',
    buttonBackgroundColor: 'blue', 
    buttonTextColor: 'white',
    fieldPlaceHolderTextColor: '#A0A0A0', 
}

export default StyleSheet.create({
    containerListView:{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: colors.appBackgroundColor,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: colors.appBackgroundColor,
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContainer: {
        padding: 25,
        alignItems: 'center',
    },
    centerView: {
        maxWidth: 800,
        width: '100%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 8,
        alignSelf: 'center',
    },
    fieldInput: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.fieldTextColor,
        paddingBottom: 7,
        alignContent: 'flex-start',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    checkboxGroup: {
        marginTop: 15,
    },
    checkboxText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.fieldLabelColor,
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
        borderBottomColor: colors.circleBackgroundColor,
    },
    imgCon: {
        marginLeft: 15,
    },
    contactImageTextCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: colors.circleBackgroundColor,
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
        backgroundColor: colors.buttonBackgroundColor,
        color: colors.buttonTextColor,
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: colors.fieldBackgroundColor,
        borderWidth: 0,
        marginBottom: 15,
        borderRadius: 7,
        padding: 10,
        paddingLeft: 10, //Needed for autocomplete
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: colors.buttonBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: colors.buttonTextColor,
        fontSize: 16,
    },
    optionButton:{
        backgroundColor: colors.appBackgroundColor,
        borderColor: colors.buttonBackgroundColor,
        borderWidth: 2,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    optionButtonText: {
        fontSize: 16,
    },
    optionButtonSelected:{
        backgroundColor: colors.buttonBackgroundColor,
        borderColor: colors.buttonBackgroundColor,
        height: 40,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    reputationCircle: {
        width: 40,
        height: 40,
        backgroundColor: colors.buttonBackgroundColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    reputationNumber: {
        fontSize: 18,
        color: colors.buttonTextColor,
    },
    contactsCircle: {
        width: 30,
        height: 30,
        backgroundColor: colors.buttonBackgroundColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    contactsNumber: {
        fontSize: 15,
        color: colors.buttonTextColor,
    },
    score: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    smallPrint: {
        fontSize: 12,
        color: '#888',
        marginTop: 10,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5 )'
      },
});