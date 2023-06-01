import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsList from './setup/ContactsList';
import Register from './setup/register';
import Welcome from './setup/welcome';
import Setup from './setup/setup';
import Reputation from './main/reputation';
import Opportunity from './main/opportunity';
import TrustedContacts from './main/trustedcontacts';
import Profile from './setup/profile';
import KeywordSelector from './main/keywordselector';
import Employment from './setup/employment';
import Organisation from './setup/organisation';
import Location from './setup/location';
import Chats from './main/chats';
import Chat from './main/chat';
import AddChat from './main/addchat';
import RequestIntroduction from './main/requestintroduction';
import CommendedBy from './main/commendedby';
import Role from './main/role';
import RoleLocation from './main/rolelocation';
import RoleSalary from './main/rolesalary';
import RoleJobType from './main/roletype';
import RoleSeniority from './main/roleseniority';

import { RegisterContext, SetupContext, ChatsContext} from './setup/context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ReputationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reputation" component={Reputation} />
      <Stack.Screen name="Commended By" component={CommendedBy} />
      <Stack.Screen name="Commended" component={TrustedContacts} />
      <Stack.Screen name="Keywords Selector" component={KeywordSelector} />
      <Stack.Screen name="Contacts List" component={ContactsList} initialParams={{'inWizard':false}} />
    </Stack.Navigator>
  );
}

//TODO: Add a splash screen

export const ContactsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Commended Colleagues" component={TrustedContacts} />
      <Stack.Screen name="Keywords Selector" component={KeywordSelector} />
      <Stack.Screen name="Contacts List" component={ContactsList} initialParams={{'inWizard':false}}/>
    </Stack.Navigator>
  );
};  

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} initialParams={{'inWizard':false}}/>
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
};

export const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="RequestIntroduction" component={RequestIntroduction} />
    </Stack.Navigator>
  );
};

export const OpportunityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Next Move" component={Opportunity} />
      <Stack.Screen name="Role" component={Role} />
      <Stack.Screen name="RoleLocation" component={RoleLocation} />
      <Stack.Screen name="RoleSalary" component={RoleSalary} />
      <Stack.Screen name="RoleJobType" component={RoleJobType} />
      <Stack.Screen name="RoleSeniority" component={RoleSeniority} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const { registered } = useContext(RegisterContext);
  const { setup } = useContext(SetupContext);
  if(true){
    return (
      <Tab.Navigator>
        <Tab.Screen name="ChatsNav" component={ChatNavigator} options={{headerShown: false, tabBarLabel: "Chats", unmountOnBlur: true }}/>
        <Tab.Screen name="ReputationNav" component={ReputationNavigator} options={{headerShown: false, tabBarLabel: "Reputation", unmountOnBlur: true}} />
        <Tab.Screen name="Next Move Nav" component={OpportunityNavigator} options={{headerShown: false, tabBarLabel: "Next Move"}} />
        <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{headerShown: false, tabBarLabel: "Profile"}} />
      </Tab.Navigator>
    );
  } else if (registered) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Commended Colleagues" component={ContactsList} initialParams={{'inWizard':true}}/>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Profile" component={Profile} initialParams={{'inWizard':true}}/>
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Employment" component={Employment} />
        <Stack.Screen name="Organisation" component={Organisation} />
        <Stack.Screen name="Verification" component={Register} />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [setup, setSetup] = useState(false);
  const [chats, setChats] = useState([]);

  return (
    <RegisterContext.Provider value={{ registered, setRegistered }}>
      <SetupContext.Provider value={{ setup, setSetup }}>
        <ChatsContext.Provider value={{ chats, setChats }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ChatsContext.Provider>
      </SetupContext.Provider>
    </RegisterContext.Provider>
  );
}

export default App;
