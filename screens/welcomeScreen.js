import React from 'react';
import { StyleSheet, Text, View ,TextInput,
    TouchableOpacity, Alert,Modal,KeyboardAvoidingView,
ScrollView,FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state=({
            emailId:'',
            password:'',
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',        })
    }
    userSignup=(emailId,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return(Alert.alert('password does not match'))
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then((response)=>{
            return Alert.alert('user added successfully')
        })
    
        .catch(function( error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }
    db.collection('user').add({
        first_name:this.state.firstName,
        last_name: this.state.lastName,
        contact: this.state.contact,
        username: this.state.emailId,
        address:this.state.address
    })
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then((response)=>{
            return Alert.alert('successfully logged in')
        })
        .catch(function( error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    showModal=()=>{
        return(
            <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}
            >
                
<View>
<ScrollView style={{width:'100%'}}>
    <KeyboardAvoidingView>
        <Text>registration</Text>
        <TextInput 
        placeholder={'firstName'}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
                firstName:text,
            })
        }}
        ></TextInput>
        <TextInput 
        placeholder={'lastName'}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
                lastName:text,
            })
        }}
        ></TextInput>
        <TextInput 
        placeholder={'contact'}
        maxLength={10}
        keyboardType={'numeric'}
        onChangeText={(text)=>{
            this.setState({
                contact:text,
            })
        }}
        ></TextInput>
        <TextInput 
        placeholder={'address'}
        multiline={true}
        onChangeText={(text)=>{
            this.setState({
                address:text,
            })
        }}
        ></TextInput>
        <TextInput 
        placeholder={'emailId'}
        keyboardType={'email-address'}
        onChangeText={(text)=>{
            this.setState({
                emailId:text,
            })
        }}
        ></TextInput>
        <TextInput 
        placeholder={'password'}
        secureTextEntry={true}
        onChangeText={(text)=>{
            this.setState({
                password:text,
            })
        }}
        ></TextInput>
         <TextInput 
        placeholder={'confirmPassword'}
        secureTextEntry={true}
        onChangeText={(text)=>{
            this.setState({
                confirmPassword:text,
            })
        }}
        ></TextInput>
        <View>
            <TouchableOpacity
onPress={()=>{this.userSignup(this.state.emailId,this.state.password,this.state.confirmPassword)}}
            >
                <Text>register</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
onPress={()=>{this.setState({
    isModalVisible:false
})
}
}          >
                <Text>Cancel</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>         
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    {this.showModal()}
                </View>
            <View>
                <Text>BookSanta</Text>
            </View>
            <View>
                <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}
                >
                </TextInput>
                <TextInput
                style={styles.loginBox}
                placeholder="enter password"
              secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
            
                        password:text
                    })
                }}>

                </TextInput>

                <TouchableOpacity
                style={styles.button}
                onPress={(text)=>{
                   this.setState({
                      isModalVisible:true
                   })
                }}>
                <Text>sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={(text)=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }}>
                <Text>sign in </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

      title :{
          fontSize:65,
          fontWeight:'300',
          paddingBottom:30,
          color : '#ff3d00'
        },
        loginBox:{
          width: 300,
          height: 40,
          borderBottomWidth: 1.5,
          borderColor : '#ff8a65',
          fontSize: 20,
          margin:10,
          paddingLeft:10
        },
        button:{
          width:300,
          height:50,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:25,
          backgroundColor:"#ff9800",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8,
          }
        }
    
    })