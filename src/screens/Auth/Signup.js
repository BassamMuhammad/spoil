import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MyHeading} from '../../components/Common/MyHeading';
import {MyText} from '../../components/Common/MyText';
import {MyTextField} from '../../components/Common/MyTextField';
import {AuthSubmitButton} from '../../components/Common/AuthSubmitButton';
import {signupWithEmail} from '../../firebase/auth/signup';
import {useDispatch} from 'react-redux';
import {changeUser} from '../../redux/features/userSlice';

export const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError({});
    if (password.length < 8) {
      setError({
        password: 'Password should be atleast 8 characters long',
      });
      setLoading(false);
      return;
    }
    try {
      var tempUser = {
        firstName,
        lastName,
        gender,
        email,
        password,
        dob,
      };
      const userId = await signupWithEmail(tempUser);
      dispatch(changeUser(userId));
    } catch (e) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          setError({email: 'Email already in use'});
          break;
        case 'auth/invalid-email':
          setError({email: 'Invalid email'});
          break;
        case 'auth/weak-password':
          setError({password: 'Weak password.'});
      }
      console.log('signup', e);
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.outerContainer}>
        <Pressable onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.inner}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
              <View style={styles.innerContainer}>
                <View style={{marginBottom: 20}}>
                  <MyHeading text="Create your account" />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <MyText text="Already have an account?" color="gray" />
                    <Pressable
                      style={{marginLeft: 5}}
                      onPress={() => navigation.navigate('Signin')}>
                      <MyText text="Sign in" color="#FF8112" />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 5,
                    }}>
                    <MyTextField
                      label="First name"
                      refer={firstNameRef}
                      value={firstName}
                      onChangeText={newVal => setFirstName(newVal)}
                      onSubmitEditing={() => lastNameRef.current.focus()}
                      returnKeyType="next"
                      errorText={error.firstName}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <MyTextField
                      label="Last name"
                      refer={lastNameRef}
                      value={lastName}
                      onChangeText={newVal => setLastName(newVal)}
                      onSubmitEditing={() => genderRef.current.focus()}
                      returnKeyType="next"
                      errorText={error.lastName}
                    />
                  </View>
                </View>
                <MyTextField
                  label="Gender"
                  refer={genderRef}
                  value={gender}
                  onChangeText={newVal => setGender(newVal)}
                  onSubmitEditing={() => emailRef.current.focus()}
                  errorText={error.gender}
                />
                <MyTextField
                  label="Email"
                  keyboardType="email-address"
                  refer={emailRef}
                  value={email}
                  onChangeText={newVal => setEmail(newVal)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  errorText={error.email}
                />
                <MyTextField
                  label="Password"
                  refer={passwordRef}
                  value={password}
                  onChangeText={newVal => setPassword(newVal)}
                  secureTextEntry
                  returnKeyType="done"
                  errorText={error.password}
                  blurOnSubmit={true}
                />
                <View
                  style={{
                    marginVertical: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable onPress={() => setShowDate(true)}>
                    <MyText text="Select Date of birth" color="#FF8112" />
                  </Pressable>
                  <MyText text={dob.toLocaleDateString()} />
                </View>
                {showDate && (
                  <DateTimePicker
                    value={dob}
                    mode="data"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDate(false);
                      if (selectedDate) setDob(selectedDate);
                    }}
                  />
                )}
                <AuthSubmitButton
                  text="Sign up"
                  disabled={
                    !firstName || !lastName || !gender || !email || !password
                  }
                  loading={loading}
                  onPress={handleSubmit}
                />
              </View>
              <View style={styles.lastView} />
            </View>
          </ScrollView>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#fff',
    width: '101%',
  },
  inner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: '101%',
    marginTop: 40,
    paddingTop: '5%',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    color: 'grey',
    display: 'flex',
  },
  dropIcons: {
    maxWidth: 25,
    maxHeight: 20,
  },
  logo: {
    maxWidth: 200,
    marginTop: 40,
    maxHeight: 40,
    resizeMode: 'contain',
  },
  lastView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});
