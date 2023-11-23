import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from './setup/welcome';
import Opportunity from './main/opportunity';
import ProfileScreen from './main/profilescreen';
import ClickLink from './setup/clicklink';
import RoleTitle from './main/roletitle';
import RoleLocation from './main/rolelocation';
import RoleSalary from './main/rolesalary';
import RoleJobType from './main/roletype';
import RoleSeniority from './main/roleseniority';
import RequestLink from './setup/requestlink';
import RoleView from './main/roleview';
import RoleApply from './main/roleapply';
import Signup from './setup/signup';
import * as Sentry from 'sentry-expo';
import * as Linking from 'expo-linking';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { updateVerificationCodeAndEmail, validateEmailToken } from './redux/profileSlice.js';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { getMainDetails, getNextMove, getRole } from './redux/profileSlice.js';
import LoadingScreen from './setup/loading.js';
import SignedUp from './setup/signedup.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//TODO: Add a splash screen 

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
};

export const OpportunityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Next Move" component={Opportunity} />
      <Stack.Screen name="Role" component={RoleTitle} />
      <Stack.Screen name="Location" component={RoleLocation} />
      <Stack.Screen name="Minimum Salary" component={RoleSalary} />
      <Stack.Screen name="Job Type" component={RoleJobType} />
      <Stack.Screen name="Seniority" component={RoleSeniority} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  var setup = false;
  const url = Linking.useURL();
  const dispatch = useDispatch();
  const deviceID = useSelector(state => state.profile.authenticationDetails.deviceID);
  const signedUp = useSelector(state => state.profile.authenticationDetails.signed_up);
  const [roleID, setRoleID] = React.useState();
  const [loading, setLoading] = React.useState(true);  

  if(deviceID != '' && deviceID){
    setup = true;
  }

  useEffect(() => {
    if(url){
      handleDeepLink(url);
    }
  }, [url]);

  useEffect(() => {
    if(deviceID != '' && deviceID){
      dispatch(getMainDetails());
      dispatch(getNextMove());
    }
  }, [deviceID])
  
  const handleDeepLink = async (url) => {
      // add your code here
      const { hostname, path, queryParams } = Linking.parse(url);
      
      if(path == "verify" && !setup){
        await dispatch (
          updateVerificationCodeAndEmail({verificationCode: queryParams.token, email: queryParams.email})
        );
        await dispatch(validateEmailToken());
      } else if(path == "role"){    
        setRoleID(queryParams.roleID);
        await dispatch(getRole({roleID: queryParams.roleID}));
      }
      setLoading(false);
  }

  if (loading) {
    return (
      <LoadingScreen />
    );
  } else if (roleID){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Role" component={RoleView} />
        <Stack.Screen name="Apply" component={RoleApply} />
      </Stack.Navigator>
    );
  } else if (!signedUp && setup) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Signup}/>
        <Stack.Screen name="Complete" component={SignedUp} />
      </Stack.Navigator>
    );
  } else if(setup){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Next Move Nav" component={OpportunityNavigator} options={{headerShown: false, tabBarLabel: "Next Move", tabBarIcon: ({tintColor}) =>
          <FontAwesome name="mail-forward" size={24} color={tintColor} />}} />
        <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({tintColor}) =>
          <AntDesign name="profile" size={24} color={tintColor} />}} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Request Link" component={RequestLink} />
        <Stack.Screen name="Click Link" component={ClickLink} />
      </Stack.Navigator>
    );
  }
};

const App = () => {

  Sentry.init({
    dsn: "https://a92eded437e0a7221474cd2de14ffa53@o4505770833084416.ingest.sentry.io/4505770877255680",
    enableInExpoDevelopment: false,
    debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
