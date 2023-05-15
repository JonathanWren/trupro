//app stylesheets

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 8,
    },
    text: {
        fontSize: 18,
        paddingBottom: 5,
    },
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
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
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 5,
        marginTop: 10,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    bottomButton: {
        position: 'absolute',
        bottom:0,
    },
    buttonText: {
        color: 'white'
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
  });