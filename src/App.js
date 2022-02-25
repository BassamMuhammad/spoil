import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Signup} from './screens/Auth/Signup';
import {Signin} from './screens/Auth/Signin';
import {ForgotPassword} from './screens/Auth/ForgotPassword';
import {Profile} from './screens/Tab/Profile';
import {Relationship} from './screens/Tab/Relationship';
import {Chat} from './screens/Tab/Chat';
import {Map} from './screens/Tab/Map';
import {Spoil} from './screens/Tab/Spoil';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {changeUser, selectUser} from './redux/features/userSlice';
import {checkAuth} from './firebase/auth/checkAuth';
import {signout} from './firebase/auth/signout';
import {Loading} from './components/Common/Loading';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const RelationshipStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RelationshipScreen" component={Relationship} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUser);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const authSubscriber = checkAuth(user => dispatch(changeUser(user?.uid)));
    return () => {
      if (authSubscriber) authSubscriber();
    };
  }, []);
  // signout();
  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {!userId ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
              let icon;

              if (route.name === 'Spoil') {
                icon = focused
                  ? require('./assets/images/spoilClick.png')
                  : require('./assets/images/spoil.png');
              } else if (route.name === 'Relationship') {
                icon = focused
                  ? require('./assets/images/relationshipClick.png')
                  : require('./assets/images/relationship.png');
              } else if (route.name === 'Map') {
                icon = focused
                  ? require('./assets/images/mapClick.png')
                  : require('./assets/images/map.png');
              } else if (route.name === 'Profile') {
                icon = focused
                  ? require('./assets/images/profileClick.png')
                  : require('./assets/images/profile.png');
              }
              return <Image source={icon} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Spoil" component={Spoil} />
          <Tab.Screen name="Relationship" component={RelationshipStack} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
