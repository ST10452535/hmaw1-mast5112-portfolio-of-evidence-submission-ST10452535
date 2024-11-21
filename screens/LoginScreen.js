import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import { ChefAuthCon } from '../ChefAuthCon';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useContext(ChefAuthCon);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Home'); 
        }
    }, [isAuthenticated, navigation]);

    const loginHandle = () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }
        login(username, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/logo-login.png')} 
                style={styles.logo}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
            />
            <Button title="Login" onPress={loginHandle} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', 
      },
      logo: {
        height: 250, 
        width: 250,
        alignSelf: 'center',
        marginBottom: 40, 
      },
      label: {
        fontSize: 18,
        fontWeight: '600', 
        color: '#333',
        marginBottom: 8, 
      },
      input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 12, 
        backgroundColor: '#fff', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4, 
      },
      button: {
        backgroundColor: '#007bff', 
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12, 
        alignSelf: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600', 
      },
      forgotPasswordText: {
        fontSize: 14,
        color: '#007bff', 
        textAlign: 'center',
        marginTop: 12,
      },
});

export default LoginScreen;