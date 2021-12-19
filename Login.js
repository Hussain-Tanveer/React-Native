import { Link } from '@react-navigation/native'
import React from 'react'
import {useState} from "react"
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View,TouchableOpacity,ScrollView} from 'react-native'
import fire from "../Firebase"
const Login = ({ navigation }) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    function login(){
        fire.auth().signInWithEmailAndPassword(email,password)
        .then((data)=>{
            navigation.navigate('dash')
        })
        .catch((err)=>{
            alert(err)
        })
       }
    return (
        <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView style={styles.container} >
            <View style={styles.inputContainer}>
         

<TextInput 
            placeholder='Enter Your Email' 
            style={styles.input} 
            onChangeText={text => setemail(text)}
            />

<TextInput 
            placeholder='Enter Your Password' 
            style={styles.input}
            onChangeText={text => setpassword(text)}
            secureTextEntry
            />
</View>

<View style={styles.buttonContainer}>
    <TouchableOpacity 
    onPress={login}
    style={styles.button}
    >
        <Text style={styles.buttonText}>Signup</Text>
    </TouchableOpacity>
</View>

<View style={styles.already}>
<TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
          <Text style={styles.alreadyText}>You dont have Account? Please Signup</Text>
     </TouchableOpacity>
</View>

        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    scroll:{
        flex: 1,
        // marginTop:130,
        paddingTop:130
    },
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

    inputContainer:{
        width:"80%"
    },

    input:{
        paddingHorizontal:20,
        paddingVertical:15,
        backgroundColor: "white",
        marginTop:20,
        fontSize:15
    },
    buttonContainer:{
        marginTop:20,
        width:"60%",
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:"blue",
        alignItems:'center',
        padding:15,
        borderRadius:10,
        width:"100%"
    },
    buttonText:{
        color:"white",
        fontWeight:'bold',
        fontSize:20
    },
    already:{
        marginTop:15
    },
    alreadyText:{
        color:"skyblue",
        fontWeight:'bold',
        fontSize:15
    }

})

