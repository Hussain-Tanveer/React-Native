import { Link } from '@react-navigation/native'
import React from 'react'
import {useState} from "react"
import fire from "../Firebase"
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View,TouchableOpacity,ScrollView} from 'react-native'

const Signup = ({ navigation }) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
   function signup(){
    fire.auth().createUserWithEmailAndPassword(email,password)
    .then((data)=>{
        navigation.navigate('Login')
    })
    .catch((err)=>{
        console.log(err)
    })
   }
    return (
         <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput 
            placeholder='Enter Your Name' 
            style={styles.input}
           
            />

<TextInput 
            placeholder='Enter Your City' 
            style={styles.input} />

<TextInput 
            placeholder='Enter Your Email' 
            style={styles.input} 
            value={email}
            onChangeText={text => setemail(text)}
            />

<TextInput 
            placeholder='Enter Your Password' 
            style={styles.input}
            value={password}
            onChangeText={text => setpassword(text)}
            secureTextEntry
            />
</View>

<View style={styles.buttonContainer}>
    <TouchableOpacity 
    onPress={signup}
    style={styles.button}
    >
        <Text style={styles.buttonText}>Signup</Text>
    </TouchableOpacity>
</View>

<View style={styles.already}>
<TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
          <Text style={styles.alreadyText}>You Have Already Account? Please Login</Text>
     </TouchableOpacity>
</View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    scroll:{
        paddingTop:70
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
