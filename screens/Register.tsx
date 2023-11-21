import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from 'react-native';
import { registerUser } from '../utils/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AuthContext from '../AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true)

  
  const contextValue = useContext(AuthContext)

  if (!contextValue) {
    throw new Error ('Error params not passed')
  }
  
  const {setLoggedIn} = contextValue
  
  const handleRegister = async () => {
    if (password === confirmPassword) {
      const { token, userId } = await registerUser(username, email, password)
      setLoggedIn(userId)
    }
    else setIsPasswordSame(false)
  }
  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Create New Account</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputTitle}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password1234"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.inputTitle}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password1234"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {!isPasswordSame ? <Text style={{ color: 'red' }}>
          Password does not match!
        </Text>
        : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 15, justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ fontWeight: '500' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#28B67E', fontWeight: '500' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
  },
  title: {
    alignItems: 'center',
    marginBottom: 35
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  content: {
    marginHorizontal: 40
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#FAF8F8'
  },
  button: {
    width: '100%',
    backgroundColor: '#28B67E',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5
  },
  image: {
    alignItems: 'center'
  }
})
export default Register