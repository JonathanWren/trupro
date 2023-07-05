//Screen to allow entering name and job title and validate that are completed before continuing
//
import React, {useRef, useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles, { colors } from '../component.style.js';
import { updateFirstName, updateLastName, updateEmail, updatePhoneNumber, updateCountryCode, updateCountryNumber } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { RegisterContext } from './context.js';
import config from '../main/config.js';

const Profile = ({route}) => {
    const { setRegistered } = useContext(RegisterContext);
    const dispatch = useDispatch();

    const firstName = useSelector(state => state.profile.mainDetails.firstName); 
    const lastName = useSelector(state => state.profile.mainDetails.lastName);
    const email = useSelector(state => state.profile.mainDetails.email);
    const phoneNumber = useSelector(state => state.profile.mainDetails.phoneNumber);
    const countryCode = useSelector(state => state.profile.mainDetails.countryCode);
    // const location = useSelector(state => state.profile.mainDetails.location);
    const phoneInput = useRef(null);

    const saveProfile = () => {
        var dataToSend = {first_name: firstName, last_name: lastName};
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(config.BASE_URL + 'saveprofile?' + formBody, {
            method: 'GET',
        })
        .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
        });
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.fieldInput}>Email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    onEndEditing={(email) => {
                        dispatch (
                            updateEmail({email: email.nativeEvent.text})
                        )
                    }}
                    defaultValue={email}
                />
                <Text style={styles.fieldInput}>Phone number</Text>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode={countryCode}
                    layout="second"
                    onChangeCountry={(country) => {
                        dispatch (updateCountryNumber({countryNumber: country['callingCode'][0]}));
                        dispatch (updateCountryCode({countryCode: country['cca2']}));
                        console.log('Country number: ' + country['callingCode'][0]);
                        console.log('Country code; ' + country['cca2']);
                    }}
                    onChangeText={(number) => {
                        dispatch (updatePhoneNumber({phoneNumber: number}));
                        console.log('Phone number: ' + number);
                    }}
                    textInputStyle={[styles.input, {borderBottomLeftRadius: 0, borderTopLeftRadius: 0, fontSize: 14,}]}
                    textContainerStyle={{paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0, width: "100%", backgroundColor: colors.appBackgroundColor}}
                    countryPickerButtonStyle={[styles.input, {width: 70, borderBottomRightRadius: 0, borderTopRightRadius: 0, fontSize: 14,}]}
                />
                <Text style={styles.fieldInput}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    placeholderTextColor={colors.fieldPlaceHolderTextColor}
                    defaultValue={firstName}
                    onEndEditing={(name) => {
                        dispatch (
                            updateFirstName({firstName: name.nativeEvent.text})
                        )
                    }}
                />
                <Text style={styles.fieldInput}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    placeholderTextColor={colors.fieldPlaceHolderTextColor}
                    defaultValue={lastName}
                    onEndEditing={(name) => {
                        dispatch (
                            updateLastName({lastName: name.nativeEvent.text})
                        )
                    }}
                />
                {/* <Text style={styles.fieldInput}>Where do you live?</Text>
                <Text
                    style={[styles.input, !location && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Location');
                    }}
                >{location ? location : 'Location'}
                </Text> */}
                {route.params.inWizard &&
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {            
                            //Validate that name and job title are completed
                            if (firstName === '') {
                                alert('Please complete your first name');
                                return;
                            }
                            if (lastName === '') {
                                alert('Please complete your last name');
                                return;
                            }
                            if ((email === '' || !email) && (phoneNumber === '' || !phoneNumber)) {
                                alert('Please complete either your email address or phone number');
                                return;
                            }

                            if (phoneNumber != ''){
                                phoneNumberNoLeadingZero = phoneInput.current.getNumberAfterPossiblyEliminatingZero()['number'];
                                if (phoneNumber != phoneNumberNoLeadingZero) {
                                    console.log(phoneNumberNoLeadingZero);
                                    dispatch (
                                        updatePhoneNumber({phoneNumber: phoneNumberNoLeadingZero})
                                    )
                                }

                                if(!phoneInput.current.isValidNumber(phoneNumberNoLeadingZero)) {
                                    alert('Please enter a valid phone number');
                                    return;
                                }
                            }

                            saveProfile();
                            setRegistered(true);
                        }}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </View>
    );
}

export default Profile;