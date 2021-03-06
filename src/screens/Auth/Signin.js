import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Image,
} from 'react-native';
import {MyHeading} from '../../components/Common/MyHeading';
import {MyText} from '../../components/Common/MyText';
import {AuthSubmitButton} from '../../components/Common/AuthSubmitButton';
import {MyTextField} from '../../components/Common/MyTextField';
import {signinWithEmail, signinWithGoogle} from '../../firebase/auth/signin';
import {useDispatch} from 'react-redux';
import {changeUser} from '../../redux/features/userSlice';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export const Signin = ({navigation}) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const onSigninWithEmail = async () => {
    setError({});
    setLoading(true);
    try {
      const userId = await signinWithEmail(email, password);
      dispatch(changeUser(userId));
    } catch (e) {
      if (e.code) {
        switch (e.code) {
          case 'auth/user-disabled':
            setError({email: 'Your account is disabled'});
            break;
          default:
            setError({
              email: 'Email or password incorrect',
              password: 'Email or password incorrect',
            });
        }
      } else {
        alert('Something went wrong. Please try again');
      }
      setLoading(false);
    }
  };

  const onSigninWithGoogle = async () => {
    try {
      const userId = await signinWithGoogle();
      dispatch(changeUser(userId));
    } catch (error) {
      if (error === 'SIGN_IN_CANCELLED') {
        alert('Cancel');
      } else if (error === 'IN_PROGRESS') {
        alert('Signin in progress');
      } else if (error === 'PLAY_SERVICES_NOT_AVAILABLE') {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert('An error occured. Please try again');
      }
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
                  <MyHeading text="Sign in" />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <MyText text="Don't have an account?" color="gray" />
                    <Pressable
                      style={{marginLeft: 5}}
                      onPress={() => navigation.navigate('Signup')}>
                      <MyText text="Sign up" color="#FF8112" />
                    </Pressable>
                  </View>
                </View>
                <GoogleSigninButton
                  style={{alignSelf: 'center'}}
                  onPress={onSigninWithGoogle}
                  size={GoogleSigninButton.Size.Wide}
                />
                <MyText text="---- OR -----" textAlign="center" />
                <MyTextField
                  label="Email"
                  keyboardType="email-address"
                  refer={emailRef}
                  value={email}
                  onChangeText={newVal => setEmail(newVal)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  errorText={error.email}
                  autoCapitalize="none"
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
                <Pressable
                  style={{marginBottom: '10%', marginTop: 10}}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <MyText text="Forgot password?" color="#FF8112" />
                </Pressable>
                <AuthSubmitButton
                  text="Sign in"
                  disabled={!email || !password}
                  loading={loading}
                  onPress={onSigninWithEmail}
                />
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    width: '101%',
  },
  inner: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 20,
    paddingBottom: '2%',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 30,
    marginTop: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textField: {
    width: '100%',
    backgroundColor: 'white',
  },
  logo: {
    maxWidth: 200,
    marginTop: 40,
    maxHeight: 40,
    resizeMode: 'contain',
  },
});
