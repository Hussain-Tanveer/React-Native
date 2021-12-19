import React from 'react'
import { StyleSheet, Text, View ,TextInput,ScrollView,KeyboardAvoidingView,Image,TouchableOpacity, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import fire from "../Firebase";
import {useState,useEffect} from "react";

const NeedyPersonForm = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [uid, setuid] = useState();
    const [name, setname] = useState("");
    const [fname, setfname] = useState("");
    const [cnic, setcnic] = useState("");
    const [dob, setdob] = useState("");
    const [number, setnumber] = useState("");
    const [income, setincome] = useState("");
    
function sumbit(){
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid;
          uid = user.uid;
          setuid(uid)
        //   console.log(user)
          fire.firestore().collection("needyPerson").add({
            name:name,
            fname:fname,
            cnic:cnic,
            dob:dob,
            number:number,
            income:income,
            uid:uid,
            })
            .then((docRef) => {
             console.log("Document written with ID: ", docRef);
             Alert.alert("Your Form is Filled sucessfully")
         })
         .catch((error) => {
             console.error("Error adding document: ", error);
         });
          
        } 
        else {
            // location.href = "../../index.html"
            
        }
    
    })
    var ref = fire.storage().ref().child("image"+ uid )
    ref.put(image)
    .then(()=>{
        Alert.alert("Success")
    })
      .catch((err)=>{
        alert.alert(err)
      })
}
function logout(){
    fire.auth().signOut()
    .then(function() {
        navigation.navigate('Login')
    })
    .catch(function(er) {
        console.log(er);
    })
}
	let openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
	
		if (permissionResult.granted === false) {
		  alert("Permission to access camera roll is required!");
		  return;
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.3,
			base64: true,
		  });
	  
		  
		  if (!result.cancelled) {
              const response = await fetch(result.uri);
              const blob = await response.blob();
			  setImage(blob);
        //    const random = Math.random() * Date.now();
          
          }
        }
        // sumbit = async(uri,imageName)=>{

        // }
    return (
            <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={styles.logo}>
            <Image 
            source={require("./Images/LogoKhanaSabkliye-01.png")}
            style={styles.logoimg}
            />
            </View>
            <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={logout}  style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
</View>
            <View style={styles.head}>
                <Text style={styles.headText}>Registration Form</Text>
            </View>
                    <View style={styles.inputContainer}>
            <TextInput 
            placeholder='Enter Your Name' 
            style={styles.input}
            value={name}
            onChangeText={text => setname(text)}
            />

<TextInput 
            placeholder='Enter Your Fathername' 
            style={styles.input} 
            value={fname}
            onChangeText={text => setfname(text)}
            />

<TextInput 
            placeholder='Enter Your CNIC Number' 
            style={styles.input} 
            keyboardType='numeric'
            value={cnic}
            onChangeText={text => setcnic(text)}
            />

<TextInput 
            placeholder='Enter Your DOB' 
            style={styles.input}
            value={dob}
            onChangeText={text => setdob(text)}
            />
            <TextInput 
            placeholder='Enter Your Number' 
            style={styles.input}
            keyboardType='numeric'
            value={number}
            onChangeText={text => setnumber(text)}

            />
                <TextInput 
            placeholder='Enter Your Monthly income' 
            style={styles.input}
            keyboardType='numeric'
            value={income}
            onChangeText={text => setincome(text)}
            />
</View>
<View style={styles.imagePic}>
    <TouchableOpacity style={styles.image} onPress={openImagePickerAsync}>
        <Text style={styles.pickerText} >Please Select Your image</Text>
    </TouchableOpacity>
</View>
<View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sumbit}  style={styles.button}>
            <Text style={styles.buttonText}>Sumbit</Text>
        </TouchableOpacity>
</View>
        </KeyboardAvoidingView>
</ScrollView>
    )
}

export default NeedyPersonForm

const styles = StyleSheet.create({
    scroll:{
        marginTop:20,
        paddingBottom:20
    },
    inputContainer:{
        width:"80%"
    },

    input:{
        paddingHorizontal:20,
        paddingVertical:15,
        backgroundColor: "white",
        marginTop:20,
        fontSize:15,
    },
    buttonContainer:{
        marginTop:20,
    },
    button:{
        backgroundColor:"blue",
        paddingLeft:25,
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10
    },
    buttonText:{
        color:"white",
        fontSize:20,
    },
    imagePic:{
        marginTop:20,
    },
    image:{
        backgroundColor:"black",
        paddingTop:15,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:15
    },
    pickerText:{
        color:"white",
        fontSize:16,
        fontWeight:'bold'
    },
    logo:{
        marginTop:20,
    },
    logoimg:{
        width:250,
        height:200
    },
    head:{
        marginBottom:15
    },
    headText:{
        fontSize:30,
        fontWeight:'bold',
        textDecorationLine:"underline"
    }
})
