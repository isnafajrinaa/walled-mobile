import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'expo-router';

export default function App() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Avatar Url"
                placeholderTextColor="#aaa"
            />
            {/* <Input/> */}
            <Button text="Login" />

            <StatusBar style="auto" />
            <Text style={styles.account}>Have account?
                <Link style={styles.register} href="/"> Login here</Link>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 233,
        height: 57,
        marginBottom: 30,
        resizeMode: 'stretch',
        marginBottom: 75
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    register: {
        color: '#19918F',
    },
    account: {
        marginTop: 15
    }
});