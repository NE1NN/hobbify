import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from 'react-native';
import { loginUser } from '../utils/api';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    const token = await loginUser(username, password)

    if (token !== null) {
      navigation.navigate('Home')
    } else {
      console.log('meki')
    }
  }

  const handleForgetPassword = () => {
    
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
        <Text style={styles.titleText}>Log in to Your Account</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputTitle}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password1234"
          // secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={handleForgetPassword}
        >
          <Text style={{ color: '#28B67E', fontWeight: 'bold' }}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 15, justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ fontWeight: '500' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#28B67E', fontWeight: '500' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
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

export default Login